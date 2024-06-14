// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import {
//   FaBars,
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
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   transition: width 0.3s;
//   background-color: #1e1e2f;
//   color: #a1a1b3;
//   position: fixed;
//   overflow: hidden;
//   z-index: 1;
// `;

// const SidebarHeader = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center; // Center the content horizontally

//   .logo {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 60px;
//     font-size: 24px;
//     color: red;
//     margin-bottom: 10px;
//   }

//   .logo-expand {
//     display: ${(props) => (props.collapsed ? "none" : "flex")};
//     align-items: center;
//     height: 60px;
//     font-size: 24px;
//     color: white;
//     font-weight: bold;
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
//   align-items: center; // Center content horizontally
//   .side-wrapper {
//     width: 100%;
//     padding: ${(props) =>
//       props.collapsed ? "0 5px" : "0 20px"}; // Adjusted padding
//     transition: padding 0.3s;
//   }
//   .toggle-button {
//     background: none;
//     border: none;
//     color: white;
//     cursor: pointer;
//     font-size: 20px;
//     position: absolute;
//     right: -15px;
//     top: 50%;
//     transform: translateY(-50%) rotate(90deg);
//   }
// `;

// const SidebarFooter = styled.div`
//   padding: ${(props) =>
//     props.collapsed ? "20px 0" : "12px"}; // Adjust padding
//   background-color: #1e1e2f;
//   display: flex;
//   flex-direction: ${(props) =>
//     props.collapsed ? "column" : "row"}; // Adjust direction
//   justify-content: space-evenly; // Center content horizontally
//   align-items: center;
//   cursor: pointer;
//   color: white;

//   .profile-info {
//     display: flex;
//     flex-direction: ${(props) =>
//       props.collapsed ? "column" : "row"}; // Adjust direction
//     align-items: center;
//     justify-content: center; // Center content horizontally
//     .profile-image {
//       width: 30px;
//       height: 30px;
//       border-radius: 50%;
//       margin-right: ${(props) =>
//         props.collapsed ? "0" : "10px"}; // Adjust margin
//       margin-bottom: ${(props) =>
//         props.collapsed ? "10px" : "0"}; // Adjust margin
//     }
//     .username {
//       display: ${(props) => (props.collapsed ? "none" : "block")};
//     }
//   }

//   .settings-icon {
//     display: ${(props) => (props.collapsed ? "none" : "block")};
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
//   align-items: center;
//   justify-content: center; // Center content when collapsed
//   padding: 10px 0; // Adjust padding to center vertically within its container
//   color: ${(props) => (props.active ? "white" : "#a1a1b3")};
//   text-decoration: none;
//   &:hover {
//     color: white;
//     background-color: #303044;
//   }
//   .icon {
//     margin-right: ${(props) => (props.collapsed ? "0" : "10px")};
//     font-size: 18px;
//   }
//   .text {
//     display: ${(props) => (props.collapsed ? "none" : "block")};
//   }
// `;

// const Sidebar = ({ onToggle }) => {
//   const [collapsed, setCollapsed] = useState(
//     () => JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
//   );
//   const [showLogout, setShowLogout] = useState(false);
//   const { logout, user } = useAuth();
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username);
//     }
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
//     onToggle(collapsed);
//   }, [collapsed, onToggle]);

//   const handleToggle = () => setCollapsed(!collapsed);

//   const handleProfileClick = () => {
//     if (collapsed) {
//       setCollapsed(false);
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
//     <SidebarContainer collapsed={collapsed}>
//       <SidebarHeader collapsed={collapsed}>
//         <StyledLogo className="logo" />
//         <div className="logo-expand">Roshi</div>
//       </SidebarHeader>

//       <SidebarMain collapsed={collapsed}>
//         <div className="side-wrapper">
//           {links.map((link, index) => (
//             <NavItem
//               key={index}
//               to={link.to}
//               collapsed={collapsed ? 1 : 0}
//               active={window.location.pathname === link.to ? 1 : 0}
//             >
//               <div className="icon">{link.icon}</div>
//               <div className="text">{link.text}</div>
//             </NavItem>
//           ))}
//         </div>
//         <button className="toggle-button" onClick={handleToggle}>
//           <FaBars />
//         </button>
//       </SidebarMain>

