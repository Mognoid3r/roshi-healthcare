// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import Sidebar from "./Sidebar";
// import RotaryNav from "./RotaryNav";
// import Tback from "./TBack";
// import TopBar from "./TopBar";
// import { FaBars } from "react-icons/fa";

// const LayoutContainer = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   margin-left: ${(props) => (props.isCollapsed ? "50px" : "250px")};
//   transition: margin-left 0.3s;
//   padding: 20px;
// `;

// const BackgroundWrapper = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   z-index: 0; // Ensure background is below all other content
//   pointer-events: none; // Ensure background doesn't interfere with clicking
//   overflow: hidden;
// `;

// const ToggleButton = styled.div`
//   background: #1e1e2f;
//   border: none;
//   color: white;
//   cursor: pointer;
//   font-size: 20px;
//   position: absolute;
//   left: ${(props) => (props.isCollapsed ? "50px" : "250px")};
//   top: 30px;
//   transform: translateY(-50%);
//   transition: left 0.3s;
//   z-index: 1000; // Ensure button is above all other content
//   width: 40px;
//   height: 60px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const PageLayout = ({ children }) => {
//   const [isCollapsed, setIsCollapsed] = useState(
//     () => JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
//   );

//   const handleSidebarToggle = () => {
//     setIsCollapsed(!isCollapsed);
//     localStorage.setItem("sidebarCollapsed", JSON.stringify(!isCollapsed));
//   };

//   return (
//     <LayoutContainer>
//       <RotaryNav />
//       <Sidebar isCollapsed={isCollapsed} />
//       <ToggleButton onClick={handleSidebarToggle} isCollapsed={isCollapsed}>
//         <FaBars />
//       </ToggleButton>
//       <MainContent isCollapsed={isCollapsed}>
//         <TopBar />
//         {children}
//       </MainContent>
//       <BackgroundWrapper>
//         <Tback color="#DD3845" />
//       </BackgroundWrapper>
//     </LayoutContainer>
//   );
// };

// export default PageLayout;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import RotaryNav from "./RotaryNav";
import Tback from "./TBack";
import TopBar from "./TopBar";
import { FaBars, FaTimes } from "react-icons/fa";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.isCollapsed ? "50px" : "250px")};
  transition: margin-left 0.3s;
  padding: 20px;

    @media (max-width: 768px) {
    padding: 0;
    // margin: 0;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0; // Ensure background is below all other content
  pointer-events: none; // Ensure background doesn't interfere with clicking
  overflow: hidden;
`;

const ToggleButton = styled.div`
  background: #1e1e2f;
  border: none;
  clip-path: polygon(0 0, 100% 0, 100% 65%, 0% 100%);
  color: white;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  left: ${(props) => (props.isCollapsed ? "49px" : "249px")};
  top: 49px;
  transform: translateY(-50%);
  transition: left 0.3s;
  z-index: 2; // Ensure button is above all other content
  width: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(
    () => JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );

  const handleSidebarToggle = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(!isCollapsed));
  };

  return (
    <LayoutContainer>
      <RotaryNav />
      <Sidebar isCollapsed={isCollapsed} />
      <ToggleButton onClick={handleSidebarToggle} isCollapsed={isCollapsed}>
        {isCollapsed ? <FaBars /> : <FaTimes />}
      </ToggleButton>
      <MainContent isCollapsed={isCollapsed}>
        <TopBar />
        {children}
      </MainContent>
      <BackgroundWrapper>
        <Tback color="#DD3845" />
      </BackgroundWrapper>
    </LayoutContainer>
  );
};

export default PageLayout;
