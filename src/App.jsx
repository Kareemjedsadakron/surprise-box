import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Randomizer from "./pages/Randomizer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/randomizer" element={<Randomizer />} />
      </Routes>
    </Router>
  );
}

export default App;
