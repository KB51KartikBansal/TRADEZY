import axios from "axios";
import { useContext, useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsCheck, BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";
import { ADD_TICKER_TO_WATCHLIST, INVALID_ACCESS_TOKEN } from "../../config/typeConstants";
import { addToWatchlistUrl } from "../../config/urlConstants";
import authContext from "../../context/auth/authContext";
import dashboardContext from "../../context/dashboard/dashboardContext";
import { logger } from "../../utils/logger";
import { refreshAccessToken } from "../../utils/refreshAccessToken";

const TickerResult = ({
  tickerDetalis,
  isPresentInWatchlist,
  sizeOfWatchList,
}) => {
  const { dashboardDispatcher } = useContext(dashboardContext);
  const { authState } = useContext(authContext);
  const [isInWatchlist, setIsInWatchlist] = useState(isPresentInWatchlist);

  //api call 2
  const addToWatchlist = async () => {
    const jsonData = {
      userId: authState?.user?.userId,
      tickerNumber: tickerDetalis?.tickerNumber,
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        "Access-Control-Allow-Headers": "*",
      },
      mode: "cors",
    };
    try {
      await axios.post(addToWatchlistUrl, jsonData, config);
      logger.info("Ticker added to watchlist successfully");
      setIsInWatchlist(true);
      dashboardDispatcher({
        type: ADD_TICKER_TO_WATCHLIST,
        payload: tickerDetalis,
      });
      toast.success("Ticker added to watchlist");
    } catch (error) {
        const {errors} = error?.response?.data;
        const status = error?.response?.status;
        if (status === 403 && errors[0].code === INVALID_ACCESS_TOKEN) {
          logger.warn("Access token expired" + errors[0].message);
          if (refreshAccessToken()) {
            addToWatchlist();
          }
        } else {
          logger.error("some error occured");
          toast.error("oops, some error occured, try again after sometime");
        }
        setIsInWatchlist(false);
    }
  };

  const handleButtonClick = () => {
    //1.call api for adding stock to watchlist
    if (sizeOfWatchList < 100) {
      addToWatchlist();
    } else {
      toast.error("watchlist limit exceeded ");
    }
  };

  return (
    <>
      <div className="stockDetailsContainer">
        <div className="stockDetails" data-testid="tooltip">
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip id="button-tooltip">{tickerDetalis.tickerName}</Tooltip>
            }
          >
            <div className="stockName" data-testid="tickerName">
              {tickerDetalis.tickerName.length < 30
                ? tickerDetalis.tickerName
                : `${tickerDetalis.tickerName.substring(0, 30)}...`}
            </div>
          </OverlayTrigger>
          <div className="tickerName">{tickerDetalis.tickerId}</div>
        </div>
        {isInWatchlist === false ? (
          <button
            data-testid="addToWatchlistButton"
            className="plusButton"
            onClick={handleButtonClick}
            tabIndex={-1}
          >
            <BsPlus />
          </button>
        ) : (
          <button data-testid="checkButton" className="checkIcon" tabIndex={-1}>
            <BsCheck />
          </button>
        )}
      </div>
    </>
  );
};

export default TickerResult;
