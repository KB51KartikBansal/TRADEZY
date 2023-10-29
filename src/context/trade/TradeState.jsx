import React from "react";
import { useState, useReducer } from "react";
import {tradeContext} from "./tradeContext"
import axios from "axios";
import { tradeMicroServiceUrl, tradeDetailsDashboardURL } from "../../config/urlConstants";
import { LOAD_TRADE_DETAIL_DASHBOARD } from './../../config/typeConstants';
import tradeDetailReducer from './tradeReducer';
import { tradeModalReducer } from "./tradeModalReducer";
import { logger } from "../../utils/logger";
export const loadTradeDetails=async (userId,pageNumber, tradeDetailDispatcher)=>{
    let params={
        userId:userId,
        page:pageNumber
    };
    let temp= await axios.get(tradeMicroServiceUrl+tradeDetailsDashboardURL,{params});
    tradeDetailDispatcher({
        type:LOAD_TRADE_DETAIL_DASHBOARD,
        payload:temp.data
    });
    logger.info('loaded the data for user id: '+userId+" and page number: "+pageNumber);
}

const TradeState=(props)=>{
    //temporary initial state should be removed after mergingn with harish
    const[showModal,setShowModal]=useState(false);
    const [tradeDetail,tradeDetailDispatcher]=useReducer(tradeDetailReducer);
    const [tradeDetailModal,tradeDetailModalDispatcher]=useReducer(tradeModalReducer);
    const [currentPage, setCurrentPage] = useState(1);

    return(
        <tradeContext.Provider
            value={{showModal,setShowModal,tradeDetail,tradeDetailDispatcher,tradeDetailModal,tradeDetailModalDispatcher,currentPage, setCurrentPage
            }}
        >
            {props.children}
        </tradeContext.Provider>
    );
};

export default TradeState;