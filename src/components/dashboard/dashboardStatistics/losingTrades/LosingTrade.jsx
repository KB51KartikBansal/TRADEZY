import React, { useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import authContext from "../../../../context/auth/authContext";
import dashboardContext from "../../../../context/dashboard/dashboardContext";
import { getLosingTradeList } from "../../../../context/dashboard/DashboardState";
import Pagination from "../../../pagination/Pagination";
import "../TradeTable.css";
import LosingTradeItem from "./LosingTradeItem";

const LosingTrades = () => {
  const { dashboardState, dashboardDispatcher } = useContext(dashboardContext);
  const { authState } = useContext(authContext);
  const { losingTradeList } = dashboardState;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;
  useEffect(() => {
    getLosingTradeList(authState?.user?.userId, dashboardDispatcher);
    //eslint-disable-next-line
  }, []);

  const LosingTradeData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return losingTradeList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, losingTradeList]);

  if (losingTradeList?.length === 0 || typeof losingTradeList === "undefined")
    return (
      <div
        className="d-flex justify-content-center align-items-center not-found-card"
        style={{ background: "#f1f2f7" }}
      >
        <div className="card p-3 text-center">
          <div className="card-body">
            <h5 className="card-title">No Losing Trades Found!</h5>
            <p className="card-text text-info">
              You have no losing trades, start trading with Tradezy!
            </p>
            <Link to="/" className="btn btn-warning " role="button">
              Go To Home
            </Link>{" "}
          </div>
        </div>
      </div>
    );

  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-2">
      <div className="shadow-sm p-3 mb-5 bg-white rounded trade-table">
        <h4 className="heading text-center"> Losing Trades List </h4>

        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Opening Time</th>
              <th>Bought Price</th>
              <th>Current Price</th>
              <th>Quantity</th>
              <th>Current Loss</th>
            </tr>
          </thead>
          <tbody>
            {LosingTradeData?.map((LosingTrade) => {
              return (
                <LosingTradeItem
                  key={LosingTrade.tickerId}
                  trade={LosingTrade}
                />
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          siblingCount={1}
          totalCount={losingTradeList.length}
          pageSize={pageSize}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default LosingTrades;
