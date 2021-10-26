import React, { MutableRefObject, useRef, useState} from "react";
import email_white_36dp from "../static/landing/email-white-36dp.svg"
import check from "../static/landing/check.svg"
import cross from "../static/landing/cross.svg"

export const EmailForm = () => {
  const [mailChimpResponse, setMailChimpResponse] = useState("");

  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;

  const addEmail = (event: React.FormEvent<HTMLFormElement>) => {
    /*if(event.key !== 'Enter') {
      return;
    }*/

    fetch('/v1/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailInput,
      }),
    }).then((res) => {
      return res.json();
    })
        .then((json) => {
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

  
  return (
      <div className="email-form">
        <p id="join-line">Join 1000+ makers, innovators, and dreamers.</p>
        <p id="sub-join-line">Be the first to know when applications are live!</p>

        <div className="form-container">
          <div className="form">
            <form onSubmit={(event) => addEmail(event)}>
              <fieldset>
                <label className="form-email">
                  
                  <img src={email_white_36dp} />

                  <input
                    id="email-input" 
                    ref={emailInput}
                    placeholder="Enter your email"
                  />

                </label>
              </fieldset>
            </form>
          </div>

        </div>
        
        {/*
        {mailChimpResponse !== "Confirmed" && (
            <div className="form-container">
              <div className="form">
                <div className="form-email">
                  <img src={email_white_36dp} />
                  <input id="email-input" placeholder="Enter your email" onKeyDown={addEmail}/>
                </div>
                {mailChimpResponse === "" && (
                    <div className="chip">
                      <span>Press return</span>
                      <img className="form-icon" src={check}/>
                    </div>
                )}
                {mailChimpResponse === "Invalid email" && (
                    <div className="chip">
                      <span>{mailChimpResponse}</span>
                      <img className="form-icon" src={cross}/>
                    </div>
                )}
              </div>
              {mailChimpResponse !== "Invalid email" && mailChimpResponse !== "" && (
                  <div className="chip">
                    <span>{mailChimpResponse}</span>
                  </div>
              )}
            </div>
        )}

        {mailChimpResponse === "Confirmed" && (
            <div id="confirmed-box">
              <span id="confirmation-text">Thanks, see you soon!</span>
            </div>
        )}
        */}
      </div>
  );
};
