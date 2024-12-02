//GiftCard.jsx
import React, { useState } from "react";
import "../styles/Randomizer.css";

const gifts = [
  { name: "หุ่นฟิกเกอร์", image: "/images/figure.png" },
  { name: "ตุ๊กตา", image: "/images/doll.png" },
  { name: "ของสะสมพิเศษ", image: "/images/collectible.png" },
  { name: "แก้วน้ำ", image: "/images/mug.png" },
  { name: "กล่องปริศนา", image: "/images/mystery-box.png" },
];

function Randomizer() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [isRandomizing, setIsRandomizing] = useState(false);

  const handleRandomize = () => {
    setIsRandomizing(true); // เริ่มแอนิเมชัน
    setTimeout(() => {
      const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
      setSelectedGift(randomGift);
      setIsRandomizing(false); // หยุดแอนิเมชัน
    }, 3000); // ระยะเวลาสุ่ม 3 วินาที
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎲 สุ่มของขวัญ Popmart 🎲</h1>
      <button
        onClick={handleRandomize}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {isRandomizing ? "กำลังสุ่ม..." : "สุ่มเลย!"}
      </button>

      {isRandomizing && <p>🎁 กำลังสุ่มของขวัญ...</p>}
      {selectedGift && !isRandomizing && (
        <div style={{ marginTop: "20px" }}>
          <h2>คุณได้รับ: {selectedGift.name}</h2>
          <img
            src={selectedGift.image}
            alt={selectedGift.name}
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
}

export default Randomizer;
