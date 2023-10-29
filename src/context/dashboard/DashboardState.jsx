import axios from "axios";
import { useReducer } from "react";
import DashboardContext from "./dashboardContext";
import dashboardReducer from "./dashboardReducer";
import { toast } from "react-toastify";
import {
  GET_ClOSE_TARDE_LIST,
  GET_LOSING_TRADE_LIST,
  GET_OPEN_TARDE_LIST,
  GET_WINNING_TRADE_LIST,
  INVALID_ACCESS_TOKEN,
  LOAD_DASHBOARD_DATA,
  LOAD_USER_WATCHLIST,
} from "../../config/typeConstants";
import { logger } from "../../utils/logger";
import {
  dashboardBaseURL,
  getWinningLosingOpenTradesURL,
  getClosedTradesURL,
  getWatchlistUrl,
} from "../../config/urlConstants";
import { refreshAccessToken } from "../../utils/refreshAccessToken";

export const loadDashboardData = async (userId, dashboardDispatcher) => {
  try {
    const res = await axios.get(dashboardBaseURL + `/${userId}`);

    dashboardDispatcher({
      type: LOAD_DASHBOARD_DATA,
      payload: res.data,
    });

    logger.info("Dashboard data fetched successfully");
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        loadDashboardData(userId, dashboardDispatcher);
      }
    } else if (status === 400 && errors?.length > 0) {
      for(let i=0;i<errors.length;i++) {
        logger.error("Error in feching dashboard data" + errors[i].message);
        toast.error(errors[i].message);
      }
    } else {
      logger.error(
        "Unknown error occurred in loadDashboardData()" + errors.toString()
      );
      toast.error("Oops!! Try after some time");
    }
  }
};

export const getUserWatchlist = async (userId, dashboardDispatcher) => {
  try {
    const res = await axios.get(getWatchlistUrl + `/${userId}`);

    dashboardDispatcher({
      type: LOAD_USER_WATCHLIST,
      payload: res.data.map((data) => data.ticker),
    });

    logger.info("Dashboard data fetched successfully");
    //  logger.info("fached data "+res.data)
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        getUserWatchlist(userId, dashboardDispatcher);
      }
    } else if ( errors?.length > 0) {
      for(let i=0;i<errors.length;i++) {
        logger.error("Error in feching dashboard data" + errors[i].message);
        toast.error(errors[i].message);
      }
    } else {
      logger.error(
        "Unknown error occurred in getUserWatchlist()" + errors.toString()
      );
      toast.error("Oops!! Try after some time");
    }
  }
};

export const getOpenTradeList = async (userId, dashboardDispatcher) => {
  try {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };
    const res = await axios.get(
      `${getWinningLosingOpenTradesURL}?userId=${userId}&type=open`,
      config
    );

    dashboardDispatcher({
      type: GET_OPEN_TARDE_LIST,
      payload: res?.data?.openTrades,
    });
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        getOpenTradeList(userId, dashboardDispatcher);
      }
    } else if (errors?.length > 0 ) {
      for (let i = 0; i < errors?.length; i++) {
        logger.warn(errors[i].code);
        logger.warn(`${errors[i].message} for user ${userId}`);
        toast.warn(errors[i].message);
      }
    } else {
      logger.error(
        "Unknow error Occoured in getOpenTradeList()" + errors.toString()
      );
      toast.error("Oops!! try after some time");
    }
  }
};
export const getCloseTradeList = async (
  userId,
  page,
  size,
  dashboardDispatcher
) => {
  try {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };

    const res = await axios.get(
      `${getClosedTradesURL}?userId=${userId}&page=${page}&limit=${size}`,
      config
    );
    dashboardDispatcher({
      type: GET_ClOSE_TARDE_LIST,
      payload: res?.data?.closedTrades,
    });
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        getCloseTradeList(userId, page, size, dashboardDispatcher);
      }
    } else if (errors?.length > 0 ) {
      for(let i=0;i<errors.length;i++){
        logger.error(
          `${errors[i].message} for user ${userId} in getCloseTradeList Function`
        );
        toast.error(errors[i].message);
      }
    } else {
      logger.error(
        "Unknow error Occoured in getCloseTradeList()" +
          errors.toString()
      );
      toast.error("Oops!! try after some time");
    }
  }
};

export const getWinningTradeList = async (userId, dashboardDispatcher) => {
  try {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };
    const res = await axios.get(
      `${getWinningLosingOpenTradesURL}?userId=${userId}&type=winning`,
      config
    );
    dashboardDispatcher({
      type: GET_WINNING_TRADE_LIST,
      payload: res?.data?.winningTrades,
    });
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        getWinningTradeList(userId, dashboardDispatcher);
      }
    } else if (status === 400 && errors?.length > 0) {
      for(let i=0;i<errors.length;i++){
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
  }
};

export const getLosingTradeList = async (userId, dashboardDispatcher) => {
  try {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };
    const res = await axios.get(
      `${getWinningLosingOpenTradesURL}?userId=${userId}&type=losing`,
      config
    );
    dashboardDispatcher({
      type: GET_LOSING_TRADE_LIST,
      payload: res?.data?.losingTrades,
    });
    logger.info(`losing trade fetched successfully for user ${userId}`);
  } catch (error) {
    const { errors } = error?.response?.data;
    const status = error?.response?.status;
    if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
      logger.warn("Access token expired" + errors[0]?.message);
      if (refreshAccessToken()) {
        getLosingTradeList(userId, dashboardDispatcher);
      }
    } else if ( errors?.length > 0) {
      for(let i=0;i<errors.length;i++) {
        logger.error(`${errors[i].message} for user ${userId}`);
        toast.error(errors[i].message);
    }
    } else {
      logger.error(
        "Unknow error Occoured in getLosingTradeList()" +
          errors.toString()
      );
      toast.error("Oops!! try after some time");
    }
  }
};

const DashboardState = (props) => {
  const initialState = {
    openTrades: 0,
    closedTrades: 0,
    winningTrades: 1,
    losingTrades: 0,
    alertsConvertedToTrades: 0,
    gain: 14050.0,
    tradeAlertsGenerated: 1,
    equity: 85000.0,
    watchlist: [],
    openTradeList: [],
    closeTradeList: [],
    winningTradeList: [],
    losingTradeList: [],
  };

  const [dashboardState, dashboardDispatcher] = useReducer(
    dashboardReducer,
    initialState
  );

  return (
    <DashboardContext.Provider
      value={{
        dashboardState,
        dashboardDispatcher,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
