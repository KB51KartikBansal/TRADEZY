import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import "./Update.css";
import * as Yup from "yup";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { updatePassword } from "../../../services/viewUpdateProfile";
import authContext from "../../../context/auth/authContext";

const Update = () => {
  const { authState } = useContext(authContext);

  const [apiResponse, setApiResponse] = useState({
    message: "",
    isSuccessful: false,
  });

  const initialValues = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [values, setValues] = React.useState({
    showPassword: false,
    shownewPassword: false,
    showconfirmPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, shownewPassword: !values.shownewPassword });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showconfirmPassword: !values.showconfirmPassword });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (values, { resetForm }) => {
    updatePassword(authState.user.userId, values.password, values.newPassword)
      .then((response) => {
        setApiResponse({
          isSuccessful: true,
        });
      })
      .catch((error) => {
        setApiResponse({
          message:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
          isSuccessful: false,
        });
      });

    resetForm({ values: "" });
  };

  const validationSchema = Yup.object({
    password: Yup.string().required("Required!"),
    newPassword: Yup.string()
      .required("Required!")
      .min(8, "Password must be 8 characters long!")
      .matches(/[0-9]/, "Password requires a number!")
      .matches(/[a-z]/, "Password requires a lowercase letter!")
      .matches(/[A-Z]/, "Password requires an uppercase letter!")
      .matches(/[^\w]/, "Password requires a symbol!"),
    confirmPassword: Yup.string()
      .required("Required!")
      .oneOf([Yup.ref("newPassword"), null], "Password must match!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="row mb-3">
        <label className="label">Current Password</label>
        <div>
          <Input
            // data-testid="password"
            inputProps={{ "data-testid": "content-password" }}
            disableUnderline
            type={values.showPassword ? "text" : "password"}
            name="password"
            id="password"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  data-testid="icon-button"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
      </div>

      <div className="row mb-3">
        <label className="label">New Password</label>
        <div>
          <Input
            disableUnderline
            type={values.shownewPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            inputProps={{ "data-testid": "content-newpassword" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  data-testid="newpass-btn"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownNewPassword}
                >
                  {values.shownewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="error">{formik.errors.newPassword}</div>
        ) : null}
      </div>

      <div className="row mb-3">
        <label className="label">Re-Enter Password</label>
        <div>
          <Input
            disableUnderline
            type={values.showconfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            inputProps={{ "data-testid": "content-confirmpassword" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                data-testid="con-btn"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                >
                  {values.showconfirmPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="error">{formik.errors.confirmPassword}</div>
        ) : null}
      </div>

      {/* based on the response from api we will render this alert */}
      {apiResponse.message && (
        <div className="form-group">
          <div
            className={
              apiResponse.isSuccessful
                ? "alert alert-success"
                : "alert alert-danger"
            }
            role="alert"
          >
            {apiResponse.message}
          </div>
        </div>
      )}

      <div className="text-center">
        <button type="Submit" data-testid="btn-submit" className="change-btn">
          Change Password
        </button>
      </div>
    </form>
  );
};

export default Update;
