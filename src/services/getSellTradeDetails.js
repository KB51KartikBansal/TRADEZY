// import React from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import { LOAD_TRADE_DETAIL_MODAL } from '../config/typeConstants';
import { logger } from "../utils/logger";
import { refreshAccessToken } from '../utils/refreshAccessToken';

export const getSellTradeDetails = async(userPortfolioId,tradeDetailModalDispatcher,setShowModal) => {
    const sellTradeDetailsUrl = "";         //to be filled
    const data=`/${userPortfolioId}`;
    const finalUrl=sellTradeDetailsUrl+data;
    var config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true ,
          "Access-Control-Allow-Headers": '*',
          
        },
        mode:"cors"
      };
    try { 
        const response = await axios.get(finalUrl,config);
        console.log(response)
        tradeDetailModalDispatcher({

            type:LOAD_TRADE_DETAIL_MODAL,

            payload:response.data

        });

        setShowModal(true);
    } catch (error) {
        if (error.status === 401 && error.code === "INVALID_ACCESS_TOKEN") {
            logger.warn("Access token expired" + error.message);
            if (refreshAccessToken()) {
                getSellTradeDetails(userPortfolioId);
            }
        } else {
            logger.error("Error in fetching trade details - " + error.message);
            toast.error("Unable to fetch trade details, try after some time!");
        }
    }
}
