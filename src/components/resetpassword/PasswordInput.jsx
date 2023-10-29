import React, { useEffect, useState } from "react";
import "./resetPassword.css";
import {
  CheckResetPaswwordLink,
  resetPassword,
} from "../../context/auth/AuthState";
import { useNavigate, useParams } from "react-router-dom";
import PasswordResetSuccess from "./PasswordResetSuccess";

const validatePassword = (password) => {
  return String(password).match(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
};

const PasswordInput = () => {
  const navigate = useNavigate();
  let params = useParams();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [inputDisable, setInputDisable] = useState(true);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [borderColor, setBorderColor] = useState("grey");
  const [renderPage, setRenderPage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    CheckResetPaswwordLink(params.code, navigate).then((res) => {
      setRenderPage(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.code]);

  function handleSubmit(event) {
    event.preventDefault();
    if (password1 === password2) {
      resetPassword(password1, params.code).then((res)=>{
        setSubmitted(res);
      })
    }
  }

  function updatePassword1(event) {
    setPassword1(event.target.value);

    if (validatePassword(event.target.value)) {
      setInputDisable(false);
    } else {
      setInputDisable(true);
      setPassword2("");
    }
    if (password2 === event.target.value && password2 !== "") {
      setButtonDisable(false);
      setBorderColor("green");
    } else {
      setButtonDisable(true);
      setBorderColor("grey");
    }
  }
  function updatePassword2(event) {
    setPassword2(event.target.value);
    if (password1 === event.target.value) {
      setButtonDisable(false);
      setBorderColor("green");
    } else {
      setButtonDisable(true);
      setBorderColor("grey");
    }
  }
  if (submitted) {
    return <PasswordResetSuccess />;
  }
  if (renderPage)
    return (
      <div className="reset-parent-container">
        <div className="reset-container">
          <form onSubmit={handleSubmit} className="reset-form">
            <div>
              <img
                className="logo"
                src="./stock.png"
                alt="stock.png"
                data-testid="logoImage"
              ></img>
            </div>

            <h2 className="headingText" data-testid="headingTest">
              Reset Password
            </h2>

            <div>
              <img
                className="resetKey"
                src="./resetKey.png"
                alt="resetKey.png"
                data-testid="resetImage"
              ></img>
            </div>

            <label className="text-label">Enter New Password</label>

            <div className="form-item">
              <input
                data-testid="newPassword"
                type="password"
                style={{ borderColor: borderColor }}
                className="textField"
                required
                value={password1}
                onChange={updatePassword1}
              />
            </div>

            <label className="text-label">Confirm New Password</label>

            <div className="form-item">
              <input
                data-testid="confirmPassword"
                type="password"
                style={{ borderColor: borderColor }}
                className="textField"
                required
                value={password2}
                onChange={updatePassword2}
                disabled={inputDisable}
              />
            </div>

            <div className="passInstruction">
              <p style={{ textAlign: "center" }}>
                Your Password should follow these
              </p>
              <ul>
                <li>Must be atleast 8 Characters long </li>
                <li>Must contain one uppercase Alphabet </li>
                <li>Must contain one lowercase Alphabet </li>
                <li>Must contain one special Character </li>
                <li>Must contain at least one number [0-9]</li>
              </ul>
            </div>

            <div className="form-btns">
              <button type="submit" disabled={buttonDisable}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default PasswordInput;
