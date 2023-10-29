import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-bootstrap/Carousel";
import { LoginUser } from "../../context/auth/AuthState";
import authContext from "../../context/auth/authContext";

export const Login = () => {
  let navigate = useNavigate();

  const { authState, authDispatch } = useContext(authContext);

  if (authState.isAuthenticated) {
    navigate("/");
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Invalid email pattern"
        )
        .required("Email address is required"),
      password: Yup.string()
        .min(8)
        .min(8, "Password must be 8 characters long!")
        .matches(/[0-9]/, "Password requires a number!")
        .matches(/[a-z]/, "Password requires a lowercase letter!")
        .matches(/[A-Z]/, "Password requires an uppercase letter!")
        .matches(/[^\w]/, "Password requires a symbol!"),
    }),

    onSubmit: async (values) => {
      await LoginUser(values, authDispatch);
    },
  });

  return (
    <div className="loginParentContainer">
      <div className="loginContainer">
        <div className="loginHeader">
          <div className="image">
            <img className="logo" src="stock.png" alt="stock.png"></img>
          </div>
          <h2 className="title_login">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="textlabel_login">
              <label htmlFor="email" className="input-label_login">
                Email
              </label>

              <input
                data-testid="usernameOrEmail"
                name="email"
                type="text"
                placeholder="abc@gmail.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error_msg_login" data-testid="emailError">
                {formik.errors.email}
              </div>
            ) : null}
            <div className="textlabel_login">
              <label htmlFor="password" className="input-label_login">
                Password
              </label>

              <input
                data-testid="login-password"
                name="password"
                type="password"
                placeholder="********"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error_msg_login" data-testid="passwordError">
                {formik.errors.password}
              </div>
            ) : null}
            <Link to="/forgot-password" className="forgotpassword">
              Forgot Password
            </Link>

            {/* if any error occurs we will render this alert */}

            <button
              data-testid="login-button"
              type="submit"
              className="input-button_login"
              name="Login"
            >
              Login
            </button>
            <p className="checksignup_login">
              Dont have an account? <Link to="/SignUp"> Signup </Link>
            </p>
          </form>
        </div>
        <div className="carousel">
          <Carousel>
            <Carousel.Item>
              <img
                className="carousel-image"
                src="login1.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 style={{ color: "black" }}>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-image"
                src="login2.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-image"
                src="login3.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3 style={{ color: "black" }}>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-image"
                src="login4.jpg"
                alt="forth slide"
              />

              <Carousel.Caption>
                <h3>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="carousel-image"
                src="login5.jpg"
                alt="fifth slide"
              />

              <Carousel.Caption>
                <h3>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="carousel-image"
                src="login2.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
