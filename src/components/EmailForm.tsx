import React, {MutableRefObject, useRef, useState} from "react";
import email_white_36dp from "../static/landing/email-white-36dp.svg"
import cross from "../static/landing/cross.svg"
import "./EmailForm.scss"

export const EmailForm = () => {
  const [mailChimpResponse, setMailChimpResponse] = useState("");
  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;

  const addEmail = async (event: any) => {
    event.preventDefault()

    try {
      const actualEmailInput = emailInput.current.value
      const resp = await fetch('/v1/email', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": actualEmailInput,
        }),
      })

      const json = await resp.json()
      // If success then the response should be the message, otherwise it
      // should be the reason if it is give.
      const response = json.success ? json.message : json.reason || "";

      setMailChimpResponse(response);

    } catch (e) {
      setMailChimpResponse("Invalid Email")
    }
  }
  const userErrorFiller = () => {
    if (mailChimpResponse === "Invalid email") {
      return (
          <div className="chip">
            <span> {mailChimpResponse}</span>
            <img className="form-icon" src={cross}/>
          </div>
      );
    } else if (mailChimpResponse !== "Invalid email" && mailChimpResponse !== "") {
      return (
          <div className="chip">
            <span>{mailChimpResponse}</span>
          </div>
      );
    }
  }
  const determineFiller = () => {
    if (mailChimpResponse === "Confirmed") {
      return <div id="confirmed-box">
        <span id="confirmation-text">Thanks, see you soon!</span>
      </div>
    } else {
      return (
          <div className="form-container">
            <form onSubmit={addEmail} className="form">
              <label className="form-email">
                <img src={email_white_36dp} alt="envelope"/>
                <input
                    id="email-input"
                    ref={emailInput}
                    placeholder="Enter your email"
                />
                {userErrorFiller()}
              </label>
            </form>
          </div>
      );
    }
  }
  return (
      <div className="email-form">
        <p id="join-line">Join 1000+ makers, innovators, and dreamers.</p>
        <p id="sub-join-line">Be the first to know when applications are
          live!</p>
        {determineFiller()}
      </div>

  );
};
