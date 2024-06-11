// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../hooks/useAuth";

// const FriendRequestButton = ({ friendUsername }) => {
//   const { user: currentUser } = useAuth(); // Get the current user's data from the context
//   const [isPending, setIsPending] = useState(false);
//   const [isFriend, setIsFriend] = useState(false);

//   useEffect(() => {
//     const fetchFriendData = async () => {
//       try {
//         const friendUsernameDoc = await axios.get(
//           `http://localhost:5000/api/users/username/${friendUsername}`
//         );
//         const friendUid = friendUsernameDoc.data.uid;

//         if (currentUser.friends.includes(friendUid)) {
//           setIsFriend(true);
//         } else if (currentUser.outgoingFriendRequests.includes(friendUid)) {
//           setIsPending(true);
//         }
//       } catch (error) {
//         console.error("Error fetching friend data:", error);
//       }
//     };

//     fetchFriendData();
//   }, [currentUser, friendUsername]);

//   const sendFriendRequest = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/users/send-friend-request", {
//         currentUserId: currentUser.uid,
//         friendUsername,
//       });
//       setIsPending(true);
//     } catch (error) {
//       console.error("Error sending friend request:", error);
//     }
//   };

//   const cancelFriendRequest = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/cancel-friend-request",
//         {
//           currentUserId: currentUser.uid,
//           friendUsername,
//         }
//       );
//       setIsPending(false);
//     } catch (error) {
//       console.error("Error cancelling friend request:", error);
//     }
//   };

//   if (isFriend) {
//     return <div>Friends</div>;
//   }

//   return (
//     <div>
//       {isPending ? (
//         <button
//           onClick={cancelFriendRequest}
//           style={{ backgroundColor: "red", color: "white" }}
//         >
//           Cancel Request
//         </button>
//       ) : (
//         <button onClick={sendFriendRequest}>Send Friend Request</button>
//       )}
//     </div>
//   );
// };

// export default FriendRequestButton;

// above code works great but want to ensure a user can delete a friend from their friends list

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../hooks/useAuth";

// const FriendRequestButton = ({ friendUsername }) => {
//   const { user: currentUser } = useAuth(); // Get the current user's data from the context
//   const [isPending, setIsPending] = useState(false);
//   const [isFriend, setIsFriend] = useState(false);

//   useEffect(() => {
//     const fetchFriendData = async () => {
//       try {
//         const friendUsernameDoc = await axios.get(
//           `http://localhost:5000/api/users/username/${friendUsername}`
//         );
//         const friendUid = friendUsernameDoc.data.uid;

//         if (currentUser.friends.includes(friendUid)) {
//           setIsFriend(true);
//         } else if (currentUser.outgoingFriendRequests.includes(friendUid)) {
//           setIsPending(true);
//         }
//       } catch (error) {
//         console.error("Error fetching friend data:", error);
//       }
//     };

//     fetchFriendData();
//   }, [currentUser, friendUsername]);

//   const sendFriendRequest = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/users/send-friend-request", {
//         currentUserId: currentUser.uid,
//         friendUsername,
//       });
//       setIsPending(true);
//     } catch (error) {
//       console.error("Error sending friend request:", error);
//     }
//   };

//   const cancelFriendRequest = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/users/cancel-friend-request",
//         {
//           currentUserId: currentUser.uid,
//           friendUsername,
//         }
//       );
//       setIsPending(false);
//     } catch (error) {
//       console.error("Error cancelling friend request:", error);
//     }
//   };

//   const removeFriend = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/users/remove-friend", {
//         currentUserId: currentUser.uid,
//         friendUsername,
//       });
//       setIsFriend(false);
//     } catch (error) {
//       console.error("Error removing friend:", error);
//     }
//   };

//   if (isFriend) {
//     return (
//       <button
//         onClick={removeFriend}
//         style={{ backgroundColor: "red", color: "white" }}
//       >
//         Remove Friend
//       </button>
//     );
//   }

//   return (
//     <div>
//       {isPending ? (
//         <button
//           onClick={cancelFriendRequest}
//           style={{ backgroundColor: "red", color: "white" }}
//         >
//           Cancel Request
//         </button>
//       ) : (
//         <button onClick={sendFriendRequest}>Send Friend Request</button>
//       )}
//     </div>
//   );
// };

// export default FriendRequestButton;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const FriendRequestButton = ({ friendUsername }) => {
  const { user: currentUser } = useAuth(); // Get the current user's data from the context
  const [isPending, setIsPending] = useState(false);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const friendUsernameDoc = await axios.get(
          `http://localhost:5000/api/users/username/${friendUsername}`
        );
        const friendUid = friendUsernameDoc.data.uid;

        if (currentUser.friends.includes(friendUid)) {
          setIsFriend(true);
        } else if (currentUser.outgoingFriendRequests.includes(friendUid)) {
          setIsPending(true);
        }
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };

    fetchFriendData();
  }, [currentUser, friendUsername]);

  const sendFriendRequest = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/send-friend-request", {
        currentUserId: currentUser.uid,
        friendUsername,
      });
      setIsPending(true);
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const cancelFriendRequest = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/cancel-friend-request",
        {
          currentUserId: currentUser.uid,
          friendUsername,
        }
      );
      setIsPending(false);
    } catch (error) {
      console.error("Error cancelling friend request:", error);
    }
  };

  const removeFriend = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/remove-friend", {
        currentUserId: currentUser.uid,
        friendUsername,
      });
      setIsFriend(false);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  if (isFriend) {
    return (
      <button
        onClick={removeFriend}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Remove Friend
      </button>
    );
  }

  return (
    <div>
      {isPending ? (
        <button
          onClick={cancelFriendRequest}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Cancel Request
        </button>
      ) : (
        <button onClick={sendFriendRequest}>Send Friend Request</button>
      )}
    </div>
  );
};

export default FriendRequestButton;
