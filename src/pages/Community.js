// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Sidebar from "../components/Sidebar";
// import { FaBell, FaChevronDown } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const CommunityContainer = styled.div`
//   background-color: var(--theme-bg);
//   max-width: 1240px;
//   max-height: 900px;
//   height: 95vh;
//   display: flex;
//   overflow: hidden;
//   width: 100%;
//   border-radius: 20px;
//   font-size: 15px;
//   font-weight: 500;
//   box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
//   position: relative;
// `;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-grow: 1;
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   flex-shrink: 0;
//   padding: 30px;
// `;

// const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 0 30px 30px;
//   flex-grow: 1;
//   overflow: auto;
// `;

// const CommunityPage = () => {
//   const navigate = useNavigate();
//   const [isSidebarCollapsed, setSidebarCollapsed] = useState(
//     window.innerWidth <= 1080
//   );
//   const user = {
//     username: "Thomas",
//     profilePicture:
//       "https://images.unsplash.com/photo-1587918842454-870dbd18261a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=943&q=80",
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setSidebarCollapsed(window.innerWidth <= 1080);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <CommunityContainer>
//       <Sidebar isCollapsed={isSidebarCollapsed} user={user} />
//       <Wrapper>
//         <Header>
//           <div className="search-bar">
//             <input type="text" placeholder="Search..." />
//           </div>
//           <div className="user-settings">
//             {/* <img className="user-img" src={user.profilePicture} alt="User" /> */}
//             <div className="user-name">{user.username}</div>
//             <FaChevronDown />
//             <div className="notify">
//               <FaBell />
//               <div className="notification"></div>
//             </div>
//           </div>
//         </Header>
//         <MainContainer>
//           <h1 className="main-header">Community</h1>
//           {/* Content goes here */}
//         </MainContainer>
//       </Wrapper>
//     </CommunityContainer>
//   );
// };

// export default CommunityPage;

// src/pages/Community.js
import React from "react";
import { Outlet } from "react-router-dom";

const Community = () => {
  return (
    <div>
      <h1>Community</h1>
      <Outlet />
    </div>
  );
};

export default Community;
