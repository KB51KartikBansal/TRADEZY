import React, { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-bootstrap/Carousel";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import authContext from "../../context/auth/authContext";
import { RegisterUser } from "../../context/auth/AuthState";
import "./SignUp.css";
import { toast } from "react-toastify";

const SignUp = () => {
  const { authState, authDispatch } = useContext(authContext);
  const navigate = useNavigate();
  if (authState.isAuthenitcated) navigate("/");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Wrong email pattern"
        )
        .required("Email address is required"),
      password: Yup.string()
        .trim()
        .min(8)
        .min(8, "Password must be 8 characters long!")
        .matches(/[0-9]/, "Password requires a number!")
        .matches(/[a-z]/, "Password requires a lowercase letter!")
        .matches(/[A-Z]/, "Password requires an uppercase letter!")
        .matches(/[^\w]/, "Password requires a symbol!"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Match Confirm Password is required"
      ),
      userName: Yup.string().trim(),
      firstName: Yup.string().trim(),
      lastname: Yup.string().trim(),

      phoneNumber: Yup.string()
        .trim()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Invalid phone number"
        )
        .required("Phone number is required"),
    }),

    onSubmit: async (values) => {
      if (
        formik.values.confirmPassword !== formik.values.password ||
        formik.values.confirmPassword.length < 8
      ) {
        toast.error("choose strong password");
      } else {
        await RegisterUser(values, authDispatch);
      }
    },
  });

  return (
    <div className="signUpParentContainer">
      <div className="signUpContainer">
        <div className="signUpHeader">
          <div className="image">
            <img className="logo" src="stock.png" alt="stock" />
          </div>
          <h2 className="title"> Sign Up </h2>

          <form onSubmit={formik.handleSubmit}>
            <div className="textlabel">
              <label htmlFor="userName" className="input-label">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                data-testid="userName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
              />
            </div>
            {formik.touched.userName && formik.errors.userName ? (
              <div className="error_msg">{formik.errors.userName}</div>
            ) : null}
            <div className="textlabel">
              <label htmlFor="firstName" className="input-label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                data-testid="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
            </div>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error_msg">{formik.errors.firstName}</div>
            ) : null}

            <div className="textlabel">
              <label htmlFor="lastName" className="input-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                data-testid="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error_msg">{formik.errors.lastName}</div>
            ) : null}

            <div className="textlabel">
              <label htmlFor="phoneNumber" className="input-label">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                autoComplete="true"
                id="phoneNumber"
                data-testid="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="error_msg">{formik.errors.phoneNumber}</div>
            ) : null}
            <div className="textlabel">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="true"
                data-testid="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error_msg">{formik.errors.email}</div>
            ) : null}
            <div className="textlabel">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                data-testid="signup-password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error_msg">{formik.errors.password}</div>
            ) : null}
            <div className="textlabel">
              <label htmlFor="confirmPassword" className="input-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                data-testid="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error_msg">{formik.errors.confirmPassword}</div>
            ) : null}

            <div className="sign-up-form-btns">
              <button
                className="input-button_signup"
                type="submit"
                data-testid="signup-button"
                disabled={!(formik.isValid && formik.dirty)}
              >
                SignUp
              </button>
              <p className="options">
                Already have an account? <Link to="/login">Sign In</Link>

              </p>
            </div>
          </form>
        </div>

        <div className="carouselcontainer">
          <Carousel>
            <Carousel.Item>
              <img
                className="carousel-images"
                src="signup1.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-images"
                src="login2.jpg"
                alt="Second slide"
              />

              <Carousel.Caption>
                <h3 style={{ color: "black" }}>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="carousel-images"
                src="signup3.jpg"
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3 style={{ color: "black" }}>Tradezy</h3>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="carousel-images"
                src="https://static.vecteezy.com/system/resources/previews/000/271/401/original/international-business-vector.jpg"
                alt="Third slide"
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
export default SignUp;
