// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import {
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
//   FaHome,
//   FaClipboardList,
//   FaUsers,
// } from "react-icons/fa";
// import { useAuth } from "../hooks/useAuth";
// import { ReactComponent as Logo } from "../assets/Logo.svg";
// import { Link } from "react-router-dom";

// const SidebarContainer = styled.div`
//   width: ${(props) => (props.collapsed ? "50px" : "250px")};
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   transition: width 0.3s;
//   background-color: #1F1D2B;
//   color: #a1a1b3;
//   position: fixed;
//   overflow: hidden;
//   z-index: 1;

//   @media (max-width: 768px) {
//     width: ${(props) => (props.collapsed ? "0px" : "250px")};
// `;

// const SidebarHeader = styled.div`
//   display: flex;
//   align-items: center;
//   height: 60px;
//   padding: 20px 0;
//   position: relative;

//   .logo {
//     flex-shrink: 0;
//     fill: #ff4800;
//   }

//   .logo-expand {
//     display: ${(props) => (props.collapsed ? "none" : "block")};
//     font-size: 24px;
//     color: white;
//     font-weight: bold;
//     position: absolute;
//     left: 70px; /* Adjusted for text padding */
//   }
// `;

// const StyledLogo = styled(Logo)`
//   width: 50px;
//   height: 50px;
//   fill: white;
// `;

// const SidebarMain = styled.div`
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   .side-wrapper {
//     width: 100%;
//     padding: 0 0px;
//     transition: padding 0.3s;
//   }
// `;

// const SidebarFooter = styled.div`
//   padding: 12px;
//   background-color: #1e1e2f;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   color: white;
//   position: relative;

//   .profile-image {
//     width: 30px;
//     height: 30px;
//     border-radius: 50%;
//     margin-right: 10px;
//   }

//   .username {
//     display: ${(props) => (props.collapsed ? "none" : "block")};
//     left: 70px; /* Adjusted for text padding */
//   }

//   .settings-icon {
//     display: ${(props) => (props.collapsed ? "none" : "block")};
//     position: absolute;
//     right: 20px;
//   }
// `;

// const LogoutButton = styled.div`
//   position: absolute;
//   bottom: 90px;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   .logout-btn {
//     background: #1e1e2f;
//     color: white;
//     padding: 10px 20px;
//     cursor: pointer;
//     border: none;
//     font-size: 14px;
//   }
// `;

// const NavItem = styled(Link)`
//   display: flex;
//   padding: 10px 15px;
//   color: ${(props) => (props.active ? "white" : "#a1a1b3")};
//   //   text-decoration: none;
//   transition: background-color 0.3s;

//   &:hover {
//     .icon {
//       color: #f1f1f2;
//       background: #00ddff;
//     }
//     .text {
//       font-weight: 600;
//       text-decoration: none;
//     }
//   }

//   .icon {
//     flex-shrink: 0;
//     margin-right: 10px;
//     font-size: 18px;
//     height: 28px;
//     width: 28px;
//     border-radius: 8px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .text {
//     flex-grow: 1;
//     display: ${(props) => (props.collapsed ? "none" : "block")};
//     white-space: nowrap;
//   }
// `;

// const Sidebar = ({ isCollapsed, onToggle }) => {
//   const [showLogout, setShowLogout] = useState(false);
//   const { logout, user } = useAuth();
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username);
//     }
//   }, [user]);

//   const handleProfileClick = () => {
//     if (isCollapsed) {
//       onToggle(false);
//     } else {
//       setShowLogout(!showLogout);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   const links = [
//     { to: "/dashboard", icon: <FaHome />, text: "Dashboard" },
//     { to: "/profile", icon: <FaUserCircle />, text: "Profile" },
//     { to: "/community", icon: <FaUsers />, text: "Community" },
//     { to: "/programs", icon: <FaClipboardList />, text: "Programs" },
//   ];

//   return (
//     <SidebarContainer collapsed={isCollapsed}>
//       <SidebarHeader collapsed={isCollapsed}>
//         <StyledLogo className="logo" />
//         <div className="logo-expand">Roshi</div>
//       </SidebarHeader>

//       <SidebarMain collapsed={isCollapsed}>
//         <div className="side-wrapper">
//           {links.map((link, index) => (
//             <NavItem
//               key={index}
//               to={link.to}
//               collapsed={isCollapsed ? 1 : 0}
//               active={window.location.pathname === link.to ? 1 : 0}
//             >
//               <div className="icon">{link.icon}</div>
//               <div className="text">{link.text}</div>
//             </NavItem>
//           ))}
//         </div>
//       </SidebarMain>

