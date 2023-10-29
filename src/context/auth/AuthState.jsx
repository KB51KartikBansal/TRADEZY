import { useContext, useReducer, useEffect } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import { encryptUsingRsa } from "../../utils/encryptUsingRsa";
import {
  AUTH_WITH_TOKEN,
  INVALID_ACCESS_TOKEN,
  LOGIN_SUCCESS,
  SET_LOADING,
} from "../../config/typeConstants";
import {
  loginURL,
  signUpURL,
  resetPasswordURL,
  authWithToken,
} from "../../config/urlConstants";

import setAuthToken from "../../utils/setAuthToken";
import { toast } from "react-toastify";
import { logger } from "../../utils/logger";
import { refreshAccessToken } from "../../utils/refreshAccessToken";

export const useAuth = () => {
  const { authState, authDispatch } = useContext(AuthContext);
  return [authState, authDispatch];
};
export const LoginUser = async (data, dispatch) => {
  const { email, password } = data;

  try {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };
    const publicKey =
      process.env.REACT_APP_PUBLIC_KEY ||
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsh2sdqlS6kJxTEx+5wxDELHQGt9fADvLOSI1yRbpVFVgh1CRn6lajRbn9N2IDqirkQIOM2ZToePVhSTCbDEb6/QHxOal+mPFaDgcLF1zxi5MhEcNDBVnuk3UHOnGmcqKMxLi+x6sz6zlsTaiU8AygWkqH/LIZAHQSHLICJ7Vf5KDCOvq2y+3sy9zpERJ8UzLoqWQJ+Epe58/C4jKRPSN5tH9h5fMhuiBoOuW6M80X8+ir0Q26a9mlasAI3qtyF/zZiR6RhxZDhcaNRcruD7Jy12jVIWNG9jl+LttWyZvnB8VkAs6OYACdUChxnAbJg8guP5B0OebFZyVCVojm/9w1wIDAQAB";
    const encryptedPassword = encryptUsingRsa(password, publicKey);
    const res = await axios.post(
      loginURL,
      { email, password: encryptedPassword },
      config
    );
    logger.info("user login succcessfull");
    setAuthToken(res.data.accessToken, res.data.refreshToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    console.log("status", status, "errors", errors);
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        LoginUser(data, dispatch);
      }
    } else if (errors?.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        logger.error(`${errors[i]?.message} for user ${data?.email}`);
        toast.error(errors[i]?.message);
      }
    } else {
      logger.error("Unknown error occurred in LoginUser()" + errors.toString());
      toast.error("Oops!! Try after some time");
    }
  }
};
export const RegisterUser = async (data, dispatch) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Headers": "*",
    },
    mode: "cors",
  };
  try {
    var publicKey =
      process.env.REACT_APP_PUBLIC_KEY ||
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsh2sdqlS6kJxTEx+5wxDELHQGt9fADvLOSI1yRbpVFVgh1CRn6lajRbn9N2IDqirkQIOM2ZToePVhSTCbDEb6/QHxOal+mPFaDgcLF1zxi5MhEcNDBVnuk3UHOnGmcqKMxLi+x6sz6zlsTaiU8AygWkqH/LIZAHQSHLICJ7Vf5KDCOvq2y+3sy9zpERJ8UzLoqWQJ+Epe58/C4jKRPSN5tH9h5fMhuiBoOuW6M80X8+ir0Q26a9mlasAI3qtyF/zZiR6RhxZDhcaNRcruD7Jy12jVIWNG9jl+LttWyZvnB8VkAs6OYACdUChxnAbJg8guP5B0OebFZyVCVojm/9w1wIDAQAB";
    data.password = encryptUsingRsa(data.password, publicKey);

    delete data.confirmPassword;

    await axios.post(signUpURL, data, config);

    toast.success("verify your email");
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        RegisterUser(data, dispatch);
      }
    } else if (errors?.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        logger.error(`${errors[i]?.message} for user ${data?.email}`);
        toast.error(errors[i]?.message);
      }
    } else {
      logger.error(
        "Unknown error occurred in RegisterUser()" + errors.toString()
      );
      toast.error("Oops!! Try after some time");
    }
  }
};
export const resetPassword = async (password, code) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Headers": "*",
    },
    mode: "cors",
  };
  try {
    var publicKey =
      process.env.REACT_APP_PUBLIC_KEY ||
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsh2sdqlS6kJxTEx+5wxDELHQGt9fADvLOSI1yRbpVFVgh1CRn6lajRbn9N2IDqirkQIOM2ZToePVhSTCbDEb6/QHxOal+mPFaDgcLF1zxi5MhEcNDBVnuk3UHOnGmcqKMxLi+x6sz6zlsTaiU8AygWkqH/LIZAHQSHLICJ7Vf5KDCOvq2y+3sy9zpERJ8UzLoqWQJ+Epe58/C4jKRPSN5tH9h5fMhuiBoOuW6M80X8+ir0Q26a9mlasAI3qtyF/zZiR6RhxZDhcaNRcruD7Jy12jVIWNG9jl+LttWyZvnB8VkAs6OYACdUChxnAbJg8guP5B0OebFZyVCVojm/9w1wIDAQAB";
    var encryptedPassword = encryptUsingRsa(password, publicKey);

    await axios.post(
      `${resetPasswordURL}/${code}`,
      { password: encryptedPassword },
      config
    );
    return true;
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        resetPassword(password);
      }
    } else if (errors?.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        logger.error(`${error[i].message} for reset passwoard request`);
        toast.error(error[i].message);
      }
    } else {
      logger.error(
        "Unknown error occurred in resetPassword()" + errors.toString()
      );
      toast.error("Oops!! Try after some time");
    }
  }
};

