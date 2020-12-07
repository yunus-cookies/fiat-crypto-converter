import React from "react";
import "./NavBar.css";

export default function NavBar({ handleSelectChange }) {
  return (
    <>
      <div className="nav_section">
        <div className="nav_wrapper">
          <h2>Crypto/Fiat converter</h2>
          <select onChange={handleSelectChange} label="Currency">
            <option value={20}>Fiat</option>
            <option value={30}>Crypto</option>
          </select>
        </div>
      </div>
    </>
  );
}
