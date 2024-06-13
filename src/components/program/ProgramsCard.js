import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const gradients = [
  ["#ff7e5f", "#feb47b"],
  ["#6a11cb", "#2575fc"],
  ["#ff6a00", "#ee0979"],
  ["#3a1c71", "#d76d77", "#ffaf7b"],
  ["#56ab2f", "#a8e063"],
  ["#00c6ff", "#0072ff"],
  ["#f7971e", "#ffd200"],
  ["#fc4a1a", "#f7b733"],
  ["#12c2e9", "#c471ed", "#f64f59"],
  ["#ff9a9e", "#fecfef"],
];

const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex];
};

const CardWrap = styled.div`
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;

  &:hover .card-info {
    transform: translateY(0);
  }
  &:hover .card-info p {
    opacity: 1;
  }
  &:hover .card-info,
  &:hover .card-info p {
    transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }
  &:hover .card-info:after {
    transition: 5s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 1;
    transform: translateY(0);
  }
  &:hover .card-bg {
    transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
      opacity 5s cubic-bezier(0.23, 1, 0.32, 1);
    opacity: 0.8;
  }
  &:hover .card {
    transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 2s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: rgba(255, 255, 255, 0.2) 0 0 40px 5px,
      rgba(255, 255, 255, 1) 0 0 0 1px, rgba(0, 0, 0, 0.66) 0 30px 60px 0,
      inset #333 0 0 0 5px, inset rgba(255, 255, 255, 0.5) 0 0 0 6px;
  }
`;

const CardStyled = styled.div`
  position: relative;
  width: 240px;
  height: 240px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
    inset rgba(255, 255, 255, 0.5) 0 0 0 6px;
  transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
`;

const CardBg = styled.div`
  opacity: 0.5;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s cubic-bezier(0.445, 0.05, 0.55, 0.95),
    opacity 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  pointer-events: none;
`;

const CardInfo = styled.div`
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(0, 0, 0, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }
`;

const CardTitle = styled.h1`
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(0, 0, 0, 0.5) 0 10px 10px;
`;

const CardCreator = styled.p`
  font-family: "Raleway";
  font-size: 14px;
  font-weight: 400;
  text-shadow: rgba(0, 0, 0, 0.5) 0 2px 3px;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 40px;
  right: 10px;
  background: #444;
  color: white;
  font-weight: 400;
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${({ $isOpen }) =>
    $isOpen ? "block" : "none"}; // Use $ prefix for transient prop
  z-index: 100;
`;

const MenuItem = styled.li`
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`;

const Card = ({
  image,
  title,
  content,
  onDelete,
  onDuplicate,
  onShare,
  onRename,
  username,
}) => {
  const cardRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [gradient, setGradient] = useState(getRandomGradient());

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);

  const handleMouseMove = (e) => {
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
      cardRef.current;
    const { clientX, clientY } = e;
    const x = (clientX - offsetLeft) / offsetWidth;
    const y = (clientY - offsetTop) / offsetHeight;
    setMouse({ x, y });
  };

  const cardStyle = {
    transform: `rotateY(${(mouse.x - 0.5) * 30}deg) rotateX(${
      (0.5 - mouse.y) * 30
    }deg)`,
  };

  const cardBgStyle = {
    backgroundImage: `linear-gradient(to bottom right, ${gradient[0]}, ${
      gradient[1]
    }${gradient[2] ? `, ${gradient[2]}` : ""})`,
    transform: `translateX(${(mouse.x - 0.5) * -40}px) translateY(${
      (mouse.y - 0.5) * -40
    }px)`,
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete();
  };

  const handleDuplicate = () => {
    setMenuOpen(false);
    onDuplicate();
  };

  const handleShare = () => {
    setMenuOpen(false);
    onShare();
  };

  const handleRename = () => {
    setMenuOpen(false);
    onRename();
  };

  return (
    <CardWrap ref={cardRef} onMouseMove={handleMouseMove}>
      <CardStyled style={cardStyle}>
        <CardBg style={cardBgStyle}></CardBg>
        <CardInfo className="card-info">
          <CardTitle>{title}</CardTitle>
          <p>{content}</p>
          <CardCreator>{`Created by ${username}`}</CardCreator>
        </CardInfo>
        <MenuButton onClick={handleMenuToggle}>⋮</MenuButton>
        <Menu $isOpen={menuOpen}>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
          <MenuItem onClick={handleDuplicate}>Duplicate</MenuItem>
          <MenuItem onClick={handleShare}>Share</MenuItem>
          <MenuItem onClick={handleRename}>Rename</MenuItem>
        </Menu>
      </CardStyled>
    </CardWrap>
  );
};

export default Card;

// ########## Testing Share functionality in code below#####################################
