import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Error from "./components/pages/Error";
import { Login } from "./components/login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SignUp from "./components/signup/SignUp";

import Navbar from "./components/navbar/Navbar";
import About from "./components/pages/About";

import EmailInput from "./components/resetpassword/EmailInput";
import PasswordInput from "./components/resetpassword/PasswordInput";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./components/profile/Profile";

import TradeAlerts from "./components/tradeAlerts/TradeAlerts";
import TradeAlertPage from "./components/tradeAlerts/TradeAlertPage";
import OpenTrades from "./components/dashboard/dashboardStatistics/openTrades/OpenTrades";
import ClosedTrades from "./components/dashboard/dashboardStatistics/closedTrades/ClosedTrades";
import WinningTrades from "./components/dashboard/dashboardStatistics/winningTrades/WinningTrades";
import LosingTrade from "./components/dashboard/dashboardStatistics/losingTrades/LosingTrade";
import TradeDetails from "./components/tradeDetails/TradeDetails";
import authContext from "./context/auth/authContext";
import { Spinner } from "react-bootstrap";
function App() {

  const{authState}  =  useContext(authContext);
if(authState?.loading)
   return <Spinner/>
  return (
    <div className="App">
      <ToastContainer />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signUp" element={<SignUp />} />

          <Route path="/forgot-password" element={<EmailInput />} />

          <Route path="/reset-password/:code" element={<PasswordInput />} />
          <Route path="/about" element={<About />} />

          <Route path="/" element={<PrivateRoute component={Home} />} />
          <Route
            path="/profile"
            element={<PrivateRoute component={Profile} />}
          />

          <Route
            path="/open-trade"
            element={<PrivateRoute component={OpenTrades} />}
          />
          <Route
            path="/close-trade"
            element={<PrivateRoute component={ClosedTrades} />}
          />
          <Route
            path="/winning-trade"
            element={<PrivateRoute component={WinningTrades} />}
          />
          <Route
            path="/losing-trade"
            element={<PrivateRoute component={LosingTrade} />}
          />
          <Route
            path="/alerts"
            element={<PrivateRoute component={TradeAlerts} />}
          />
         
          <Route
            path="/alert-details"
            element={<PrivateRoute component={TradeAlertPage} />}
          />
         

          <Route
            path="/trade-details"
            element={<TradeDetails />}
          />
          <Route path="/login" element={<Login />} />

          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
