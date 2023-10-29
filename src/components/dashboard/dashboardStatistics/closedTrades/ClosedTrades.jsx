import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import authContext from "../../../../context/auth/authContext";
import dashboardContext from "../../../../context/dashboard/dashboardContext";
import { getCloseTradeList } from "../../../../context/dashboard/DashboardState";
import Pagination from "../../../pagination/Pagination";
import CloseTradeItem from "./ClosedTradeItem";
import "../TradeTable.css";

const CloseTrades = () => {
  const { dashboardState, dashboardDispatcher } = useContext(dashboardContext);
  const { authState } = useContext(authContext);
  const { closeTradeList } = dashboardState;
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 7;

  useMemo(async () => {
    await getCloseTradeList(
      authState?.user?.userId,
      currentPage - 1,
      PageSize,
      dashboardDispatcher
    );
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return closeTradeList.slice(firstPageIndex, lastPageIndex);

    //eslint-disable-next-line
  }, [currentPage, closeTradeList]);

  const noCloseTrade = (
    <div
      className="d-flex justify-content-center align-items-center not-found-card"
      style={{ background: "#f1f2f7" }}
    >
      <div className="card p-3 text-center">
        <div className="card-body">
          <h5 className="card-title">No close Trades Found!</h5>
          <p className="card-text text-info">
            You have no close trades, start trading with Tradezy!
          </p>
          <Link to="/" className="btn btn-warning" role="button">
            Go To Home
          </Link>{" "}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {typeof closeTradeList === "undefined" || closeTradeList.length === 0 ? (
        noCloseTrade
      ) : (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center p-2">
            <h4 className="heading text-center"> Closed Trades List </h4>

            <div className="shadow-sm p-3 mb-5 bg-white rounded trade-table">
              <table className="table table-hover text-center">
                <thead data-testid="closeTradeTableHead">
                  <tr>
                    <th>Ticker</th>
                    <th>Opening Time</th>
                    <th>Bought Price</th>
                    <th>Closed</th>
                    <th>Sold Price</th>
                    <th>Quantity</th>
                    <th>Gain</th>
                  </tr>
                </thead>
                <tbody data-testid="closeTradeTableRow">
                  {closeTradeList?.map((closeTrade) => (
                    <CloseTradeItem
                      key={closeTrade.tickerId}
                      trade={closeTrade}
                    />
                  ))}
                </tbody>
              </table>
              <Pagination
                data-testid="pagination"
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={closeTradeList.length}
                pageSize={PageSize}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CloseTrades;
