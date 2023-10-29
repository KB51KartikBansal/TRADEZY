import {
  ADD_TICKER_TO_WATCHLIST,
  GET_ClOSE_TARDE_LIST,
  LOAD_DASHBOARD_DATA,
  GET_LOSING_TRADE_LIST,
  GET_OPEN_TARDE_LIST,
  REMOVE_TICKER_FROM_WATCHLIST,
  GET_WINNING_TRADE_LIST,
  LOAD_USER_WATCHLIST,
} from "../../config/typeConstants";

const dashboardReducer = (dashboardState, action) => {
  switch (action.type) {
    
      case LOAD_USER_WATCHLIST:
        return {
          ...dashboardState,
          watchlist:action.payload

        }
    case LOAD_DASHBOARD_DATA:
      return {
        ...dashboardState,
        openTrades:action.payload.openTrades,
        closedTrades:action.payload.closedTrades,
        winningTrades:action.payload.winningTrades,
        losingTrades:action.payload.losingTrades,
        alertsConvertedToTrades:action.payload.alertsConvertedToTrades,
        gain:action.payload.gain,
        tradeAlertsGenerated:action.payload.tradeAlertsGenerated,
        equity:action.payload.equity,
      };
   


    case REMOVE_TICKER_FROM_WATCHLIST:
      return {
        ...dashboardState,
        watchlist: dashboardState.watchlist.filter(
          (ticker) => ticker.tickerNumber !== action.payload
        ),
      };
    case ADD_TICKER_TO_WATCHLIST:
      return {
        ...dashboardState,
        watchlist: [...dashboardState.watchlist, action.payload],
      };
    case GET_OPEN_TARDE_LIST:
      return {
        ...dashboardState,
        openTradeList: action.payload,
      };
    case GET_ClOSE_TARDE_LIST:
      return {
        ...dashboardState,
        closeTradeList: [...dashboardState.closeTradeList,action.payload],
      };
    case GET_WINNING_TRADE_LIST:
      return {
        ...dashboardState,
        winningTradeList: [...dashboardState.winningTradeList,action.payload]
      };
    case GET_LOSING_TRADE_LIST:
      return {
        ...dashboardState,
        losingTradeList: [...dashboardState.losingTradeList,action.payload],
      };
    default:
      return dashboardState;
  }
};
export default dashboardReducer;
