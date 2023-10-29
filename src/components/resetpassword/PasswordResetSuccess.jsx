import React, { useState } from "react";
import "./resetPassword.css";
import { useNavigate } from "react-router-dom";

const PasswordResetSuccess = () => {
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
    <div className="password-success-parent-container">
      <div className="pass-sent-container">
        <form onSubmit={handleClick} className="pass-sent-form">
          <div>
            <img
              className="logo-pass"
              src="./stock.png"
              alt="stock.png"
              data-testid="logoImage"
            ></img>
          </div>

          <div>
            <img
              className="success"
              src="./success.png"
              alt="success.png"
              data-testid="successImage"
            ></img>
          </div>

          <h3 className="headingText3-success-reset">Password Changed!</h3>

          <h5 className="headingText5-success-reset">
            Your Password has been changed Successfully!
          </h5>

          <div className="form-btns-success-pass">
            <button type="submit">&#8592; Back to Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
