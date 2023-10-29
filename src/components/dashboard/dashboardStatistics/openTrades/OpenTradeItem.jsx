import { useContext } from "react";
import SimpleDateTime from "react-simple-timestamp-to-date/src/utilities/SimpleDateTime";
import { tradeContext } from "../../../../context/trade/tradeContext";
import { getSellTradeDetails } from "../../../../services/getSellTradeDetails";
// import { getSellTradeDetails } from "../../../services/getSellTradeDetails";
const OpenTradeItem = ({ trade }) => {
  const {
    userPortfolioId,
    tickerName,
    averagePrice,
    quantity,

    currentPrice,
    currentProfitOrLoss,
  } = trade;

  const { setShowModal, tradeDetailModalDispatcher } =
    useContext(tradeContext);

  return (
    <tr className="align-center">
      <td >{tickerName}</td>
      <td>{averagePrice}</td>

      <td>{currentPrice}</td>
      <td>{quantity}</td>
      <td
        style={{
          color: currentProfitOrLoss > 0 ? "green" : "red",
        }}
      >
        {" "}
        {currentProfitOrLoss < 0 ? "-" : ""} &#8377;{" "}
        {Math.abs(currentProfitOrLoss)}
      </td>
      <td>
        <button
          className="btn btn-outline-primary btn-size"
          onClick={() =>
            getSellTradeDetails(
              userPortfolioId,
              tradeDetailModalDispatcher,
              setShowModal
            )
          }
        >
          Sell
        </button>
      </td>
    </tr>
  );
};

export default OpenTradeItem;
