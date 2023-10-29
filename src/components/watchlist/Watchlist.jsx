import { useState, useMemo, useContext, React } from "react";
import Pagination from "../pagination/Pagination";
import ListGroup from "react-bootstrap/ListGroup";
import "./Watchlist.css";
import "bootstrap/dist/css/bootstrap.min.css";
import dashboardContext from "../../context/dashboard/dashboardContext";
import { LOAD_TRADE_DETAIL_MODAL, INVALID_ACCESS_TOKEN, REMOVE_TICKER_FROM_WATCHLIST } from "../../config/typeConstants";
import axios from "axios";
import authContext from "../../context/auth/authContext";
import { deleteFromWatchlistUrl } from "../../config/urlConstants";
import { refreshAccessToken } from "../../utils/refreshAccessToken";
import { logger } from "../../utils/logger";
import { toast } from "react-toastify";
import { handleGetWatchlistId } from "../../services/tradeExecutionWithoutAlerts";
import { tradeContext } from "../../context/trade/tradeContext";
import TradeModal from "../tradeDetails/TradeModal";
import { AiFillDelete } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";

let PageSize = 7;

const Watchlist = ({ userId }) => {
  const { dashboardState, dashboardDispatcher } = useContext(dashboardContext);
  const { watchlist } = dashboardState;

  const {showModal, setShowModal, tradeDetailModalDispatcher} = useContext(tradeContext);

  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return watchlist.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, watchlist]);

  const handleClick = async (userid,tickerNumber)=>{
    try {
      const res = await handleGetWatchlistId(userid,tickerNumber)
      tradeDetailModalDispatcher({
        type:LOAD_TRADE_DETAIL_MODAL,
        payload: res
      })
      setShowModal(true);
    }catch (error) {
      
      logger.error("Error in fetching trade details - " + error.message);
  
      }
    
  }

  const handleRemove = (tickerNumber) => {


    try {
      axios.delete(deleteFromWatchlistUrl, {
        userId: userId,
        tickerNumber: tickerNumber,
      });
      dashboardDispatcher({
        type: REMOVE_TICKER_FROM_WATCHLIST,
        payload: tickerNumber,
      });
    } catch (error) {
      console.error(error);
      const { errors } = error?.response?.data;
      const { status } = error?.response;
      if (status === 403 || errors[0]?.code === INVALID_ACCESS_TOKEN) {
        logger.warn("Access token expired" + errors[0]?.message);
        if (refreshAccessToken()) {
          handleRemove(tickerNumber);
        }
      } else if (errors?.length > 0) {
        for (let i = 0; i < errors.length; i++) {
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

  return (
    <>
      <p className="heading p-2 m-l-2">
        Total Ticker in Watchlist : {watchlist.length}
      </p>
      {watchlist.length > 0 ? (
        <>
          <div>
            {currentTableData.map((item) => {
              return (
                <ListGroup data-testid="list-group" key={item.tickerNumber}>
                  <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-center "
                    data-testid="list-item"
                  >
                    <div data-testid="div-tickerid" className="ms-2 me-auto">
                      <div data-testid="div-tickername" className="fw-bold txt">
                        {item.tickerName}
                      </div>
                      {item.tickerId}
                    </div>
                    <button className="sub-btn2 btn-primary rounded-circle" onClick={ () =>handleClick(authContext.user.userId,item.tickerNumber)}>
                      < BsFillCartFill />
                
                    </button>
                    <button
                      className="sub-btn btn-danger rounded-circle"
                      data-testid="handle-remove-btn"
                      onClick={() => handleRemove(item.tickerNumber)}
                    >
                      < AiFillDelete/>
                    </button>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          <TradeModal show={showModal} onHide ={()=>setShowModal(false)} />
          </div>
          <Pagination
            data-testid="pagination-id"
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={watchlist.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <p className="heading p-2 m-l-2">
          Search Ticker and add to your watchlist
        </p>
      )}
    </>
  );
};

export default Watchlist;
