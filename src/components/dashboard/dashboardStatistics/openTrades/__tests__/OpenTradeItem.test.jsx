import { render, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import OpenTradeItem from "../OpenTradeItem";
import TradeState from "../../../../../context/trade/TradeState";
const data = {
  userPortfolioId: "111",
  tickerName: "sanjay",
  averagePrice: 123,
  quantity: 1,
  currentPrice: 123,
  currentProfitOrLoss: "Loss",
};
const mount = () => {
  return render(
    <TradeState>
      <BrowserRouter>
        <OpenTradeItem trade={data} />
      </BrowserRouter>
    </TradeState>
  );
};
describe("OpenTradeItem Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render OpenTradeItem Component", () => {
    mount();
  });
});