import { FaUserCircle, FaUsers } from "react-icons/fa";
import React from "react";

const CreateLink = (name, icon, label) => {
  return {
    id: name,
    icon: icon,
    label: label,
  };
};

class PageInfo {
  constructor(pageName, links) {
    this.name = pageName;
    this.links = links;
  }
}

const dashboardLinks = [
  CreateLink("link1", <FaUserCircle />, "Link1"),
  CreateLink("link2", <FaUsers />, "Link2"),
];

const dashboard = new PageInfo("dashboard", dashboardLinks);

const otherLinks = [
  CreateLink("somewhere", <FaUserCircle />, "Somewhere"),
  CreateLink("Somewhere Else", <FaUsers />, "Somewhere Else"),
];

const other = new PageInfo("Other", otherLinks);

export const PageList = [dashboard, other];

export const FindPage = (pageName) => {
  let foundPage = PageList.find((page) => page.name === pageName);
  if (foundPage) return foundPage;
  return null;
};
