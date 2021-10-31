import React from "react";
import {Title} from "./components/Title";
import {EmailForm} from "./components/EmailForm";
import {Cityscape} from "./components/Cityscape";
import "./App.scss"

const App = () => {
  return (
      <div className="landing">
        <Title />
        <EmailForm />
        <Cityscape />
      </div>
  );
};

export default App;
