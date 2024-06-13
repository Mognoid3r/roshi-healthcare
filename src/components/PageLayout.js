import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import RotaryNav from "./RotaryNav";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin-left: ${(props) => (props.isCollapsed ? "80px" : "250px")};
  transition: margin-left 0.3s;
  padding: 20px;
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

      <MainContent isCollapsed={isCollapsed}>{children}</MainContent>
    </LayoutContainer>
  );
};

export default PageLayout;
