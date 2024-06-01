// import React, { useState } from "react";
// import "../styles/RotaryNav.css";

// const RotaryNav = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNav = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className={`rotary-nav ${isOpen ? "open" : ""}`}>
//       <div className="hamburger" onClick={toggleNav}>
//         {isOpen ? "✖" : "☰"}
//       </div>
//       <div className="nav-links">
//         <a href="/profile" className="nav-link">
//           Profile
//         </a>
//         <a href="/programs" className="nav-link">
//           Programs
//         </a>
//         <a href="/records" className="nav-link">
//           Personal Records
//         </a>
//         <a href="/current-program" className="nav-link">
//           Current Program
//         </a>
//       </div>
//     </div>
//   );
// };

// export default RotaryNav;

// **************************************************************

// import React, { useState, useEffect } from "react";
// import "../styles/RotaryNav.css";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import {
//   GiWeightLiftingUp,
//   GiBodyHeight,
//   GiDiscussion,
//   GiNotebook,
// } from "react-icons/gi";
// import { AiOutlineHome } from "react-icons/ai";
// import { MdOutlinePersonalVideo } from "react-icons/md";

// const RotaryNav = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNav = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeNav = () => {
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("nav-open");
//     } else {
//       document.body.classList.remove("nav-open");
//     }
//   }, [isOpen]);

//   return (
//     <>
//       {isOpen && <div className="backdrop" onClick={closeNav}></div>}
//       <div className={`rotary-nav ${isOpen ? "open" : ""}`}>
//         <div className="hamburger" onClick={toggleNav}>
//           {isOpen ? <FaTimes /> : <FaBars />}
//         </div>
//         <div className="nav-links">
//           <Link to="/home" className="nav-link" onClick={closeNav}>
//             <AiOutlineHome />
//           </Link>
//           <Link to="/workouts" className="nav-link" onClick={closeNav}>
//             <GiWeightLiftingUp />
//           </Link>
//           <Link to="/personal-records" className="nav-link" onClick={closeNav}>
//             <GiBodyHeight />
//           </Link>
//           <Link to="/community" className="nav-link" onClick={closeNav}>
//             <GiDiscussion />
//           </Link>
//           <Link to="/profile" className="nav-link" onClick={closeNav}>
//             <GiNotebook />
//           </Link>
//           <Link to="/videos" className="nav-link" onClick={closeNav}>
//             <MdOutlinePersonalVideo />
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RotaryNav;

// ***************************************

// import React, { useState, useEffect } from "react";
// import "../styles/RotaryNav.css";
// import { Link } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import {
//   GiWeightLiftingUp,
//   GiBodyHeight,
//   GiDiscussion,
//   GiNotebook,
// } from "react-icons/gi";
// import { AiOutlineHome } from "react-icons/ai";
// // import { MdOutlinePersonalVideo } from "react-icons/md";

// const RotaryNav = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleNav = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeNav = () => {
//     setIsOpen(false);
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add("nav-open");
//     } else {
//       document.body.classList.remove("nav-open");
//     }
//   }, [isOpen]);

//   return (
//     <>
//       {isOpen && <div className="backdrop" onClick={closeNav}></div>}
//       <div className={`rotary-nav ${isOpen ? "open" : ""}`}>
//         <div className="hamburger" onClick={toggleNav}>
//           {isOpen ? <FaTimes onClick={closeNav} /> : <FaBars />}
//         </div>
//         <div className="nav-links">
//           <Link to="/home" className="nav-link" onClick={closeNav}>
//             <AiOutlineHome />
//           </Link>
//           <Link to="/workouts" className="nav-link" onClick={closeNav}>
//             <GiWeightLiftingUp />
//           </Link>
//           <Link to="/personal-records" className="nav-link" onClick={closeNav}>
//             <GiBodyHeight />
//           </Link>
//           <Link to="/community" className="nav-link" onClick={closeNav}>
//             <GiDiscussion />
//           </Link>
//           <Link to="/profile" className="nav-link" onClick={closeNav}>
//             <GiNotebook />
//           </Link>
//           {/* <Link to="/videos" className="nav-link" onClick={closeNav}>
//             <MdOutlinePersonalVideo />
//           </Link> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default RotaryNav;

// *******************************

// Best one so far

// import React, { useState } from "react";
// import {
//   FaPlus,
//   FaTimes,
//   FaHome,
//   FaUserAlt,
//   FaDumbbell,
//   FaRunning,
//   FaBook,
//   FaEnvelope,
// } from "react-icons/fa";
// import "../styles/RotaryNav.css";

// const RotaryNav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const links = [
//     { href: "/home", icon: <FaHome /> },
//     { href: "/profile", icon: <FaUserAlt /> },
//     { href: "/workouts", icon: <FaDumbbell /> },
//     { href: "/activities", icon: <FaRunning /> },
//     { href: "/journal", icon: <FaBook /> },
//     { href: "/contact", icon: <FaEnvelope /> },
//     // Add more links here as needed
//   ];

//   const toggleNav = () => {
//     setIsOpen(!isOpen);
//   };

//   const calculateTransform = (index, total) => {
//     const angle = 45 + (90 / (total - 1)) * index; // Adjust the 45 to change starting angle
//     const radius = 80; // Adjust the radius as needed
//     return `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;
//   };

//   return (
//     <div className={`rotary-nav ${isOpen ? "open" : ""}`}>
//       <button className="toggle" onClick={toggleNav}>
//         {isOpen ? <FaTimes /> : <FaPlus />}
//       </button>
//       <div className="links">
//         {links.map((link, index) => (
//           <a
//             key={index}
//             href={link.href}
//             style={{
//               transform: isOpen
//                 ? calculateTransform(index, links.length)
//                 : "none",
//             }}
//           >
//             {link.icon}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RotaryNav;

import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaUsers,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";
import "../styles/RotaryNav.css";

const RotaryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: "/dashboard", icon: <FaHome /> },
    { href: "/profile", icon: <FaUserAlt /> },
    { href: "/community", icon: <FaUsers /> },
    { href: "/programs", icon: <FaClipboardList /> },
    { href: "/settings", icon: <FaCog /> },
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
    const radius = 90; // Adjust the radius as needed
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return `translate(${-x}px, ${-y}px)`; // Inverting x and y to move to the left
  };

  return (
    <>
      {isOpen && <div className="overlay" onClick={closeNav}></div>}
      <div className={`rotary-nav ${isOpen ? "open" : ""}`}>
        <button className="toggle" onClick={toggleNav}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="links">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
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
    </>
  );
};

export default RotaryNav;
