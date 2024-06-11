import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import axios from "axios";
import "../styles/NotificationBell.css"; // Make sure to create this file for styling

const NotificationBell = ({ currentUserId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${currentUserId}/notifications`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (showDropdown) {
      fetchNotifications();
    }
  }, [showDropdown, currentUserId]);

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showDropdown]);

  const acceptFriendRequest = async (fromUserId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/accept-friend-request",
        {
          currentUserId,
          friendUserId: fromUserId,
        }
      );
      setNotifications(
        notifications.filter((notif) => notif.from !== fromUserId)
      );
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  return (
    <div className="notification-bell">
      <FaBell onClick={() => setShowDropdown(!showDropdown)} />
      {showDropdown && (
        <div className="notification-dropdown" ref={dropdownRef}>
          {notifications.length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                {notification.type === "friendRequest" && (
                  <>
                    <p>Friend request from {notification.from}</p>
                    <button
                      onClick={() => acceptFriendRequest(notification.from)}
                    >
                      Accept
                    </button>
                  </>
                )}
                {/* Add other notification types here */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
