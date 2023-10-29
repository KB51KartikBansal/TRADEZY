import { useEffect } from "react";
import { useContext, useMemo, useState } from "react";
import dashboardContext from "../../../../context/dashboard/dashboardContext";
import { getOpenTradeList } from "../../../../context/dashboard/DashboardState";
import Pagination from "../../../pagination/Pagination";
import authContext from "../../../../context/auth/authContext";
import { Link } from "react-router-dom";
import OpenTradeItem from "./OpenTradeItem";
// import OpenTradeModal from "./OpenTradeModal";

const OpenTrade = ({ userId }) => {
  const { dashboardState, dashboardDispatcher } = useContext(dashboardContext);
  const { authState } = useContext(authContext);
  const { openTradeList } = dashboardState;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  useEffect(() => {
    getOpenTradeList(authState?.user?.userId, dashboardDispatcher);
    //eslint-disable-next-line
  }, []);
  useMemo(async () => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return openTradeList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, openTradeList]);

  const noOpenTrade = (
    <div
      className="d-flex justify-content-center align-items-center not-found-card"
      style={{ background: "#f1f2f7" }}
    >
      <div className="card p-3 text-center">
        <div className="card-body">
          <h5 className="card-title">No Open Trades Found!</h5>
          <p className="card-text text-info">
            You have no open trades, start trading with Tradezy!
          </p>
          <Link to="/" className="btn btn-warning" role="button">
            Go To Home
          </Link>{" "}
        </div>
      </div>
    </div>
  );

  if (openTradeList?.length === 0) {
    return noOpenTrade;
  }

  // return (
  //   <div className="d-flex justify-content-center" style={{height:"91vh"}}>
  //     <div className="col-md-12 pt-5 table-responsive rounded">

  //       <h3 className="bg-white   text-center p-2"> Open Trades List </h3>

  //       <table className="table  col bg-white rounded table-hover table-sm">
  //         <thead data-testid="table-light" className="table-dark">
  //           <tr>
  //             <th scope="col">Ticker</th>
  //             <th scope="col">Bought Price</th>
  //             <th scope="col">Current Price</th>
  //             <th scope="col">Quantity</th>
  //             <th scope="col">Profit/Loss</th>
  //             <th scope="col"></th>
  //           </tr>
  //         </thead>
  //         <tbody data-testid="OpenTradeTableRow">
  //           {openTradeList.map((openTrade) => (
  //             <OpenTradeItem key={openTrade.tickerId} trade={openTrade} />
  //           ))}
  //         </tbody>
  //       </table>
  //       <Pagination
  //         data-testid="pagination"
  //         className="pagination-bar"
  //         currentPage={currentPage}
  //         siblingCount={1}
  //         totalCount={openTradeList.length}
  //         pageSize={pageSize}
  //         onPageChange={(page) => {
  //           setCurrentPage(page);
  //         }}
  //       />
  //     </div>
  //     {/* <OpenTradeModal    /> */}
  //   </div>
  // );
  return (
    <div
      className="table-responsive shadow-sm p-5 rounded"
      style={{ height: "90.5vh" }}
    >
      <h3
        className="text-center p-2 bg-white w-100"
      >
        Open Trade list{" "}
      </h3>
      <table className="table table-sm table-hover  caption-top border bg-white">
        <thead className="table-dark">
          <tr>
            <th scope="col">Ticker</th>
            <th scope="col">Bought Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Profit/Loss</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {openTradeList.map((openTrade) => (
            <OpenTradeItem key={openTrade.tickerId} trade={openTrade} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenTrade;
