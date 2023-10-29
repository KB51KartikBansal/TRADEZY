import { render, cleanup } from "@testing-library/react";
import React from "react";
import LosingTradeItem from "../LosingTradeItem";
const data = {
  tickerName: "sanjay",
  averagePrice: 123,
  quantity: 1,
  currentPrice: 123,
  currentProfitOrLoss: "Loss",
};
const mount = () => {
  return render(<LosingTradeItem trade={data} />);
};
describe("LosingTradeItem Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render LosingTradeItem Component", () => {
    mount();
  });
});