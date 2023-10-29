import axios from "axios";
import { refreshTokenURL } from "../config/urlConstants";
import setAuthToken from "./setAuthToken";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken === undefined || refreshToken === null) {
    return false;
  }

  var config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": true ,
      "Access-Control-Allow-Headers": '*',
      
    },
    mode:"cors"
  };
  try {
    axios.defaults.headers.common['Authorization'] =`Bearer ${refreshToken}`;
    const accessToken = await axios.get(refreshTokenURL, config);


    setAuthToken(accessToken, refreshToken);
    return true;
  } catch (err) {
    setAuthToken();
    return false;

  }
};
