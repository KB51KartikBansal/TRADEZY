import axios from "axios";
import { toast } from "react-toastify";
import {
  tradeAlertDataURL,
  
  getTradeDetailsUrl,
} from "../config/urlConstants";
import { logger } from "../utils/logger";
import { refreshAccessToken } from "../utils/refreshAccessToken";
export default async function tradeAlertsData(userId) {
  try {
    const response = await axios.get(`${tradeAlertDataURL}/${userId}`);
    logger.info("trade elert data fetched "+response.data)
    return response.data;
  } catch (error) {
    toast.error("Unable to fetch details, try after some time!");
    logger.info("Failed to load trade alerts: " + error);
  }
}

export const handleDeleteTradeAlert = async (userId, alertId) => {
  const tradeMicroServiceUrl = "api/trade";
  const deleteTradeAlertUrl = "/alert";
  const userIdData = `/${userId}`;
  const alertIdData = `/${alertId}`;
  const finalUrl =
    tradeMicroServiceUrl + deleteTradeAlertUrl + userIdData + alertIdData;
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true ,
        "Access-Control-Allow-Headers": '*',
        
      },
      mode:"cors"
    };
  try {
    const response = await axios.delete(finalUrl, config);
    if (response.status === 204) {
      logger.success(
        "Deleted trade alert successfuly for user Id - " +
          userId +
          ", trade alert Id - " +
          alertId
      );
      const deleteSuccessString = "Deleted trade alert successfully!";
      toast.success(deleteSuccessString);
    }
  } catch (error) {
    if (error.status === 401 && error.code === "INVALID_ACCESS_TOKEN") {
      logger.warn("Access token expired" + error.message);
      if (refreshAccessToken()) {
        handleDeleteTradeAlert(userId, alertId);
      }
    } else {
      logger.error("Error in deleting trade alert - " + error.message);
      toast.error("Unable to delete trade alert, try after some time!");
    }
  }
};

export const handleGetTradeDetails = async (userId, alertId) => {
  const finalUrl =  getTradeDetailsUrl;
  const data = {
    userId: userId,
    alertId: alertId,
  };
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true ,
      "Access-Control-Allow-Headers": '*'
      
    },
    mode:"cors"
  };
  try {
    const response = await axios.post(finalUrl, data, config);
    if (response.status === 200) {
      logger.success(
        "Fetched trade details successfully for userId - " +
          userId +
          ", alertId - " +
          alertId
      );
      return response.data;
    }
  } catch (error) {
    if (error.status === 401 && error.code === "INVALID_ACCESS_TOKEN") {
      logger.warn("Access token expired" + error.message);
      if (refreshAccessToken()) {
        handleGetTradeDetails(userId, alertId);
      }
    } else {
      logger.error("Error in fetching trade details - " + error.message);
      toast.error("Unable to fetch trade details, try after some time!");
    }
  }
};
