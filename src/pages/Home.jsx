import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [birthdayDate, setBirthdayDate] = useState(new Date("2024-12-01T00:00:00"));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showFireworks, setShowFireworks] = useState(false);
  const navigate = useNavigate();

  const imagePaths = [
    "/images/Couple-photo/9th-september1.jpeg",
    "/images/Couple-photo/home-pp1.jpeg",
    "/images/Couple-photo/home-pp2.jpeg",
    "/images/Couple-photo/home-pp3.jpeg",
    "/images/Couple-photo/pattaya1.jpeg",
    "/images/Couple-photo/pattaya2.jpeg",
    "/images/Couple-photo/pattaya3.jpeg",
    "/images/Couple-photo/pattaya4.jpeg",
    "/images/Couple-photo/pattaya5.jpeg",
    "/images/Couple-photo/rice-field1.jpeg",
    "/images/Couple-photo/rice-field2.jpeg",
    "/images/Couple-photo/rice-field3.jpeg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "24112567") {
      setIsAuthenticated(true);
      setShowFireworks(true);
      setTimeout(() => {
        setShowFireworks(false);
      }, 5000);
    } else {
      alert("รหัสผ่านไม่ถูกต้อง!");
    }
  };

  const timeDifference = Math.ceil(
    (birthdayDate - currentDate) / (1000 * 60 * 60 * 24)
  );

  const renderMessage = () => {
    if (currentDate.toDateString() === birthdayDate.toDateString()) {
      return "ขอให้เป็นวันเกิดที่ดีน้าาา คนเก่งเค้าจะอยู่ข้างๆเทอแบบนี้ 💖";
    } else if (currentDate > birthdayDate) {
      const daysPassed = Math.abs(timeDifference);
      return `ถึงแม้จะเลยวันเกิดมาแล้ว ${daysPassed} วัน แต่ก็ขอให้เป็นวันที่ดีต่อไปน้า 💕`;
    } else {
      return `เหลือเวลาอีก ${timeDifference} วันสำหรับวันเกิดของคุณ 🎉`;
    }
  };

  const handleOpenGift = () => {
    navigate("/randomizer");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className={`home-container`}>
      <h1 className="title">
        สุขสันต์วันเกิดนะคนเก่ง{" "}
        <span className="emoji-apple" role="img" aria-label="apple">
          🍎
        </span>
      </h1>
      <h3 className="subtitle">
        ขอให้พี่ได้ทุกสิ่งที่หวังไว้ และมีความสุขมาก ๆ ในทุกวัน 💖
      </h3>

      <h2 className="date">{currentDate.toDateString()}</h2>

      {/* Image Slider */}
      <Slider {...sliderSettings} className="gallery-slider">
        {imagePaths.map((path, index) => (
          <div key={index} className="slider-item">
            <img src={path} alt={`Gallery ${index}`} className="slider-image" />
          </div>
        ))}
      </Slider>

      <p className="message">{renderMessage()}</p>

      <ReactPlayer
        url="https://www.youtube.com/watch?v=UWqe8Uh--X8"
        playing
        controls
        width="100%"
        className="youtube-player"
      />

      {!isAuthenticated && (
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <label className="password-label">
            คำใบ้: "วันแรกของเรา"
            <div className="password-circles">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className={`circle ${
                    password[index] ? "filled" : "empty"
                  }`}
                ></div>
              ))}
            </div>
            <input
              type="password"
              placeholder="ใส่รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength="8"
              className="password-input"
            />
          </label>
          <button type="submit" className="submit-button">
            ยืนยัน
          </button>
        </form>
      )}

      {isAuthenticated && (
        <>
          <div className="gift-section">
            <p className="gift-message">ขอให้วันเกิดนี้มีความสุขมากๆ นะ 💖</p>
            <div
              className={`gift-box ${showFireworks ? "fireworks-background" : ""}`}
              onClick={handleOpenGift}
            >
              <img
                src="/images/Gif/g02.gif"
                alt="Gift Box"
                className="gift-gif"
              />
              <p className="gift-text">เปิดของขวัญ</p>
            </div>

            <h2 className="rr-text">
              ผมอาจจะไม่ได้พูดหวาน ๆ บ่อย แต่พี่สำคัญกับผมมากนะ อยู่กับพี่แล้วผมสบายใจ
              ขอบคุณที่เป็นตัวเองและทำให้ทุกวันของผมมีความสุขมากขึ้น 😊
              พี่คือคนที่ผมอยากดูแลไปเรื่อย ๆ แม้บางครั้งผมอาจจะยังไม่เก่งเท่าไหร่...
              แต่ผมอยากทำให้พี่ยิ้มได้ในทุก ๆ วันนะ 🍎 💖
            </h2>
          </div>

          {/* Video Slider */}
          <Slider {...sliderSettings} className="video-slider">
            {[
              "/images/Video/hbd.mp4",
              "/images/Video/pp01.mp4",
              "/images/Video/pp02.mp4",
              "/images/Video/pp03.mp4",
              "/images/Video/pp04.mp4",
              "/images/Video/pp05.mp4",
            ].map((path, index) => (
              <div key={index} className="slider-item">
                <video controls className="slider-video">
                  <source src={path} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default Home;
