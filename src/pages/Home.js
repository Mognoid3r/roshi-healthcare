// import React, { useState } from "react";
// import Login from "../components/Login";
// import SignUp from "../components/SignUp";
// import "../styles/Home.css";

// const Home = () => {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);

//   return (
//     <div className="home-container">
//       <h1>Roshi Health</h1>
//       <div className="home-buttons">
//         <button onClick={() => setShowSignUp(true)}>Sign Up</button>
//         <button onClick={() => setShowLogin(true)}>Login</button>
//       </div>

//       {showLogin && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close" onClick={() => setShowLogin(false)}>
//               &times;
//             </button>
//             <Login />
//           </div>
//         </div>
//       )}

//       {showSignUp && (
//         <div className="modal">
//           <div className="modal-content">
//             <button className="close" onClick={() => setShowSignUp(false)}>
//               &times;
//             </button>
//             <SignUp />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
// import Login from "../components/Login";
import SignUpModal from "../components/SignUpModal"; // Update this line

import "../styles/Home.css";
import LoginModal from "../components/LoginModal";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="home-container">
      <h1>Roshi Health</h1>
      <div className="home-buttons">
        <SignUpModal />
        <LoginModal />
      </div>
    </div>
  );
};

export default Home;
