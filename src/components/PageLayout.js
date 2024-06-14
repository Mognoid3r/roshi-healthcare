import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import RotaryNav from "./RotaryNav";
import Tback from "./TBack";
import TopBar from "./TopBar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.isCollapsed ? "80px" : "250px")};
  transition: margin-left 0.3s;
  // padding: 20px;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; // Ensure background is below all other content
  pointer-events: none; // Ensure background doesn't interfere with clicking
  overflow: hidden;
`;

const PageLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(
    () => JSON.parse(localStorage.getItem("sidebarCollapsed")) || false
  );

  const handleSidebarToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  return (
    <LayoutContainer>
      <RotaryNav />
      <Sidebar onToggle={handleSidebarToggle} />
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