//       {showLogout && !isCollapsed && (
//         <LogoutButton>
//           <button className="logout-btn" onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </button>
//         </LogoutButton>
//       )}

//       <SidebarFooter onClick={handleProfileClick} collapsed={isCollapsed}>
//         <img
//           className="profile-image"
//           src="https://via.placeholder.com/30"
//           alt="Profile"
//         />
//         <div className="username">{username}</div>
//         <FaCog className="settings-icon" />
//       </SidebarFooter>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  width: ${(props) => (props.$collapsed ? "50px" : "250px")};
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  background-color: #1F1D2B;
  color: #a1a1b3;
  position: fixed;
  overflow: hidden;
  z-index: 1;


  @media (max-width: 768px) {
    width: ${(props) => (props.$collapsed ? "0px" : "250px")};
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 20px 0;
  position: relative;

  .logo {
    flex-shrink: 0;
    fill: #ff4800;
  }

  .logo-expand {
    display: ${(props) => (props.$collapsed ? "none" : "block")};
    font-size: 24px;
    color: white;
    font-weight: bold;
    position: absolute;
    left: 70px; /* Adjusted for text padding */
  }
`;

const StyledLogo = styled(Logo)`
  width: 50px;
  height: 50px;
  fill: white;
`;

const SidebarMain = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  .side-wrapper {
    width: 100%;
    padding: 0 0px;
    transition: padding 0.3s;
  }
`;

const SidebarFooter = styled.div`
  padding: 12px;
  background-color: #1e1e2f;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  position: relative;

  .profile-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .username {
    display: ${(props) => (props.$collapsed ? "none" : "block")};
    left: 70px; /* Adjusted for text padding */
  }

  .settings-icon {
    display: ${(props) => (props.$collapsed ? "none" : "block")};
    position: absolute;
    right: 20px;
  }
`;

const LogoutButton = styled.div`
  position: absolute;
  bottom: 90px;
  width: 100%;
  display: flex;
  justify-content: center;
  .logout-btn {
    background: #1e1e2f;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    border: none;
    font-size: 14px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  padding: 10px 15px;
  color: ${(props) => (props.active ? "white" : "#a1a1b3")};
  //   text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    .icon {
      color: #f1f1f2;
      background: #00ddff;
    }
    .text {
      font-weight: 600;
      text-decoration: none;
    }
  }

  .icon {
    flex-shrink: 0;
    margin-right: 10px;
    font-size: 18px;
    height: 28px;
    width: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    flex-grow: 1;
    display: ${(props) => (props.$collapsed ? "none" : "block")};
    white-space: nowrap;
  }
`;

const Sidebar = ({ sidebarCollapsed, onToggle }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { logout, user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleProfileClick = () => {
    if (sidebarCollapsed) {
      onToggle(false);
    } else {
      setShowLogout(!showLogout);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const links = [
    { to: "/dashboard", icon: <FaHome />, text: "Dashboard" },
    { to: "/profile", icon: <FaUserCircle />, text: "Profile" },
    { to: "/community", icon: <FaUsers />, text: "Community" },
    { to: "/programs", icon: <FaClipboardList />, text: "Programs" },
  ];

  return (
    <SidebarContainer $collapsed={sidebarCollapsed}>
      <SidebarHeader $collapsed={sidebarCollapsed}>
        <StyledLogo className="logo" />
        <div className="logo-expand">Roshi</div>
      </SidebarHeader>

      <SidebarMain $collapsed={sidebarCollapsed}>
        <div className="side-wrapper">
          {links.map((link, index) => (
            <NavItem
              key={index}
              to={link.to}
              $collapsed={sidebarCollapsed ? 1 : 0}
              active={window.location.pathname === link.to ? 1 : 0}
            >
              <div className="icon">{link.icon}</div>
              <div className="text">{link.text}</div>
            </NavItem>
          ))}
        </div>
      </SidebarMain>

      {showLogout && !sidebarCollapsed && (
        <LogoutButton>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </LogoutButton>
      )}

      <SidebarFooter onClick={handleProfileClick} $collapsed={sidebarCollapsed}>
        <img
          className="profile-image"
          src="https://via.placeholder.com/30"
          alt="Profile"
        />
        <div className="username">{username}</div>
        <FaCog className="settings-icon" />
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
