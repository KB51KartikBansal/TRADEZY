import React, { useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import authContext from "../../../../context/auth/authContext";
import dashboardContext from "../../../../context/dashboard/dashboardContext";
import { getWinningTradeList } from "../../../../context/dashboard/DashboardState";
import Pagination from "../../../pagination/Pagination";
import WinningTradeItem from "./WinningTradeItem";
import "../TradeTable.css";

const WinningTrades = () => {
  const { dashboardState, dashboardDispatcher } = useContext(dashboardContext);
  const { authState } = useContext(authContext);
  const { winningTradeList } = dashboardState;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  useEffect(() => {
    getWinningTradeList(authState?.user?.userId, dashboardDispatcher);
    //eslint-disable-next-line
  }, []);

  const winningTradeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return winningTradeList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, winningTradeList]);

  if (winningTradeList?.length === 0 || typeof winningTradeList === "undefined")
    return (
      <div
        className="d-flex justify-content-center align-items-center not-found-card"
        style={{ background: "#f1f2f7" }}
      >
        <div className="card p-3 text-center">
          <div className="card-body">
            <h5 className="card-title">No Winning Trades Found!</h5>
            <p className="card-text text-info">
              You have no winning trades, start trading with Tradezy!
            </p>
            <Link to="/" className="btn btn-warning" role="button">
              Go To Home
            </Link>{" "}
          </div>
        </div>
      </div>
    );

  return (
    <div className="d-flex flex-column p-2" style={{height:"91vh"}}>
     
        <div className="text-center p-3 shadow-sm bg-white rounded d-none d-md-block">
        <h3 className="heading text-center" style={{
          webkitBackgroundClip: "text",
          backgroundImage: "linear-gradient(90deg,#f6d365,#fda085)",
          color: "transparent"
        }}> Winning Trades List </h3>
</div>
<div className="shadow-sm p-3 mb-5 bg-white rounded table-responsive">
        <table className="table table-hover text-center">
          <thead className="table-dark">
            <tr>

              <th>Ticker Name</th>
              <th>Bought Price</th>
              <th>Current Price</th>
              <th>Quantity</th>
              <th>Current Gain</th>
            </tr>
          </thead>
          <tbody>
            {winningTradeData?.map((WinningTrade) => {
              return (
                <WinningTradeItem
                  key={WinningTrade.tickerId}
                  trade={WinningTrade}
                />
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          siblingCount={1}
          totalCount={winningTradeList.length}
          pageSize={pageSize}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default WinningTrades;
