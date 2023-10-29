import axios from "axios";
import { toast } from "react-toastify";
import {
  executeTradeURL,
  deleteTradeURL,
  tradeMicroServiceUrl,
} from "../config/urlConstants.js";
import { logger } from "../utils/logger";
import { loadTradeDetails } from "../context/trade/TradeState.jsx";
export const executeTrade = async (
  tradeDetailId,
  stopLoss,
  profitTarget,
  quantity,
  userId,
  currentPage,
  tradeDetailDispatcher,
  setExecuteDisabledState,
  setShowModal
) => {
  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true ,
      "Access-Control-Allow-Headers": '*',
      
    },
    mode:"cors"
  };
  try {
    if(typeof setExecuteDisabledState!=='undefined')
      setExecuteDisabledState(true);
    const res = await axios.post(
      tradeMicroServiceUrl + executeTradeURL,
      { tradeDetailId, stopLoss:parseFloat(stopLoss), profitTarget:parseFloat(profitTarget) , quantity },
      config
    );
    logger.info({ message: res.data.message });
    logger.info(res);
    toast.success(res.data.message);
  } catch (error) {
    if(typeof setExecuteDisabledState!=='undefined')
        setExecuteDisabledState(false);
    logger.error({ errorName: "executeDetail", error });
    if(error.response.status === 0)
    {
      toast.error("Please check internet connection");
    }
    else if(error.response.status >= 400)
    {
      toast.error("Can't place the trade. Please, try again later")
    }
    else {
      toast.error(error.message);
    }
    throw error;
  }
  finally{
    loadTradeDetails(userId, currentPage - 1, tradeDetailDispatcher);
    if(typeof setExecuteDisabledState!=='undefined')
      setExecuteDisabledState(false);
    if(typeof setShowModal!=='undefined')
      setShowModal(false);
  }
};

export const deleteTrade = async (
  tradeDetailId,
  userId,
  currentPage,
  tradeDetailDispatcher
) => {
  try {
    let res = await axios.delete(
      tradeMicroServiceUrl + `/deleteTradeURL/${tradeDetailId}`
    );
    logger.info({ message: res.data.message });
    logger.info(res);
    loadTradeDetails(userId, currentPage - 1, tradeDetailDispatcher);
    return res.data;
  } catch (error) {

    logger.error({ errorName: "deleteTrade", error });
    if (error.response.status == 0){
      toast.error("Please check internet connection");
    }
    else if(error.response.status >= 400)
    {
      toast.error("Can't delete the trade. Please, try again later")
    }
    else   {
      toast.error(error.message);
    }
    throw error;
  }
};
