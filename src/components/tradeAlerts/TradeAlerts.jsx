
import { Link, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect, useContext } from "react";
import tradeAlertsData from "../../services/tradeAlertsData";
import SimpleDateTime from "react-simple-timestamp-to-date/src/utilities/SimpleDateTime";
import { FcClock } from "react-icons/fc";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import authContext from "../../context/auth/authContext";

export default function TradeAlerts() {
     const{authState}  = useContext(authContext);
   
  const [alertList, setAlertList] = useState([]);
  const [alertFeed, setAlertFeed] = useState([]);
  const [noAlerts, setNoAlerts] = useState(false);
  useEffect(() => {
    tradeAlertsData(authState?.user?.userId).then((value) => {
      if (value.length === 0) {
        setNoAlerts(true);
      }
      setAlertList(value);
      setAlertFeed(value.slice(0, pageSize));

    });
  
    //eslint-disable-next-line
  }, []);

  const navigate = useNavigate();
  const pageSize = 6;
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = () => {
    if (alertFeed.length < alertList.length) {
      setTimeout(() => {
        setAlertFeed(
          alertFeed.concat(
            alertList.slice(
              currentPage * pageSize,
              currentPage * pageSize + pageSize
            )
          )
        );
      }, 500);
      setCurrentPage(currentPage + 1);
    } else setHasMore(false);
  };

  return noAlerts ? (<div>

    <div class="jumbotron ms-5">
      <h1 class="display-4">No Alerts Found!</h1>
      <p class="lead">You have no alerts, start trading with Tradezy!</p>
      <image src="notFound.png" height={140} width={140}></image>
      <p></p>
      <Link to="/" class="btn btn-primary btn-lg" role="button"
      >Go To Home</Link>
    </div>

  </div>) :
    (
      <>
        <div classNameNameName="container w-75 list-group my-2 p-0 text-center d-flex flex-row justify-content-center align-items-center">
          <img
            src="notification.gif"
            alt="alert icon"
            width={40}
            height={40}
            className="m-2"
            style={{ display: "inline-block", }}
          />
          <h3 class="m-0">
            Trade Alerts
          </h3>
        </div>
        
        <div classNameName="list-group">
          <InfiniteScroll
            dataLength={alertFeed.length}
            next={fetchData}
            hasMore={hasMore}
            loader={
              <p style={{ textAlign: "center" }}>
                <div classNameName="spinner-grow text-primary" role="status"></div>
              </p>
            }

            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen it all!</b>
              </p>
            }
          >
            {alertFeed.map((p, i) => {
              return (
                <div
                  onClick={() => {
                    navigate("/alert-details", {
                      state: {
                        tickerName: p.tickerName,
                        timeframe: p.timeframe,
                        tradeDirection: p.tradeDirection,
                        timestamp: p.timestamp,
                        tradeAlertId: p.tradeAlertId
                      },
                    });
                  }}
                  class="container  w-75 list-group-item list-group-item-action"
                >
                  <div class="d-xs-flex flex-xs-column justify-content-xs-center align-items-xs-start d-sm-flex flex-sm-column justify-content-sm-center align-items-sm-start d-lg-flex flex-lg-row  my-2 justify-content-between">
                    {
                      p.tickerName.length > 20
                        ? (<OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={<Tooltip id="button-tooltip">{p.tickerName}</Tooltip>}
                        >
                          <h6 class="mb-1" style={{ cursor: "pointer", width: '16rem', textTransform: 'capitalize', textAlign: 'start' }}>
                            {`${p.tickerName.substring(0, 20)}...`}
                          </h6>
                        </OverlayTrigger>)
                        : <h6 class="mb-1" style={{ cursor: "pointer", width: '16rem', textTransform: 'capitalize', textAlign: 'start' }}>
                          {p.tickerName}
                        </h6>
                    }
                    <div className="w-100 d-xs-flex flex-xs-column justify-content-xs-center align-items-xs-start d-sm-flex justify-content-sm-between align-items-sm-end align-self-sm-start justify-content-md-end align-items-md-center justify-content-lg-evenly">
                      <div className="d-xs-flex flex-xs-column justify-content-xs-center align-items-xs-start d-sm-flex flex-sm-column justify-content-sm-center align-items-sm-center  flex-md-row justify-content-lg-center">
                        <span class="badge bg-light text-dark my-sm-1 my-lg-0 mx-2 pt-2 fw-bold">Trade Direction : {" "}
                          <span
                          style={p.tradeDirection === "buy" ? { color: "green", fontWeight: 700 } : { color: "red", fontWeight: 700 }}>
                            {p.tradeDirection.toUpperCase()}{" "}
                            {/* {p.tradeDirection === "buy" ? "🔺" : "🔻"} */}
                          </span>
                        </span>
                        <span class="badge  bg-warning text-dark my-sm-1 my-lg-0 mx-2 pt-2 "> Time Frame : {p.timeframe/1440} day</span>
                        <span class="badge  bg-success my-sm-1 my-lg-0 mx-2 pt-2">Confidence Score : {p.confidence}%</span>
                      </div>
                      <div style={{ fontSize: '12px' }}>
                        <span className="mx-2"><FcClock /></span>
                        <SimpleDateTime dateSeparator="/" timeSeparator=":" format="DMY" meridians="1">{p.timestamp}</SimpleDateTime>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </>
    );
}
