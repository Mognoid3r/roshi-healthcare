// DashboardLinks.js
import React from "react";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import styled from "styled-components";

const LinksContainer = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const LinkItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;

  &:hover {
    color: white;
  }

  .icon {
    margin-right: 10px;
  }
`;

const DashboardLinks = ({ collapsed, onLinkClick }) => {
  const links = [
    { id: "profile", icon: <FaUserCircle />, label: "Profile" },
    { id: "community", icon: <FaUsers />, label: "Community" },
  ];

  return (
    <LinksContainer>
      {links.map((link) => (
        <LinkItem key={link.id} onClick={() => onLinkClick(link.id)}>
          <span className="icon">{link.icon}</span>
          {!collapsed && <span>{link.label}</span>}
        </LinkItem>
      ))}
    </LinksContainer>
  );
};

export default DashboardLinks;