const validateWithToken = async (token, authDispatch) => {
  try {
    
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const res = await axios.post(authWithToken);

    authDispatch({
      type: AUTH_WITH_TOKEN,
      payload: res?.data?.userId,
    });
  } catch (error) {
    authDispatch({
      type: SET_LOADING,
    });
    const { errors } = error?.response?.data;
    if (errors?.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        logger.error(`${errors[i]?.message} for user`);
      }
    } else {
      logger.error(
        "Unknown error occurred in validateWithToken()" + errors.toString()
      );
    }
  }
};

const AuthState = (props) => {
  const intialState = {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isAuthenticated: false,
    loading: false,
    user:null
    // user: { userId: 1, userName: "sanjay" },
  };

  const [authState, authDispatch] = useReducer(authReducer, intialState);

  useEffect(() => {
    if (authState.accessToken !== undefined && authState.accessToken !== null)
      validateWithToken(authState.accessToken, authDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.accessToken]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;

export const SendingEmail = async (email) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Headers": "*",
    },

    mode: "cors",
  };
  try {
    await axios.post(resetPasswordURL, { email}, config);
    logger.info("email sent successfull to " + email);
    return true;
  } catch (error) {
    const { errors } = error?.response?.data;
    if (errors?.length > 0) {
      for (let i = 0; i < errors.length; i++) {
        logger.error(`${errors[i]?.message} for user ${email}`);
        toast.error(errors[i]?.message);
      }
    } else {
      logger.error(
        "Unknown error occurred in ResetPassword()" + errors.toString()
      );
      toast.error("Oops!! Try after some time");
    }
  }
};

export const CheckResetPaswwordLink = async (code, navigate) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Headers": "*",
    },
    mode: "cors",
  };
  try {
    await axios.get(`${resetPasswordURL}/${code}`, config);
    return true;
  } catch (error) {
    const { errors } = error?.response?.data;
    if(errors.length>0)
    {
      for(let i=0;i<errors.length;i++)
      {
        logger.error("");
      }

    }
    logger.error("Invaild Link or Link expired");
    toast.error("Your Link is Expired or Invalid! Kindly, generate new link from here");
    navigate("/forgot-password");
  }
};
