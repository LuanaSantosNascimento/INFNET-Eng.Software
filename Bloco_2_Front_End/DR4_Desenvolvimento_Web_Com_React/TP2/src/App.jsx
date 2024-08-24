// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import Exercise01 from "./exercises/Exercise01";
import Exercise02 from "./exercises/Exercise02";
import Exercise03 from "./exercises/Exercise03";
import Exercise04 from "./exercises/Exercise04";
import Exercise05 from "./exercises/Exercise05";
import Exercise06 from "./exercises/Exercise06";
import Exercise07 from "./exercises/Exercise07";
import Exercise08 from "./exercises/Exercise08";
import Exercise09 from "./exercises/Exercise09";
import Exercise10 from "./exercises/Exercise10";
import Exercise11 from "./exercises/Exercise11";
import Exercise12 from "./exercises/Exercise12";
import Exercise13 from "./exercises/Exercise13";
import Exercise14 from "./exercises/Exercise14";
import Exercise15 from "./exercises/Exercise15";
import Exercise16 from "./exercises/Exercise16";

const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise1" element={<Exercise01 />} />
          <Route path="/exercise2" element={<Exercise02 />} />
          <Route path="/exercise3" element={<Exercise03 />} />
          <Route path="/exercise4" element={<Exercise04 />} />
          <Route path="/exercise5" element={<Exercise05 />} />
          <Route path="/exercise6" element={<Exercise06 />} />
          <Route path="/exercise7" element={<Exercise07 />} />
          <Route path="/exercise8" element={<Exercise08 />} />
          <Route path="/exercise9" element={<Exercise09 />} />
          <Route path="/exercise10" element={<Exercise10 />} />
          <Route path="/exercise11" element={<Exercise11 />} />
          <Route path="/exercise12" element={<Exercise12 />} />
          <Route path="/exercise13" element={<Exercise13 />} />
          <Route path="/exercise14" element={<Exercise14 />} />
          <Route path="/exercise15" element={<Exercise15 />} />
          <Route path="/exercise16" element={<Exercise16 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
