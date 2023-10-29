import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import "./TradingDetails.css";
import { useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  getUserTradingDetails,
  postUserTradingDetails,
} from "../../../services/userTradingDetails";
import { useContext } from "react";
import authContext from "../../../context/auth/authContext";

const TradingDetails = () => {
  const {authState}=useContext(authContext);
  const [readOnly, setReadOnly] = useState(true);
  const [dataFound, setDataFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      totalAmount: "",
      amountPerTrade: "",
      risk: "",
      equity: "",
    },
    onSubmit: (values) => {
      handleSave();
    },
    validationSchema: Yup.object({
      totalAmount: Yup.number()
        .typeError("You must specify a number")
        .min(500, "Minimum amount of 500 should be added")
        .max(500000, "You can add only upto 5 Lacs at once")
        .required("Amount is required")
        .test(
          "is-decimal",

          "More than two decimal places are not allowed",

          (value) => (value + "").match(/^\d+\.{0,1}\d{0,2}$/)
        ),

      amountPerTrade: Yup.number()
        .typeError("You must specify a number")
        .min(0.1, "Amount per trade should be atleast 0.1%")
        .max(100, "Amount per trade cannot exceed 100%")
        .required("Amount per trade is required")
        .test(
          "is-decimal",

          "More than two decimal places are not allowed",

          (value) => (value + "").match(/^\d+\.{0,1}\d{0,2}$/)
        ),

      risk: Yup.number()
        .typeError("You must specify a number")
        .min(0.1, "Risk per trade should be atleast 0.1%")
        .max(100, "Risk per trade cannot exceed 100%")
        .required("Risk per trade is required")
        .test(
          "is-decimal",

          "More than two decimal places are not allowed",

          (value) => (value + "").match(/^\d+\.{0,1}\d{0,2}$/)
        ),
    }),
  });

  const loadData = () => {
    setLoading(true);
    getUserTradingDetails(authState?.user?.userId)
      .then((res) => {
        setDataFound(true);
        formik.setFieldValue(
          "totalAmount",
          res.totalAmount ? res.totalAmount : ""
        );
        formik.setFieldValue(
          "amountPerTrade",
          res.amountPerTrade ? res.amountPerTrade : ""
        );
        formik.setFieldValue("risk", res.riskPerTrade ? res.riskPerTrade : "");
        formik.setFieldValue("equity", res.totalEquity ? res.totalEquity : "");
      })
      .catch((err) => {
        setDataFound(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (readOnly === true) {
      loadData();
    }
  }, [readOnly]);

  const handleUpdate = (e) => {
    setDataFound(true);
    setReadOnly(false);
    formik.resetForm({ values: "" });
  };

  const handleCancel = () => {
    setReadOnly(true);
  };

  const handleSave = async () => {
    setLoading(true);
    let obj = {
      userId:authState?.user?.userId,
      totalAmount: formik.values.totalAmount,
      amountPerTrade: formik.values.amountPerTrade,
      riskPerTrade: formik.values.risk,
    };

    postUserTradingDetails(obj)
      .then((res) => {
        setLoading(false);
        setReadOnly(true);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Error saving the data. Please try again", {
          toastId: "saveErrorTradingDetails",
        });
      });
  };

  return (
    <div>
      {loading ? (
        <>
          <div className="loader-container mb-3">
            <div className="spinner"></div>
          </div>
          <p className="loadingMessage">
            {readOnly
              ? "Please wait while we fetch your details..."
              : "Saving..."}
          </p>
        </>
      ) : (
        <div>
          {!dataFound && (
            <div className="alert alert-warning" role="alert">
              Oops! It seems like you haven't setup your trading account. To
              setup your trading account click the button below.
            </div>
          )}
          {dataFound && (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group row mb-3">
                <label
                  htmlFor="totalAmount"
                  className="col-lg-2 col-form-label"
                >
                  {readOnly ? "Total Amount" : "Add Amount"}
                </label>
                <div className="col-lg-10">
                  <input
                    type="number"
                    className={
                      readOnly ? "form-control readOnlyInput" : "form-control"
                    }
                    id="totalAmount"
                    readOnly={readOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.totalAmount}
                    step={0.01}
                  />
                  {formik.touched.totalAmount &&
                  formik.errors.totalAmount &&
                  !readOnly ? (
                    <div className="error_msg">{formik.errors.totalAmount}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row mb-3">
                <label htmlFor="amountPerTrade" className="col-lg-2 form-label">
                  Amount Per Trade (%)
                </label>
                <div className="col-lg-10 pt-2">
                  <input
                    type="number"
                    className={
                      readOnly ? "form-control readOnlyInput" : "form-control"
                    }
                    id="amountPerTrade"
                    readOnly={readOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amountPerTrade}
                  />
                  {formik.touched.amountPerTrade &&
                  formik.errors.amountPerTrade &&
                  !readOnly ? (
                    <div className="error_msg">
                      {formik.errors.amountPerTrade}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row mb-3 mt-3">
                <label htmlFor="risk" className="col-lg-2 form-label">
                  Risk Per Trade(%)
                </label>
                <div className="col-lg-10 pt-1">
                  <input
                    type="number"
                    className={
                      readOnly ? "form-control readOnlyInput" : "form-control"
                    }
                    id="risk"
                    readOnly={readOnly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.risk}
                  />
                  {formik.touched.risk && formik.errors.risk && !readOnly ? (
                    <div className="error_msg">{formik.errors.risk}</div>
                  ) : null}
                </div>
              </div>
              <div className={readOnly ? "form-group row mb-3 mt-3" : "d-none"}>
                <label htmlFor="totalEquity" className="col-lg-2 form-label">
                  Total Equity
                </label>
                <div className="col-lg-10">
                  <input
                    type="number"
                    className={"readOnlyInput pl-2"}
                    id="totalEquity"
                    readOnly
                    value={formik.values.equity}
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className={
                    !readOnly ? "btn-primary btn mx-2" : "d-none"
                  }
                >
                  &nbsp;Save&nbsp;
                </button>
                <span> </span>
                <button
                  type="button"
                  className={!readOnly ? "btn-danger btn" : "d-none"}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <div className="col-md-12 text-center">
            <button
              type="button"
              className={readOnly ? "change-btn" : "d-none"}
              onClick={(e) => handleUpdate(e)}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingDetails;
