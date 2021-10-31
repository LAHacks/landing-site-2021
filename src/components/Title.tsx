import React  from 'react';
import title300 from "../static/landing/title-300w.svg"
import title700 from "../static/landing/title-700w.svg"
import "./Title.scss"

export const Title = () => {
  return (
      <div className="title-container">
        <img
            id="title"
            srcSet={`${title300} 300w,
                    ${title700} 800w`}
            sizes="(max-width: 900px) 300px, 800px"
            src={title700}
            alt="LA Hacks 2021, March 21-28 2021"
        />
      </div>
  );
};
