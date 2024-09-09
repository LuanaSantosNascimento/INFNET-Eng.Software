// src/Navigation.js
import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {Array.from({ length: 16 }, (_, index) => (
          <li key={index}>
            <Link to={`/exercise${index + 1}`}>Exercise {index + 1}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
