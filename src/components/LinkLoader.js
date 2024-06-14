import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FindPage } from "../data/PageInfo";

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

//Dynamically loads links based on url slug (EX: /dashboard will find all links for /dashboard. /dashboard/something will look for links with dashboard as the parent and something as the name)
const LinkLoader = ({ collapsed, onLinkClick }) => {
  //Get current URL info
  const [currentPage, setCurrentPage] = useState(null);

  //A function for splitting up a url (This should be turned into a hook later)
  const GetPath = (url) => {
    console.log(1);
    // Splitting the URL to separate protocol and the rest of the address
    var data = url.split("://");
    var protocol = data[0];

    console.log(2);
    // Splitting the rest of the address to extract domain and possible path
    data = data[1].split(".com");
    var domain = data[0];

    console.log(3);
    console.log(data);
    // Splitting the address after .com to extract the path if available
    data = data[0].split("/");

    console.log(4);
    // Checking if a path exists and returning the relevant parts
    if (data[1]) {
      return [protocol, domain, data[1]];
    }

    console.log(5);
    // Returning protocol and domain if path doesn't exist
    return [protocol, domain];
  };

  useEffect(() => {
    //get current URL
    const url = window.location.href;
    //splits url into protocol, domain, and path
    let splitURL = GetPath(url);
    let pageTemp = FindPage(splitURL[2]);
    console.log(pageTemp);
    setCurrentPage(pageTemp);
  }, []);

  if (!currentPage) return <div>Loading...</div>;
  return (
    <LinksContainer>
      {currentPage.links.map((link) => (
        <LinkItem key={link.id} onClick={() => onLinkClick(link.id)}>
          <span className="icon">{link.icon}</span>
          {!collapsed && <span>{link.label}</span>}
        </LinkItem>
      ))}
    </LinksContainer>
  );
};

export default LinkLoader;
