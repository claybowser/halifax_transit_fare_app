import React, { useState } from 'react';

function HoverHighlight() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const highlightStyle = {
    backgroundColor: isHovered ? 'rgba(255, 255, 0, 0.5)' : 'transparent',
    padding: '10px', // Add padding for better visibility
    transition: 'background-color 0.3s ease', // Add a smooth transition
    cursor: 'pointer', // Change cursor on hover
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={highlightStyle}
    >
      <p>Hover over me!</p>
      {/* You can place any content you want here */}
    </div>
  );
}

export default HoverHighlight;
