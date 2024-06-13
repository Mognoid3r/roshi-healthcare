// Sidebar.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBars, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import DashboardLinks from "./DashboardLinks";

const SidebarContainer = styled.div`
  width: ${(props) => (props.collapsed ? "80px" : "250px")};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  background-color: #0c1e35;
  color: #7d84ab;
  position: fixed;
  overflow: hidden;
  z-index: 1;
`;

const SidebarHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .logo {
    display: ${(props) => (props.collapsed ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    height: 60px;
    font-size: 24px;
    color: white;
    margin-bottom: 10px;
  }

  .logo-expand {
    display: ${(props) => (props.collapsed ? "none" : "flex")};
    align-items: center;
    height: 60px;
    font-size: 24px;
    color: white;
    font-weight: bold;
  }
`;

const StyledLogo = styled(Logo)`
  width: 30px;
  height: 30px;
  fill: white;
`;

const SidebarMain = styled.div`
  flex-grow: 1;
  .side-wrapper {
    padding: ${(props) => (props.collapsed ? "0 10px" : "0 20px")};
    transition: padding 0.3s;
  }
  .toggle-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 20px;
    position: absolute;
    right: -15px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
  }
`;

const SidebarFooter = styled.div`
  padding: 20px;
  background-color: #162d4a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: white;

  .profile-info {
    display: flex;
    align-items: center;
    .profile-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .username {
      display: ${(props) => (props.collapsed ? "none" : "block")};
    }
  }
`;

const LogoutButton = styled.div`
  position: absolute;
  bottom: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  .logout-btn {
    background: #162d4a;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    font-size: 14px;
  }
`;

const Sidebar = ({ onToggle, onLinkClick }) => {
  const [collapsed, setCollapsed] = useState(
    () => JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );
  const [showLogout, setShowLogout] = useState(false);
  const { logout, user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
    onToggle(collapsed);
  }, [collapsed]);

  const handleToggle = () => setCollapsed(!collapsed);

  const handleProfileClick = () => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setShowLogout(!showLogout);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader collapsed={collapsed}>
        <StyledLogo className="logo" />
        <div className="logo-expand">Roshi</div>
      </SidebarHeader>

      <SidebarMain collapsed={collapsed}>
        <div className="side-wrapper">
          <DashboardLinks collapsed={collapsed} onLinkClick={onLinkClick} />
        </div>
        <button className="toggle-button" onClick={handleToggle}>
          <FaBars />
        </button>
      </SidebarMain>

      {showLogout && !collapsed && (
        <LogoutButton>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </LogoutButton>
      )}

      <SidebarFooter onClick={handleProfileClick} collapsed={collapsed}>
        <div className="profile-info">
          <img
            className="profile-image"
            src="https://via.placeholder.com/30"
            alt="Profile"
          />
          <div className="username">{username}</div>
        </div>
        <FaCog />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
