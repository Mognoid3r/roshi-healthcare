// import React, { useState } from "react";
// import styled from "styled-components";
// import Sidebar from "./Sidebar";
// import RotaryNav from "./RotaryNav";
// import Tback from "./TBack";
// import { FaBars, FaTimes } from "react-icons/fa";
// import TopBar from "./TopBar";

// const LayoutContainer = styled.div`
//   display: flex;
//   height: 100vh;
// `;

// const MainContent = styled.div`
//   flex-grow: 1;
//   margin-left: ${(props) => (props.isCollapsed ? "50px" : "250px")};
//   transition: margin-left 0.3s;
//   padding: 20px;

//     @media (max-width: 768px) {
//     padding: 0;
//     // margin: 0;
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
//   background: #1F1D2B;
//   border: none;
//   clip-path: polygon(0 0, 100% 0, 100% 65%, 0% 100%);
//   color: white;
//   cursor: pointer;
//   font-size: 16px;
//   position: absolute;
//   left: ${(props) => (props.isCollapsed ? "49px" : "249px")};
//   top: 49px;
//   transform: translateY(-50%);
//   transition: left 0.3s;
//   z-index: 2; // Ensure button is above all other content
//   width: 50px;
//   height: 100px;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//  @media (max-width: 768px) {
//     left: ${(props) => (props.isCollapsed ? "-1px" : "249px")};
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
//         {isCollapsed ? <FaBars /> : <FaTimes />}
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

import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import RotaryNav from "./RotaryNav";
import Tback from "./TBack";
import { FaBars, FaTimes } from "react-icons/fa";
import TopBar from "./TopBar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.$sidebarCollapsed ? "50px" : "250px")};
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
  background: #1F1D2B;
  border: none;
  clip-path: polygon(0 0, 100% 0, 100% 65%, 0% 100%);
  color: white;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  left: ${(props) => (props.$sidebarCollapsed ? "49px" : "249px")};
  top: 49px;
  transform: translateY(-50%);
  transition: left 0.3s;
  z-index: 2; // Ensure button is above all other content
  width: 50px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

 @media (max-width: 768px) {
    left: ${(props) => (props.$sidebarCollapsed ? "-1px" : "249px")};
`;

const PageLayout = ({ children }) => {
  const [sidebarCollapsed, setsidebarCollapsed] = useState(
    () => JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );

  const handleSidebarToggle = () => {
    setsidebarCollapsed(!sidebarCollapsed);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(!sidebarCollapsed));
  };

  return (
    <LayoutContainer>
      <RotaryNav />
      <Sidebar sidebarCollapsed={sidebarCollapsed} />
      <ToggleButton
        onClick={handleSidebarToggle}
        $sidebarCollapsed={sidebarCollapsed}
      >
        {sidebarCollapsed ? <FaBars /> : <FaTimes />}
      </ToggleButton>
      <MainContent $sidebarCollapsed={sidebarCollapsed}>
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
