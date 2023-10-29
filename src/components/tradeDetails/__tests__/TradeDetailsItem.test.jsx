import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { tradeContext } from "../../../context/trade/tradeContext";
import { logger } from "../../../utils/logger";
import TradeDetailsItem from "../tradeDetailItem/TradeDetailItem";
import item from "./TradeDetailTestConstants.json";
jest.mock("pino", () => () => {
  return {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  };
});
const dispatchMock = jest.fn();
const TestComponent = ({ item, ...rest }) => (
  <tradeContext.Provider value={{ tradeDetailModalDispatcher: dispatchMock }}>
    <TradeDetailsItem item={item} {...rest} />{" "}
  </tradeContext.Provider>
);
describe("TradeDetailsItem", () => {
  beforeEach(() => {
    jest.mock("../../../utils/logger");
    logger.debug.mockImplementationOnce(() => {});
  });
  it("should render correctly", () => {
    render(<TestComponent item={item} />);
    const tickerIdElement = screen.getAllByText(/ICICI.BNK/i);
    expect(tickerIdElement.length).toBe(2);
    const statusElement = screen.getByText(/insufficient funds/i);
    expect(statusElement).toBeInTheDocument();
  });
  it("should refresh on clicking refresh", () => {
    render(<TestComponent item={item} />);
    const refreshElement = screen.getByRole("button", { name: /refresh/i });
    user.click(refreshElement);
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
  it("should call ondelete  on clicking delete", () => {
    render(<TestComponent item={item} />);
    const deleteElement = screen.getByRole("button", { name: /delete/i });
    user.click(deleteElement);
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
  it("should call onExecute  on clicking execute", () => {
    render(<TestComponent item={item} />);
    const executeElement = screen.getByRole("button", { name: /execute/i });
    user.click(executeElement);
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
});