import React from 'react';

function BoxColor({ r, g, b }) {

  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  
  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  
  const boxStyle = {
    backgroundColor: `rgb(${r}, ${g}, ${b})`,
    width: '100%',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '10px',
    color: 'white', 
  };

  return (
    <div style={boxStyle}>
      <p>rgb({r},{g},{b})</p>
      <p>{hexColor}</p>
    </div>
  );
}

export default BoxColor;
