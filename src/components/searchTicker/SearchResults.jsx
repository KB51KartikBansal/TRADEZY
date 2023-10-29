import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import dashboardContext from "../../context/dashboard/dashboardContext";
import { ClipLoader } from "react-spinners";
import TickerResult from "./TickerResult";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="spinnerContainer">
          <ClipLoader color="#3454cf" size={20} />
          <span className="loadingText">Searching...</span>
        </div>
      )}
    </>
  );
};

const SearchResults = ({ query }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { dashboardState } = useContext(dashboardContext);
  const { watchlist } = dashboardState;

  const checkForWatchlist = (tickerNumber) => {
    for (const element of watchlist) {
      if (element.tickerNumber === tickerNumber) return true;
    }
    return false;
  };
  //API call - 1
  const searchStocks = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true ,
        "Access-Control-Allow-Headers": '*',
        
      },
      mode:"cors"
    };
    try {
      const res = await axios.get(
        `${searchTickerURL}/${query.toString()}`,
        config
      );
      setSearchResults(res.data);
    } catch (error) {
      setSearchResults(null);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    //debounce
    let timeOut = setTimeout(() => {
      // call api to get search result based on query.
      searchStocks();
    }, 600);
    return () => clearTimeout(timeOut);
    //eslint-disable-next-line
  }, [query]);

  let noMatchFoundString = "";
  if (query.length > 20) {
    noMatchFoundString =
      "No match found for '" + query.substring(0, 20) + "...'";
  } else {
    noMatchFoundString = "No match found for '" + query + "'";
  }

  return (
    <>
      {searchResults != null ? (
        <div className="parent">
          <Loading isLoading={isLoading} />
          {!isLoading &&
            searchResults.map((val) => {
              return (
                <React.Fragment key={val.tickerNumber}>
                  <TickerResult
                    tickerDetalis={val}
                    isPresentInWatchlist={checkForWatchlist(val.tickerNumber)}
                    sizeOfWatchList={watchlist.length}
                  />
                </React.Fragment>
              );
            })}
        </div>
      ) : (
        <div className="noMatchFoundError" data-testid="noMatchFound">
          <Loading isLoading={isLoading} />
          {!isLoading && noMatchFoundString}
        </div>
      )}
    </>
  );
};

export default SearchResults;
