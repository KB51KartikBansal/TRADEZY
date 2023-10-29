import axios from "axios";
import { toast } from "react-toastify";
import { getTradeDetailModalURL} from "../config/urlConstants";
import { logger } from "../utils/logger";
import { refreshAccessToken } from "../utils/refreshAccessToken";

export const handleGetWatchlistId = async (userId, tickerNumber) => {
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
    },
  
  };
  
  try {
    const response = await axios.get(`${getTradeDetailModalURL}/${userId}/${tickerNumber}`,config);
    if (response.status === 200) {
      
      logger.success(
        "Fetched trade details successfully for userId - " +
          userId +
          ", Ticker Number - " +
          tickerNumber
      );
      return response.data;
    }
  } catch (error) {
    if (error.status === 403 && error.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + error[0].message);
      if(refreshAccessToken()){
        handleGetWatchlistId(userId,tickerNumber)
      }
    } else {
      logger.error("Error in fetching trade details - " + error.message);
      toast.error("Unable to fetch trade details, try after some time!");

    }
    throw(error)
  }
};
