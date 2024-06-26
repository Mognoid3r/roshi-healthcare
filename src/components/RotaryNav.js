import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaHome,
  FaClipboardList,
  FaBell,
  FaTimes,
} from "react-icons/fa";
import "../styles/RotaryNav.css";
import NotificationModal from "./NotificationModal";
import { useAuth } from "../hooks/useAuth";

const RotaryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  // const navigate = useNavigate();
  const { user } = useAuth(); // Access user from useAuth

  useEffect(() => {
    if (user && user.notifications) {
      setNotificationCount(user.notifications.length);
    }
  }, [user]);

  const links = [
    { href: "/programs", icon: <FaClipboardList /> },
    { href: "/dashboard", icon: <FaHome /> },
    {
      icon: (
        <div className="notification-icon">
          <FaBell />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>
      ),
      onClick: () => handleOpenNotifications(),
    }, // Notifications
  ];

  const toggleNav = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const closeNav = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const calculateTransform = (index, total) => {
    const angle = -45 + (180 / (total - 1)) * index; // Adjust the 45 to change starting angle
    const radius = 60; // Adjust the radius as needed
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return `translate(${-x}px, ${-y}px)`; // Inverting x and y to move to the left
  };

  const handleOpenNotifications = () => {
    setIsModalOpen(true);
    closeNav();
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeNav}></div>}
      <div className={`rotary-nav ${isOpen ? "open" : ""}`}>
        <button className="toggle" onClick={toggleNav}>
          {isOpen ? <FaTimes onClick={closeNav} /> : <FaBars />}
          {!isOpen && notificationCount > 0 && (
            <span className="notification-badge-closed">
              {notificationCount}
            </span>
          )}
        </button>
        <div className="links">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={link.onClick}
              style={{
                transform: isOpen
                  ? calculateTransform(index, links.length)
                  : "none",
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notifications={user?.notifications || []} // Fetch notifications from user state
        currentUserId={user.uid} // Pass the current user's ID
      />
    </>
  );
};

export default RotaryNav;