//       {showLogout && !collapsed && (
//         <LogoutButton>
//           <button className="logout-btn" onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </button>
//         </LogoutButton>
//       )}

//       <SidebarFooter onClick={handleProfileClick} collapsed={collapsed}>
//         <div className="profile-info" collapsed={collapsed}>
//           <img
//             className="profile-image"
//             src="https://via.placeholder.com/30"
//             alt="Profile"
//           />
//           <div className="username">{username}</div>
//         </div>
//         <FaCog className="settings-icon" />
//       </SidebarFooter>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;

// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import {
//   FaBars,
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
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   transition: width 0.3s;
//   background-color: #1e1e2f;
//   color: #a1a1b3;
//   position: fixed;
//   overflow: hidden;
//   z-index: 1;
// `;

// const SidebarHeader = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 60px;
//   padding: 20px 0;

//   .logo {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 24px;
//     color: white;
//     margin-bottom: 10px;
//   }

//   .logo-expand {
//     display: ${(props) => (props.collapsed ? "none" : "flex")};
//     align-items: center;
//     font-size: 24px;
//     color: white;
//     font-weight: bold;
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
//     padding: ${(props) => (props.collapsed ? "0 5px" : "0 20px")};
//     transition: padding 0.3s;
//   }
//   .toggle-button {
//     background: none;
//     border: none;
//     color: white;
//     cursor: pointer;
//     font-size: 20px;
//     position: absolute;
//     right: -15px;
//     top: 50%;
//     transform: translateY(-50%) rotate(90deg);
//   }
// `;

// const SidebarFooter = styled.div`
//   padding: ${(props) => (props.collapsed ? "20px 0" : "12px")};
//   background-color: #1e1e2f;
//   display: flex;
//   flex-direction: ${(props) => (props.collapsed ? "column" : "row")};
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
//   color: white;

//   .profile-info {
//     display: flex;
//     flex-direction: ${(props) => (props.collapsed ? "column" : "row")};
//     align-items: center;
//     justify-content: center;

//     .profile-image {
//       width: 30px;
//       height: 30px;
//       border-radius: 50%;
//       margin-right: ${(props) => (props.collapsed ? "0" : "10px")};
//       margin-bottom: ${(props) => (props.collapsed ? "10px" : "0")};
//     }

//     .username {
//       display: ${(props) => (props.collapsed ? "none" : "block")};
//     }
//   }

//   .settings-icon {
//     display: ${(props) => (props.collapsed ? "none" : "block")};
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
//   align-items: center;
//   padding: 10px 20px;
//   color: ${(props) => (props.active ? "white" : "#a1a1b3")};
//   text-decoration: none;
//   transition: background-color 0.3s;

//   &:hover {
//     color: white;
//     background-color: #303044;
//   }

//   .icon {
//     flex-shrink: 0;
//     margin-right: 10px;
//     font-size: 18px;
//   }

//   .text {
//     flex-grow: 1;
//     display: ${(props) => (props.collapsed ? "none" : "block")};
//     white-space: nowrap;
//   }
// `;

