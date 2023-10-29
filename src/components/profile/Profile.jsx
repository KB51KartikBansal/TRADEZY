import React, { useState, useContext } from "react";
import { Card, Nav } from "react-bootstrap";
import "./Profile.css";
import Overview from "./overview/Overview";
import Update from "./update/Update";
import authContext from "../../context/auth/authContext";
import TradingDetails from "./userTradingDetails/TradingDetails";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { authState } = useContext(authContext);
  const userName  = authState?.user;

  const handleOverView = () => {
    setActiveTab("overview");
  };

  const handleUpdate = () => {
    setActiveTab("update");
  };

  const handleTradingDetails = () => {
    setActiveTab("tradingDetails");
  };

  return (
    <div className="main">
      <div className="row">
        <div className="col-xl-4">
          <div className="d-flex align-items-center justify-content-center">
            <Card
              data-testid="card1"
              className="detail-card profile-card d-flex align-items-center justify-content-center mt-3"
            >
              <Card.Img variant="top" src="icon.png" className="icon" />
              <Card.Body>
                <Card.Title> {userName}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="col-xl-8">
          <Card data-testid="card2" className="detail-card">
            <Nav className="nav">
              <Nav.Item className="nav-link">
                <button
                  name="overview"
                  data-testid="over-view"
                  className={
                    "btn-css " + (activeTab === "overview" ? "active1" : "")
                  }
                  onClick={handleOverView}
                >
                  Overview
                </button>
              </Nav.Item>
              <Nav.Item className="nav-link">
                <button
                  name="update"
                  data-testid="over-update"
                  className={
                    "btn-css " + (activeTab === "update" ? "active1" : "")
                  }
                  onClick={handleUpdate}
                >
                  Update Profile
                </button>
              </Nav.Item>
              <Nav.Item className="nav-link">
                <button
                  name="tradingDetails"
                  data-testid="trading-details"
                  className={
                    "btn-css " + (activeTab === "tradingDetails" ? "active1" : "")
                  }
                  onClick={handleTradingDetails}
                >
                  Trading Details
                </button>
              </Nav.Item>
            </Nav>
            <Card.Body>
              {activeTab === "update" ? <Update /> : activeTab === "tradingDetails" ? <TradingDetails/> : <Overview/>}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
