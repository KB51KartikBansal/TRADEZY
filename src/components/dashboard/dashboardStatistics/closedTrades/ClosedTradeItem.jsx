import SimpleDateTime from "react-simple-timestamp-to-date/src/utilities/SimpleDateTime";

const CloseTradeItem = ({ trade }) => {
  const {
    tickerName,
    tradeOpenedAt,
    pricePerTicker,
    tradeClosedAt,
    soldPricePerTicker,
    gain,
  } = trade;
  return (
    <tr data-testid="row">
      <td className="text-start" data-testid="tickerName">
        {tickerName}
      </td>
      <td data-testid="tradeOpenedAt">
        <SimpleDateTime
          dateSeparator="/"
          timeSeparator=":"
          format="DMY"
          meridians="1"
        >
          {tradeOpenedAt}
        </SimpleDateTime>
      </td>
      <td data-testid="pricePerTicker">{pricePerTicker}</td>
      <td data-testid="tradeClosedAt">
        <SimpleDateTime
          dateSeparator="/"
          timeSeparator=":"
          format="DMY"
          meridians="1"
        >
          {tradeClosedAt}
        </SimpleDateTime>
      </td>
      <td data-testid="soldPricePerTicker">{soldPricePerTicker}</td>
      <td data-testid="quantity">
        {Math.round(Math.abs(gain / (soldPricePerTicker - pricePerTicker)))}
      </td>
      <td
        data-testid="gain"
        style={{ color: gain > 0 ? "green" : "red", textAlign: "start" }}
      >
        {" "}
        {gain < 0 ? "-" : ""} &#8377; {Math.abs(gain)}
      </td>
    </tr>
  );
};

export default CloseTradeItem;
