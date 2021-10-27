import React, { MutableRefObject, useRef, useState} from "react";
import email_white_36dp from "../static/landing/email-white-36dp.svg"
import check from "../static/landing/check.svg"
import cross from "../static/landing/cross.svg"

export const EmailForm = () => {
  const [mailChimpResponse, setMailChimpResponse] = useState("");

  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;
  
  const addEmail = (event: any) => {
   
    event.preventDefault()
    
    
    const actualEmailInput = emailInput.current.value
    console.log(actualEmailInput)
    fetch('/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: actualEmailInput,
      }),
    }).then((res) => {
      console.log("first promise")
      return res.json();
    })
      .then((json) => {
          console.log("second promise reached")
          let response = "";
          response = json.message;
          
          if (!json.success) {
            if (json.reason) {
              response += ': ' + json.reason;
            }
          }
          setMailChimpResponse(response);
        });
  }
  const userErrorFiller = () => {
    if (mailChimpResponse === "Invalid email") {
      return (
        <div className="chip">
          <span> {mailChimpResponse}</span>
          <img className="form-icon" src={cross} />
        </div>
      );
    }
    else if (mailChimpResponse !== "Invalid email" && mailChimpResponse !== "") {
      return (
      <div className="chip">
        <span>{mailChimpResponse}</span>
        </div>
      ); 
    }
  }
  const determineFiller = () => {
    if (mailChimpResponse === "Confirmed"){
      return <div id="confirmed-box">
      <span id="confirmation-text">Thanks, see you soon!</span>
      </div>
    }
    else {
      return (
      <div className="form-container">
        <div className="form">
          <div className="form-email">
          <form onSubmit={addEmail}>
              
                <label className="form-email">
                  
                  <img src={email_white_36dp} alt="envelope"/>

                  <input
                    id="email-input" 
                    ref={emailInput}
                    placeholder="Enter your email"
                  />
                  {userErrorFiller()}
                </label>
            
                
            <button type="submit"> Submit :-) </button>
            </form>
          </div>

        </div>
      </div>); 
    }
  }
  return (
      <div className="email-form">
        <p id="join-line">Join 1000+ makers, innovators, and dreamers.</p>
        <p id="sub-join-line">Be the first to know when applications are live!</p>
        {determineFiller()}
      </div>
     
  );
};
