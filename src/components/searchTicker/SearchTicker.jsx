import { useState, useEffect, useContext } from "react";
import SearchResults from "./SearchResults";
import Watchlist from "../watchlist/Watchlist";
import "./SearchTicker.css";
import { getUserWatchlist } from "../../context/dashboard/DashboardState";
import dashboardContext from "../../context/dashboard/dashboardContext";


const SearchTicker = ({userId}) => {
  const { dashboardDispatcher } = useContext(dashboardContext);


  const [query, setQuery] = useState("");
  const [openPopper, setOpenPopper] = useState(false);

  useEffect(() => {
    getUserWatchlist(userId, dashboardDispatcher);
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (query === "") {
      setOpenPopper(false);
    }
  }, [query]);

  return (
    <>
      {
        <input
          className="input"
          type="search"
          name="searchBar"
          id="searchBar"
          placeholder={"Search for a stock"}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpenPopper(true);
          }}
          value={query}
        />
      }
      {openPopper ? <SearchResults query={query} /> : <Watchlist userId={userId} />}
    </>
  );
};
export default SearchTicker;
