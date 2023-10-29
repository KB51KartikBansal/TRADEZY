import SimpleDateTime from "react-simple-timestamp-to-date/src/utilities/SimpleDateTime";

const LosingTradeItem = ({ trade }) => {
  const {
    tickerName,
    tradeOpenedAt,
    pricePerTicker,
    quantity,
    currentPrice,
    currentProfitOrLoss,
  } = trade;
  return (
    <tr>
      <td className="text-start">{tickerName}</td>
      <td>
        <SimpleDateTime
          dateSeparator="/"
          timeSeparator=":"
          format="DMY"
          meridians="1"
        >
          {tradeOpenedAt}
        </SimpleDateTime>
      </td>
      <td>{pricePerTicker}</td>

      <td>{currentPrice}</td>
      <td>{quantity}</td>
      <td style={{ color: "red", textAlign: "start" }}>
        {" "}
        - &#8377; {Math.abs(currentProfitOrLoss)}
      </td>
    </tr>
  );
};

export default LosingTradeItem;
