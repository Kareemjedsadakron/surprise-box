import React from "react";

const Popup = ({ gift, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Congratulations! 🎁</h2>
        <img src={gift.image} alt={gift.name} />
        <p>{gift.name}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
