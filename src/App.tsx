import React from "react";
import {Title} from "./components/Title";
import {EmailForm} from "./components/EmailForm";
import "./main.scss"

const App = () => {
  return (
      <div className="landing">
        <Title />
        <EmailForm />
      </div>
  );
};

export default App;
