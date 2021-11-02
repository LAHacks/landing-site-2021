import React from 'react';
import title700 from "../static/landing/title-700w.svg"
import moon from "../static/landing/moon.svg"
import leftStars from "../static/landing/LeftStars.svg"
import rightStars from "../static/landing/RightStars.svg"
import "./Title.scss"

export const Title = () => {
  return (
      <div className="title-container">
        <img
            id="title"
            sizes="(max-width: 900px) 300px, 800px"
            src={title700}
            alt="LA Hacks 2021, March 21-28 2021"
        />
        <img
            id={"Moon"}
            src={moon} alt={""}/>
        <img
          className={"stars leftStars"}
          src={leftStars} alt={""}
        />
        <img
            className={"stars rightStars"}
            src={rightStars} alt={""}
        />
      </div>
  );
};
