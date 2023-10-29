import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../../../context/auth/AuthState";
import DashboardState from "../../../../../context/dashboard/DashboardState";
import WinningTradeItem from "../WinningTrades";
const dummyTradeData = {
  tickerName: "sanjay",
  tradeOpenedAt: "2022-07-01T01:00:30.000+00:00",
  pricePerTicker: 90,
  tradeClosedAt: "2022-09-01T01:00:30.000+00:00",
  soldPricePerTicker: 100,
  gain: 1000,
};
const mount = () => {
  return render(
    <AuthState>
      <DashboardState>
        <BrowserRouter>
          <WinningTradeItem trade={dummyTradeData} />
        </BrowserRouter>
      </DashboardState>
    </AuthState>
  );
};
describe("WinningTrade Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should test WinningTrade component", () => {
    mount();
  });
});