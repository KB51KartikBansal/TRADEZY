import { render, screen, cleanup } from "@testing-library/react";
import CloseTradeItem from "../ClosedTradeItem";
const data = {
  tickerName: "sanjay",
  tradeOpenedAt: "2022-07-01T01:00:30.000+00:00",
  pricePerTicker: 12,
  tradeClosedAt: "2022-09-01T01:00:30.000+00:00",
  soldPricePerTicker: 15,
  gain: 45,
};
const mount = () => {
  return render(<CloseTradeItem trade={data} />);
};
describe("CloseTradeItem Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should test CloseTradeItem Component", () => {
    mount();
    const tickerName = screen.getByTestId("tickerName");
    expect(tickerName).toBeDefined();
    const tradeOpenedAt = screen.getByTestId("tradeOpenedAt");
    expect(tradeOpenedAt).toBeDefined();
    const pricePerTicker = screen.getByTestId("pricePerTicker");
    expect(pricePerTicker).toBeDefined();
    const tradeClosedAt = screen.getByTestId("tradeClosedAt");
    expect(tradeClosedAt).toBeDefined();
    const soldPricePerTicker = screen.getByTestId("soldPricePerTicker");
    expect(soldPricePerTicker).toBeDefined();
    const quantity = screen.getByTestId("quantity");
    expect(quantity).toBeDefined();
    const gain = screen.getByTestId("gain");
    expect(gain).toBeDefined();
  });
});