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
