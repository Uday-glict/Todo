import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import AddList from "../Components/AddList";
import Show from "../Components/Show";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home/AddList" element={<AddList/>} />
      <Route path="/home/update/:id" element={<Show/>} />
    </Routes>
  </Router>
);