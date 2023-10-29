import axios from "axios";
import { toast } from "react-toastify";
import { INVALID_ACCESS_TOKEN } from "../config/typeConstants";
import { updatedPasswordURL, userDataURL } from "../config/urlConstants";
import { encryptUsingRsa } from "../utils/encryptUsingRsa";
import { logger } from "../utils/logger";
import { refreshAccessToken } from "../utils/refreshAccessToken";

export const updatePassword = async (userId, currentPassword, newPassword) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true ,
      "Access-Control-Allow-Headers": '*',
      
    },
    mode:"cors"
  };
  var publicKey = process.env.REACT_APP_PUBLIC_KEY;
  try {
    var encryptedCurrentPassword = encryptUsingRsa(currentPassword, publicKey);
    var encryptedOldPassword = encryptUsingRsa(newPassword, publicKey);
    const res = await axios.put(
      updatedPasswordURL,
      { encryptedCurrentPassword, encryptedOldPassword, userId },
      config
    );
    logger.info({ message: res.data.message });
    logger.info(res);
    return res.data;
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        updatePassword(userId, currentPassword, newPassword);
      }
    } else if ( errors?.length > 0) {
      for(let i=0;i<errors.length;i++) {
        logger.error(
          `${errors[i].message} for user ${userId} in getting winning trade list`
        );
        toast.error(errors[i].message);
      }
    } else {
      logger.error(
        "Unknow error Occoured in getWinningTradeList()" +
          errors.toString()
      );
      toast.error("Oops!! try after some time");
    }
    throw error;
  }
};

export const fetchUserProfileData = async (userId) => {
  try {
    let res = await axios.get(userDataURL + `/${userId}`,);
    logger.info({ message: res.data.message });
    logger.info(res);
    return res.data;
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        fetchUserProfileData(userId);
      }
    } else if ( errors?.length > 0) {
      for(let i=0;i<errors.length;i++) {
        logger.error(
          `${errors[i].message} for user ${userId} in getting winning trade list`
        );
        toast.error(errors[i].message);
      }
    } else {
      logger.error(
        "Unknow error Occoured in getWinningTradeList()" +
          errors.toString()
      );
      toast.error("Oops!! try after some time");
    }
    throw error;
  }
};
