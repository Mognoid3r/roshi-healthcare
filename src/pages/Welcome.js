// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { auth } from "../services/firebase/firebaseConfig";
// import "../styles/Welcome.css"; // Add this line for styles

// const quotesAndImages = [
//   {
//     quote: "Welcome to Roshi Health, {username}!",
//     image: "/images/welcome1.jpg",
//   },
//   { quote: "Track your progress, {username}.", image: "/images/welcome2.jpg" },
//   { quote: "Stay motivated, {username}.", image: "/images/welcome3.jpg" },
//   { quote: "Achieve your goals!", image: "/images/welcome4.jpg" },
// ];

// const WelcomePage = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [username, setUsername] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsername = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           const response = await axios.get(`/api/users/${user.uid}`);
//           setUsername(response.data.username);
//         }
//       } catch (error) {
//         console.error("Error fetching username:", error);
//       }
//     };

//     fetchUsername();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }, 3000); // Change image and quote every 3 seconds

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (currentIndex >= quotesAndImages.length) {
//       navigate("/profile");
//     }
//   }, [currentIndex, navigate]);

//   return (
//     <div className="welcome-page">
//       {currentIndex < quotesAndImages.length && (
//         <div className="quote-image-container">
//           <img
//             src={quotesAndImages[currentIndex].image}
//             alt="Welcome"
//             className="welcome-image"
//           />
//           <p className="welcome-quote">
//             {quotesAndImages[currentIndex].quote.replace(
//               "{username}",
//               username
//             )}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WelcomePage;

// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import { generateStatic } from "../utils/staticNoise"; // Import the function
// import "../styles/Welcome.css";

// const quotes = [
//   {
//     id: 1,
//     text: "Welcome, {username}! Your journey starts here.",
//     image: "path/to/image1.jpg",
//   },
//   {
//     id: 2,
//     text: "Remember, {username}, every step counts.",
//     image: "path/to/image2.jpg",
//   },
//   {
//     id: 3,
//     text: "Keep pushing forward, {username}!",
//     image: "path/to/image3.jpg",
//   },
// ];

// const Welcome = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
//   const [fade, setFade] = useState(true);
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false);
//       setTimeout(() => {
//         setCurrentQuoteIndex((prevIndex) => {
//           if (prevIndex === quotes.length - 1) {
//             clearInterval(interval);
//             setTimeout(() => {
//               navigate("/profile");
//             }, 2000); // Navigate to the profile page after the last quote
//             return prevIndex;
//           }
//           setFade(true);
//           return prevIndex + 1;
//         });
//       }, 1000); // Time for fade-out
//     }, 5000); // Change quote every 5 seconds, includes time for fade-in and fade-out

//     // Initialize static noise
//     const canvas = canvasRef.current;
//     if (canvas) {
//       generateStatic(canvas);
//     }

//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [navigate]);

//   return (
//     <div className={`welcome-container ${fade ? "fade-in" : "fade-out"}`}>
//       <canvas ref={canvasRef} className="static-overlay"></canvas>
//       <h1>Welcome to Roshi Health!</h1>
//       {user && (
//         <div className="quote-container">
//           <img
//             src={quotes[currentQuoteIndex].image}
//             alt="Motivational"
//             className={`quote-image ${fade ? "grow" : ""}`}
//           />
//           <p className={`quote-text ${fade ? "grow" : ""}`}>
//             {quotes[currentQuoteIndex].text.replace(
//               "{username}",
//               user.username
//             )}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Welcome;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import quotes from "../data/quotes";
import "../styles/Welcome.css";

const Welcome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [pageFade, setPageFade] = useState(false);

  useEffect(() => {
    // Page fade-in
    setTimeout(() => setPageFade(true), 100);

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentQuoteIndex((prevIndex) => {
          if (prevIndex === quotes.length - 1) {
            clearInterval(interval);
            setTimeout(() => {
              // Page fade-out
              setPageFade(false);
              setTimeout(() => {
                navigate("/profile");
              }, 1000); // Time for page fade-out
            }, 3000); // 3 seconds for the last quote
            return prevIndex;
          }
          setFade(true);
          return prevIndex + 1;
        });
      }, 1000); // Time for fade-out
    }, 5000); // Change quote every 5 seconds, includes time for fade-in and fade-out

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [navigate]);

  return (
    <div className={`welcome-page ${pageFade ? "fade-in" : "fade-out"}`}>
      <div className="welcome-overlay"></div>
      <div className={`welcome-container ${fade ? "fade-in" : "fade-out"}`}>
        {user && (
          <div className="quote-container">
            <div className="quote-content">
              <img
                src={quotes[currentQuoteIndex].image}
                alt="Motivational"
                className={`quote-image ${fade ? "fade-in" : "fade-out"}`}
              />
              <p className={`quote-text ${fade ? "fade-in" : "fade-out"}`}>
                {quotes[currentQuoteIndex].text.replace(
                  "{username}",
                  user.username
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
