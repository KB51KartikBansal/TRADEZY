import { render, cleanup } from "@testing-library/react";
import WinningTradeItem from "../WinningTradeItem";
const data = {
  tickerName: "sanjay",
  averagePrice: 123,
  quantity: 1,
  currentPrice: 123,
  currentProfitOrLoss: "Win",
};
const mount = () => {
  return render(<WinningTradeItem trade={data} />);
};
describe("WinningTradeItem Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should test WinningTradeItem Component", () => {
    mount();
  });
});