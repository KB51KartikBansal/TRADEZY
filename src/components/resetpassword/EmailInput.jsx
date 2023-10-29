import React, { useState } from "react";
import { SendingEmail } from "../../context/auth/AuthState";
import "./emailInput.css";
import EmailSentSuccess from "./EmailSentSuccess";

const EmailInput = () => {
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [checkEmail, setCheckEmail] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [displayError, setDisplayError] = useState("none");

  async function handleSubmit(event) {
    event.preventDefault();
    let flag = await SendingEmail(email);
    if (flag) setCheckEmail(flag);
  }
  function handleChange(event) {
    setEmail(event.target.value);
  }

  if (checkEmail) {
    return <EmailSentSuccess email={email} />;
  } else {
    return (
      <div className="email-parent-container">
        <div className="email-container">
          <form onSubmit={handleSubmit} className="emailForm">
            <img
              width="80px"
              height="80px"
              className="m-1 p-2"
              data-testid="logoImage"
              src="./stock.png"
              alt="stock.png"
            ></img>

            <div>
              <img
                className="m-4"
                width="80px"
                height="80px"
                data-testid="lockImage"
                src="./lock.png"
                alt="lock.png"
              ></img>
            </div>

            <h2>Forgot Password? </h2>
            <h5>No worries, we'll send you reset Instructions</h5>

            <input
              type="email"
              className="w-75 border rounded m-4 p-1"
              data-testid="emailInput"
              minLength={10}
              placeholder="Enter Email "
              value={email}
              onChange={handleChange}
              required
            />
            <div className="form-btns-email">
              <button type="submit"> Submit </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};
export default EmailInput;
