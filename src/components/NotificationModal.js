// import React, { useState, useEffect } from "react";
// import "../styles/NotificationModal.css";
// import axios from "axios";

// const NotificationModal = ({
//   isOpen,
//   onClose,
//   notifications: initialNotifications,
//   currentUserId,
// }) => {
//   const [notifications, setNotifications] = useState(initialNotifications);

//   useEffect(() => {
//     setNotifications(initialNotifications);
//   }, [initialNotifications]);

//   if (!isOpen) return null;

//   const acceptFriendRequest = async (fromUsername, index) => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/accept-friend-request",
//         {
//           currentUserId,
//           friendUsername: fromUsername,
//         }
//       );
//       const newNotifications = notifications.filter((_, i) => i !== index);
//       setNotifications(newNotifications);
//     } catch (error) {
//       console.error("Error accepting friend request:", error);
//     }
//   };

//   const clearNotification = async (index) => {
//     try {
//       await axios.post("http://localhost:5000/api/users/clear-notification", {
//         currentUserId,
//         index,
//       });
//       const newNotifications = notifications.filter((_, i) => i !== index);
//       setNotifications(newNotifications);
//     } catch (error) {
//       console.error("Error clearing notification:", error);
//     }
//   };

//   const clearAllNotifications = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/clear-all-notifications",
//         {
//           currentUserId,
//         }
//       );
//       setNotifications([]);
//     } catch (error) {
//       console.error("Error clearing all notifications:", error);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <span className="close" onClick={onClose}>
//           &times;
//         </span>
//         <h2>Notifications</h2>
//         {notifications.length === 0 ? (
//           <div className="no-notification">No notifications</div>
//         ) : (
//           <>
//             <ul>
//               {notifications.map((notification, index) => (
//                 <li key={index}>
//                   {notification.message}
//                   {notification.type === "friendRequest" && (
//                     <button
//                       className="accept-button"
//                       onClick={() =>
//                         acceptFriendRequest(notification.fromUsername, index)
//                       }
//                     >
//                       Accept
//                     </button>
//                   )}
//                   <button
//                     className="clear-button"
//                     onClick={() => clearNotification(index)}
//                   >
//                     Clear
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <button
//               className="clear-all-button"
//               onClick={clearAllNotifications}
//             >
//               Clear All
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationModal;

//the above code works great but we need to clear notifications in the DB when accepting friend requests

import React, { useState, useEffect } from "react";
import "../styles/NotificationModal.css";
import axios from "axios";

const NotificationModal = ({
  isOpen,
  onClose,
  notifications: initialNotifications,
  currentUserId,
}) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  if (!isOpen) return null;

  const acceptFriendRequest = async (fromUsername, index) => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/accept-friend-request",
        {
          currentUserId,
          friendUsername: fromUsername,
        }
      );
      const newNotifications = notifications.filter((_, i) => i !== index);
      setNotifications(newNotifications);
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const acknowledgeProgramShare = async (index) => {
    try {
      // Assuming there's an endpoint to acknowledge the shared program notification
      await axios.post(
        "http://localhost:5000/api/users/acknowledge-program-share",
        {
          currentUserId,
          index,
        }
      );
      const newNotifications = notifications.filter((_, i) => i !== index);
      setNotifications(newNotifications);
    } catch (error) {
      console.error("Error acknowledging program share:", error);
    }
  };

  const clearNotification = async (index) => {
    try {
      await axios.post("http://localhost:5000/api/users/clear-notification", {
        currentUserId,
        index,
      });
      const newNotifications = notifications.filter((_, i) => i !== index);
      setNotifications(newNotifications);
    } catch (error) {
      console.error("Error clearing notification:", error);
    }
  };

  const clearAllNotifications = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/clear-all-notifications",
        {
          currentUserId,
        }
      );
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Notifications</h2>
        {notifications.length === 0 ? (
          <div className="no-notification">No notifications</div>
        ) : (
          <>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>
                  {notification.message}
                  {notification.type === "friendRequest" && (
                    <button
                      className="accept-button"
                      onClick={() =>
                        acceptFriendRequest(notification.fromUsername, index)
                      }
                    >
                      Accept
                    </button>
                  )}
                  {notification.type === "programShare" && (
                    <button
                      className="acknowledge-button"
                      onClick={() => acknowledgeProgramShare(index)}
                    >
                      Acknowledge
                    </button>
                  )}
                  <button
                    className="clear-button"
                    onClick={() => clearNotification(index)}
                  >
                    Clear
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="clear-all-button"
              onClick={clearAllNotifications}
            >
              Clear All
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
