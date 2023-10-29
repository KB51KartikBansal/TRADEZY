import { useContext } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { Modal, Row, Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { BiRefresh } from "react-icons/bi";
import "./TradeModal.css";
import {
  INCREMENT_STOCK_QUANTITY,
  DECREMENT_STOCK_QUANTITY,
  UPDATE_STOP_LOSS,
  UPDATE_PROFIT_TARGET,
  INCREMENT_PROFIT_TARGET,
  DECREMENT_PROFIT_TARGET,
  DECREMENT_STOP_LOSS,
  INCREMENT_STOP_LOSS,
  SET_STOP_LOSS_VALIDITY,
  SET_PROFIT_TARGET_VALIDITY,
} from "./../../config/typeConstants";
import { tradeContext } from "./../../context/trade/tradeContext";
import IncrementDecrementInput from "./IncrementDecrementInput";
import { logger } from "../../utils/logger";
import { executeTrade } from "../../services/executeDeleteTrade";
import authContext from "./../../context/auth/authContext";

const OpenTradeModal = (props) => {
  const { tradeDetailModal, tradeDetailModalDispatcher } =
    useContext(tradeContext);
  const { currentPage, tradeDetailDispatcher } = useContext(tradeContext);
  const { authState } = useContext(authContext);
  let incrementQuantity = () => {
    tradeDetailModalDispatcher({ type: INCREMENT_STOCK_QUANTITY });
  };
  let decrementQuantity = () => {
    tradeDetailModalDispatcher({ type: DECREMENT_STOCK_QUANTITY });
  };
  let executeTradeHandler = () => {
    if (tradeDetailModal.stopLoss === "")
      tradeDetailModalDispatcher({
        type: SET_STOP_LOSS_VALIDITY,
        payload: false,
      });
    if (tradeDetailModal.profitTarget === "")
      tradeDetailModalDispatcher({
        type: SET_PROFIT_TARGET_VALIDITY,
        payload: false,
      });
    executeTrade(
      tradeDetailModal.item.tradeDetailId,
      tradeDetailModal.stopLoss,
      tradeDetailModal.profitTarget,
      tradeDetailModal.quantity,
      authState.user.userId,
      currentPage,
      tradeDetailDispatcher
    );
  };
  let setValidity = () => {
    tradeDetailModalDispatcher({ type: SET_STOP_LOSS_VALIDITY, payload: true });
    tradeDetailModalDispatcher({
      type: SET_PROFIT_TARGET_VALIDITY,
      payload: true,
    });
  };
  logger.info({ message: "render in trade modal" });
  if (typeof tradeDetailModal !== "undefined") {
    let row3;
    let tradeDirectionVariant;
    let refreshDisabled = false;
    let executeDisabled = false;
    if (tradeDetailModal.item.tradeDirection.toLowerCase() === "buy") {
      tradeDirectionVariant = "warning";
      row3 = (
        <Row className="row3">
          <Col md={3} xs={3} className="card">
            <h6>Stop loss (%) </h6>
            <IncrementDecrementInput
              property={tradeDetailModal.stopLoss}
              onDecrement={() =>
                tradeDetailModalDispatcher({ type: DECREMENT_STOP_LOSS })
              }
              onIncrement={() =>
                tradeDetailModalDispatcher({ type: INCREMENT_STOP_LOSS })
              }
              onUpdate={(elem) => {
                tradeDetailModalDispatcher({
                  type: UPDATE_STOP_LOSS,
                  payload: elem.target.value,
                });
              }}
              isIncrementDisabled={
                tradeDetailModal.stopLoss === "" ||
                tradeDetailModal.stopLoss <= 1
              }
              isDecrementDisabled={
                tradeDetailModal.stopLoss === "" ||
                tradeDetailModal.stopLoss >= 99
              }
              isUpdateDisabled={false}
              errorMessage="Stop Loss field can't be empty"
              isError={!tradeDetailModal.isStopLossValid}
            />
          </Col>
          <Col md={3} xs={6} className="card">
            <h6>Profit Target (%)</h6>
            <IncrementDecrementInput
              property={tradeDetailModal.profitTarget}
              onDecrement={() =>
                tradeDetailModalDispatcher({ type: DECREMENT_PROFIT_TARGET })
              }
              onIncrement={() =>
                tradeDetailModalDispatcher({ type: INCREMENT_PROFIT_TARGET })
              }
              onUpdate={(elem) => {
                tradeDetailModalDispatcher({
                  type: UPDATE_PROFIT_TARGET,
                  payload: elem.target.value,
                });
              }}
              isIncrementDisabled={
                tradeDetailModal.profitTarget === "" ||
                tradeDetailModal.profitTarget <= 1
              }
              isDecrementDisabled={
                tradeDetailModal.profitTarget === "" ||
                tradeDetailModal.profitTarget >= 99
              }
              isUpdateDisabled={false}
              errorMessage="Profit Target field can't be empty"
              isError={!tradeDetailModal.isProfitTargetValid}
            />
          </Col>
        </Row>
      );
    } else {
      tradeDirectionVariant = "info";
      row3 = (
        <Row className="row3">
          <Col md={3} xs={3} className="card">
            <h6>Gain</h6>
            <p>{tradeDetailModal.item.gain}</p>
          </Col>
        </Row>
      );
    }
    let statusStyle = {
      backgroundColor: "#64B5F6",
      borderColor: "#1E88E5",
      color: "black",
    };
    if (tradeDetailModal.item.status === "pending") {
      statusStyle = {
        backgroundColor: "#bcb416",
        borderColor: "#FDD835",
        color: "black",
      };
      refreshDisabled = true;
      executeDisabled = true;
    }
    if (tradeDetailModal.item.status === "executed") {
      statusStyle = {
        backgroundColor: "#A5D6A7",
        borderColor: "#43A047",
        color: "black",
      };
      refreshDisabled = true;
      executeDisabled = true;
    }
    if (tradeDetailModal.item.status === "insufficient_funds") {
      statusStyle = {
        backgroundColor: "#FF8A65",
        borderColor: "#F4511E",
        color: "black",
      };
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{
            background:
              "linear-gradient(to right, rgb(246, 211, 101), rgb(253, 160, 133))",
          }}
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            stlye={{ lineHeight: "10" }}
          >
            <div className="header-text-custom">
              {tradeDetailModal.item.ticker.tickerName}
            </div>
            <em style={{ fontSize: "10px" }}>
              Creation Time: {tradeDetailModal.item.createdAt}
            </em>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "floralwhite" }}>
          <Container fluid>
            <Row className="row1">
              <Col md={5} xs={5} className="card">
                <h6>Ticker ID</h6>
                <p>{tradeDetailModal.item.ticker.tickerId}</p>
              </Col>
              <Col md={5} xs={5} className="card">
                <h6>Timeframe</h6>
                <p>{tradeDetailModal.item.timeframe}</p>
              </Col>
            </Row>
            <Row className="row1">
              <Col md={5} xs={5} className="card">
                <h6>Direction</h6>
                <Button variant={tradeDirectionVariant}>
                  {tradeDetailModal.item.tradeDirection}
                </Button>
              </Col>
              <Col md={5} xs={5} className="card">
                <h6>Status</h6>
                <Button style={statusStyle}>
                  {tradeDetailModal.item.status}
                </Button>
              </Col>
            </Row>
            <Row className="row3">
              <Col md={4} xs={4} className="card">
                <h6>Price Per Ticker</h6>
                <InputGroup>
                  <InputGroup.Text>
                    {tradeDetailModal.item.pricePerTicker}
                  </InputGroup.Text>
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col md={3} xs={4} className="card">
                <h6>Quantity</h6>
                <IncrementDecrementInput
                  property={tradeDetailModal.quantity}
                  onDecrement={decrementQuantity}
                  onIncrement={incrementQuantity}
                  isIncrementDisabled={
                    !tradeDetailModal.incrementQuantityStatus
                  }
                  isDecrementDisabled={
                    !tradeDetailModal.decrementQuantityStatus
                  }
                  isUpdateDisabled={true}
                />
              </Col>
              <Col md={4} xs={4} className="card">
                <h6>Total Cost</h6>
                <InputGroup>
                  <InputGroup.Text>
                    {tradeDetailModal.item.totalCost}
                  </InputGroup.Text>
                  <InputGroup.Text>₹</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            {row3}
          </Container>
        </Modal.Body>
        <Modal.Footer
          style={{
            background:
              "linear-gradient(to right, rgb(246, 211, 101), rgb(253, 160, 133))",
          }}
        >
          <button className="btn btn-primary" disabled={refreshDisabled}>
            {" "}
            <BiRefresh />
          </button>
          <button
            className="btn btn-secondary"
            disabled={executeDisabled}
            onBlur={setValidity}
            onClick={executeTradeHandler}
          >
            EXECUTE{" "}
          </button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return <div></div>;
  }
};
export default OpenTradeModal;