// const Sidebar = ({ onToggle }) => {
//   const [collapsed, setCollapsed] = useState(
//     () => JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
//   );
//   const [showLogout, setShowLogout] = useState(false);
//   const { logout, user } = useAuth();
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     if (user) {
//       setUsername(user.username);
//     }
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
//     onToggle(collapsed);
//   }, [collapsed, onToggle]);

//   const handleToggle = () => setCollapsed(!collapsed);

//   const handleProfileClick = () => {
//     if (collapsed) {
//       setCollapsed(false);
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
//     <SidebarContainer collapsed={collapsed}>
//       <SidebarHeader collapsed={collapsed}>
//         <StyledLogo className="logo" />
//         <div className="logo-expand">Roshi</div>
//       </SidebarHeader>

//       <SidebarMain collapsed={collapsed}>
//         <div className="side-wrapper">
//           {links.map((link, index) => (
//             <NavItem
//               key={index}
//               to={link.to}
//               collapsed={collapsed ? 1 : 0}
//               active={window.location.pathname === link.to ? 1 : 0}
//             >
//               <div className="icon">{link.icon}</div>
//               <div className="text">{link.text}</div>
//             </NavItem>
//           ))}
//         </div>
//         <button className="toggle-button" onClick={handleToggle}>
//           <FaBars />
//         </button>
//       </SidebarMain>

//       {showLogout && !collapsed && (
//         <LogoutButton>
//           <button className="logout-btn" onClick={handleLogout}>
//             <FaSignOutAlt /> Logout
//           </button>
//         </LogoutButton>
//       )}

//       <SidebarFooter onClick={handleProfileClick} collapsed={collapsed}>
//         <div className="profile-info" collapsed={collapsed}>
//           <img
//             className="profile-image"
//             src="https://via.placeholder.com/30"
//             alt="Profile"
//           />
//           <div className="username">{username}</div>
//         </div>
//         <FaCog className="settings-icon" />
//       </SidebarFooter>
//     </SidebarContainer>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaBars,
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
  width: ${(props) => (props.collapsed ? "50px" : "250px")};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  background-color: #1e1e2f;
  color: #a1a1b3;
  position: fixed;
  overflow: hidden;
  z-index: 1;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  //   justify-content: center;
  height: 60px;
  padding: 20px 0;
  position: relative;

  .logo {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // font-size: 24px;
    flex-shrink: 0;
    color: white;
    // margin-bottom: 10px;
  }

  .logo-expand {
    display: ${(props) => (props.collapsed ? "none" : "block")};
    // align-items: center;
    font-size: 24px;
    color: white;
    font-weight: bold;
    // position: absolute;
    flex-grow: 1;
    // left: 70px; /* Adjusted for text padding */
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
    padding: ${(props) => (props.collapsed ? "0 0px" : "0 0px")};
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
  padding: 12px;
  background-color: #1e1e2f;
  display: flex;
  //   flex-direction: ${(props) => (props.collapsed ? "column" : "row")};
  //   justify-content: center;
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
    display: ${(props) => (props.collapsed ? "none" : "block")};
    //   position: absolute;
    left: 70px; /* Adjusted for text padding */
  }

  .settings-icon {
    display: ${(props) => (props.collapsed ? "none" : "block")};
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
  //   align-items: center;
  padding: 10px 15px;
  color: ${(props) => (props.active ? "white" : "#a1a1b3")};
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    color: white;
    background-color: #303044;
  }

  .icon {
    flex-shrink: 0;
    margin-right: 10px;
    font-size: 18px;
  }

  .text {
    flex-grow: 1;
    display: ${(props) => (props.collapsed ? "none" : "block")};
    white-space: nowrap;
  }
`;

const Sidebar = ({ onToggle }) => {
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
  }, [collapsed, onToggle]);

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

  const links = [
    { to: "/dashboard", icon: <FaHome />, text: "Dashboard" },
    { to: "/profile", icon: <FaUserCircle />, text: "Profile" },
    { to: "/community", icon: <FaUsers />, text: "Community" },
    { to: "/programs", icon: <FaClipboardList />, text: "Programs" },
  ];

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarHeader collapsed={collapsed}>
        <StyledLogo className="logo" />
        <div className="logo-expand">Roshi</div>
      </SidebarHeader>

      <SidebarMain collapsed={collapsed}>
        <div className="side-wrapper">
          {links.map((link, index) => (
            <NavItem
              key={index}
              to={link.to}
              collapsed={collapsed ? 1 : 0}
              active={window.location.pathname === link.to ? 1 : 0}
            >
              <div className="icon">{link.icon}</div>
              <div className="text">{link.text}</div>
            </NavItem>
          ))}
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
        {/* <div className="profile-info" collapsed={collapsed}></div> */}
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
