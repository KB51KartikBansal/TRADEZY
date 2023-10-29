
const WinningTradeItem = ({ trade }) => {
  const {
    tickerName,
    currentProfitOrLoss,
    quantity,
    averagePrice,
    currentPrice,
  } = trade;
  return (
    <>
      <tr>
        <td >{tickerName}</td>
        <td>{averagePrice}</td>

        <td>{currentPrice}</td>
        <td>{quantity}</td>
        <td style={{ color: "green"}}>
          {" "}
          &#8377; {currentProfitOrLoss}
        </td>
      </tr>
    </>
  );
};

export default WinningTradeItem;
