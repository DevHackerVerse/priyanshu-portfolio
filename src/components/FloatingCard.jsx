// src/components/FloatingCard.jsx - Fast response version
import React, { useRef } from 'react';

const FloatingCard = ({ children }) => {
  const cardRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    // Apply transform immediately without transition on mouse move
    card.style.transition = 'none';
    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  };
  
  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    // Remove transition when entering to make initial movement instant
    cardRef.current.style.transition = 'none';
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Only add transition when leaving for smooth reset
    cardRef.current.style.transition = 'transform 300ms ease-out';
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };
  
  return (
    <div 
      ref={cardRef}
      className="will-change-transform"
      style={{ transform: 'perspective(1000px) rotateX(0) rotateY(0)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default FloatingCard;