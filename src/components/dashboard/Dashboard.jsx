import React, { useEffect, useContext } from "react";
import dashboardContext from "../../context/dashboard/dashboardContext";
import { loadDashboardData } from "../../context/dashboard/DashboardState";
import DashboardFrame from "./DashboardFrame";
import SearchTicker from "../searchTicker/SearchTicker";
import authContext from "../../context/auth/authContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { dashboardState, dashboardDispatcher } = useContext(dashboardContext);
  const { authState } = useContext(authContext);
  const userId = authState?.user?.userId;

  useEffect(() => {
    loadDashboardData(userId, dashboardDispatcher);
    //eslint-disable-next-line
  }, []);


  const {
    openTrades,
    closedTrades,
    winningTrades,
    losingTrades,
    alertsConvertedToTrades,
    gain,
    tradeAlertsGenerated,
    equity,
  } = dashboardState;

  return (
      <div className="d-flex w-100 container"
      style={{height:"90.5vh"}}>
        <div className="row">
          <div className="col-lg-4 p-2 col-md-4 col-sm-12 col-12 border ">
            <SearchTicker  userId={userId}/>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-12 d-flex p-2 flex-wrap justify-content-around">
          <DashboardFrame
              color="rgb(185,122,87)"
              title="Open Trades"
              no={openTrades}
              hoverStatus="clickable"
            />
            <DashboardFrame
              color="rgb(0,162,232)"
              title="Closed Trades"
              no={closedTrades}
              hoverStatus="clickable"
            />
             <DashboardFrame
              color="rgb(200,191,231)"
              title="Winning Trades"
              no={winningTrades}
              hoverStatus="clickable"
            />
            <DashboardFrame
              color="rgb(237,28,36)"
              title="Losing Trade"
              no={losingTrades}
              hoverStatus="clickable"
            />
            
            <DashboardFrame
              color="rgb(225,201,14)"
              title="Number of Alerts"
              no={tradeAlertsGenerated}
              hoverStatus="nonClickable"
            />
            <DashboardFrame
              color="rgb(225,127,39)"
              title="Converted to Trade"
              no={alertsConvertedToTrades}
              hoverStatus="nonClickable"
            />
           

            <DashboardFrame
              color="rgb(34,177,76)"
              title="Equity "
              no={equity}
              hoverStatus="nonClickable"
            />
           
            <DashboardFrame
              color="rgb(181,230,29)"
              title="Profit Loss"
              no={gain}
              hoverStatus="nonClickable"
            />
          </div>
        </div>
      </div>
    
  );
};

export default Dashboard;
