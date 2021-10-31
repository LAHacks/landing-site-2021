import React from "react";
import {Title} from "./components/Title";
import {EmailForm} from "./components/EmailForm";
import {Cityscape} from "./components/Cityscape";
import leftCloud from "./static/landing/Left Side Cloud.svg"
import rightCloud from "./static/landing/Right Side Cloud.svg"
import "./App.scss"

const App = () => {
  return (
      <div className="landing">
        <Title />
        <EmailForm />
        <Cityscape />
        <img className={"cloud leftCloud"} src={leftCloud}/>
        <img className={"cloud rightCloud"} src={rightCloud}/>
      </div>
  );
};

export default App;
