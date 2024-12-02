import React from "react";

function Box({ gift, onClick }) {
  return (
    <div className="box" onClick={onClick}>
      <img src="/images/Box/BoxV1.png" alt={gift.name} className="box-image" />
    </div>
  );
}

export default Box;
