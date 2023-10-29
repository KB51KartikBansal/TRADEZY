import axios from "axios";
import { getTradingDetails, postTradingDetails } from "../config/urlConstants";
import { logger } from "../utils/logger";
import { refreshAccessToken } from "../utils/refreshAccessToken";
import { toast } from "react-toastify";
import { INVALID_ACCESS_TOKEN } from "../config/typeConstants";

export const getUserTradingDetails = async (userId) => {


  try {
    const response = await axios.get(`${getTradingDetails}/${userId}`);
    logger.info("Data successfully fetched");
    return response.data;
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        getUserTradingDetails(userId);
      }
    } else if ( errors?.length > 0) {
      errors.forEatch((error) => {
        logger.error(
          `${error.message} for user ${userId} in getting winning trade list`
        );
        toast.error(error.message);
      });
    } else {
      logger.error(
        "Unknow error Occoured in getWinningTradeList()" +
          errors.toString()
      );
      toast.error("Oops!! try after some time");
    }

  }
};

export const postUserTradingDetails = async (obj) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true ,
      "Access-Control-Allow-Headers": '*',
      
    },
    mode:"cors"
  };

  let url = postTradingDetails;

  try {
    await axios.post(url, obj, config);
    return 0;
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        postUserTradingDetails(obj);
      }
    } else if ( errors?.length > 0) {
      errors.forEatch((error) => {
        logger.error(
          `${error.message} for user ${obj} in getting winning trade list`
        );
        toast.error(error.message);
      });
    } else {
      logger.error(
        "Unknow error Occoured in getWinningTradeList()" +
          errors.toString()
      );
      toast.error("Oops!! try after some time");
    }
  }
};
