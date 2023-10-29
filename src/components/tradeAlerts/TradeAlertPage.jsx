import React,{useContext} from "react";
import { useLocation } from "react-router-dom";
import SimpleDateTime from "react-simple-timestamp-to-date/src/utilities/SimpleDateTime";
import { logger } from "../../utils/logger";
import { handleDeleteTradeAlert, handleGetTradeDetails } from "../../services/tradeAlertsData";
import authContext from "../../context/auth/authContext";
export default function TradeAlertPage() {
  const location = useLocation();

  const tickerName = location.state.tickerName;
  const timeFrame = location.state.timeframe;
  const tradeDirection = location.state.tradeDirection;
  const timeStamp = location.state.timestamp;
  const tradeAlertId=location.state.tradeAlertId;

  const { authState } = useContext(authContext);
  function deleteTradeAlert() {
    logger.info("Delete trade alert pressed"+authState.userId);
    handleDeleteTradeAlert(authState.userId,tradeAlertId);
  }



  return (
    <>

      <div className="container w-75 list-group my-2 p-1 text-center d-flex flex-row justify-content-center align-items-center">
        <img
          src="details.gif"
          alt="details"
          width={40}
          height={40}
          className="m-2"
          style={{ display: "inline-block", }}
        />
        <h3 class="m-0 text-break">
          Trade Alert Details
        </h3>
      </div>
      
      
      {/* <div>
        <h1 class="ms-3" style={{ display: "inline-block" }}>
          Trade Alerts Details
        </h1>
        <img
          src="details.gif"
          width={40}
          height={40}
          style={{ display: "inline-block", marginBottom: 10 }}
          alt="details"
        />
      </div> */}

      {/* <div class="ms-3"> */}
        <div class="container w-75 d-flex flex-column p-2">
          <div class="card-body fw-bold mb-2 text-center">
            {/* <h5 class="card-title"></h5> */} 
            <p class="card-text fw-bold mb-2 text-center text-wrap text-break">{tickerName}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              Trade direction : {" "}
              <span class="fw-bold" style={tradeDirection==='buy'?{color:'green'}:{color:'red'}}>{tradeDirection.toUpperCase()} </span>{" "}
            </li>
            <li className="list-group-item">Time frame : {timeFrame/1440} day</li>
            <li className="list-group-item">Alert generated at : {<SimpleDateTime dateSeparator="/" timeSeparator=":" format="DMY" meridians="1">{timeStamp}</SimpleDateTime>}</li>
          </ul>
          <div className="d-flex card-body justify-content-center align-items-center flex-wrap m-1">
            <button type="button" className="btn btn-primary m-2" onClick={handleGetTradeDetails(authState.userId,tradeAlertId)}>
              Get Insights
            </button>
            <button type="button" className="btn btn-danger m-2" onClick={deleteTradeAlert}>
              Delete
            </button>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
