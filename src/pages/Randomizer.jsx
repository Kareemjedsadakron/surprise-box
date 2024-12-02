import React, { useState, useRef, useEffect } from "react";
import "../assets/styles/Randomizer.css";

const gifts = [
  { id: 1, image: "/images/CRYBABY/CRYBABY-Crying-Again1.jpg" },
  { id: 2, image: "/images/CRYBABY/CRYBABY-Crying-Again2.jpg" },
  { id: 3, image: "/images/CRYBABY/CRYBABY-Crying-Again3.jpg" },
  { id: 4, image: "/images/CRYBABY/CRYBABY-Crying-Again4.jpg" },
  { id: 5, image: "/images/CRYBABY/crybaby-monster1.jpg" },
  { id: 6, image: "/images/CRYBABY/crybaby-monster2.jpg" },
  { id: 7, image: "/images/CRYBABY/crybaby-monster3.jpg" },
  { id: 8, image: "/images/CRYBABY/crybaby-monster4.jpg" },
  { id: 9, image: "/images/CRYBABY/crybaby-sadclub1.jpg" },
  { id: 10, image: "/images/CRYBABY/crybaby-sadclub2.jpg" },
  { id: 11, image: "/images/CRYBABY/crybaby-powerpuff1.jpg" },
];

function Randomizer() {
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [currentBox, setCurrentBox] = useState(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (isDrawingMode) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(0, 191, 255, 0.8)";
        ctx.shadowColor = "rgba(0, 191, 255, 0.8)";
        ctx.shadowBlur = 15;

        ctxRef.current = ctx;
      }
    }
  }, [isDrawingMode]);

  const startDrawing = (e) => {
    if (!isDrawingMode || !ctxRef.current) return;
    const ctx = ctxRef.current;
    ctx.beginPath();
    ctx.moveTo(
      e.clientX || e.touches[0]?.clientX,
      e.clientY || e.touches[0]?.clientY
    );
  };

  const draw = (e) => {
    if (!isDrawingMode || !ctxRef.current) return;
    const ctx = ctxRef.current;
    ctx.lineTo(
      e.clientX || e.touches[0]?.clientX,
      e.clientY || e.touches[0]?.clientY
    );
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawingMode || !ctxRef.current) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentBox) {
      const gift = gifts.find((gift) => gift.id === currentBox);
      setOpenedBoxes((prev) => [...prev, currentBox]);
      setSelectedGift(gift);
      setCurrentBox(null);
    }

    setIsDrawingMode(false);
  };

  const handleOpenBox = (boxId) => {
    if (openedBoxes.includes(boxId)) return;
    setCurrentBox(boxId);
    setIsDrawingMode(true);
  };

  const handleContinue = () => {
    setSelectedGift(null);
  };

  const allBoxesOpened = openedBoxes.length === gifts.length;

  return (
    <div className="randomizer-container">
      <header className="header">
        <h1>มาจุ่มกัน!! 🎉</h1>
      </header>

      {isDrawingMode && (
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        ></canvas>
      )}

      {!isDrawingMode && !selectedGift && (
        <div className="box-container">
          {gifts
            .filter((gift) => !openedBoxes.includes(gift.id))
            .map((gift) => (
              <div
                key={gift.id}
                className="box"
                onClick={() => handleOpenBox(gift.id)}
              >
                <img src="/images/Box/BoxV2.png" alt="Gift Box" className="box-image" />
              </div>
            ))}
        </div>
      )}

{selectedGift && (
  <div className="popup fullscreen">
    <div className="popup-content bounce">
      <button className="close-popup" onClick={handleContinue}>
        ✖️
      </button>
      <h2 className="popup-header">ยินดีด้วย! 🎉</h2>
      <img
        src={selectedGift.image}
        alt={selectedGift.name}
        className="popup-gift-image"
      />
      <p className="gift-name">{selectedGift.name}</p>
      <div className="popup-buttons">
        <button
          onClick={handleContinue}
          className="button-continue"
          disabled={allBoxesOpened}
        >
          {allBoxesOpened ? "จุ่มหมดแล้วววว" : "จุ่มต่ออออ"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Randomizer;
