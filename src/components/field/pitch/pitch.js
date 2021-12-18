
import React, { useState, useEffect } from "react";

import './pitch.css';

const Pitch = () => {
  return (
    <div className="top">
      <div className="field" style={{display: 'flex', flexDirection: 'column'}}>
        <div className="half half-top">
          <div className="arc arc-top"></div>
          <div className="eighteen eighteen-top"></div>
          <div className="six six-top"></div>
          <div className="corner corner-top-left"></div>
          <div className="corner corner-top-right"></div>
        </div>
        <div className="half half-bottom">
          <div className="arc arc-bottom"></div>
          <div className="eighteen eighteen-bottom"></div>
          <div className="six six-bottom"></div>
          <div className="corner corner-bottom-left"></div>
          <div className="corner corner-bottom-right"></div>
        </div>
      </div>
      <div className="center-circle"></div>
    </div>
  );
}

export default Pitch;
