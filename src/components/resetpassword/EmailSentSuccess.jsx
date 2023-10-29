import React, { useState } from "react";
import "./resetPassword.css";
import { useNavigate } from "react-router-dom";

const EmailSentSuccess = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    navigate("/login");
  }

  return (
    <div className="reset-container">
      <form onSubmit={handleClick} className="reset-form">
        <div>
          <img
            className="logo"
            data-testid="logoImage"
            src="./stock.png"
            alt="stock.png"
          ></img>
        </div>

        <div>
          <img
            className="emailIcon"
            data-testid="emailIconImage"
            src="./emailIcon.png"
            alt="emailIcon.png"
          ></img>
        </div>

        <h2 className="headingText">Check Your Email</h2>
        <h5 className="headingText5">We have sent a password reset link to</h5>
        <h5 className="headingText5" data-testid="emailFromPrevious">
          {props.email}
        </h5>

        <div className="form-btns">
          <button type="submit"> &#8592; Back to Sign In </button>
        </div>
      </form>
    </div>
  );
};
export default EmailSentSuccess;
