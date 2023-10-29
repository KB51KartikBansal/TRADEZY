import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import React from "react";
import TradeDetailItemMobile from "../tradeDetailItem/TradeDetailItemMobile";
import ISF_ITEM from "./TradeDetailTestConstants.json";
jest.mock("pino", () => () => {
  return {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  };
});
const setModalValuesMock = jest.fn();
const onRefreshMock = jest.fn();
const onDeleteMock = jest.fn();
const onExecuteMock = jest.fn();
const TestComponent = ({ item, ...rest }) => (
  <TradeDetailItemMobile
    item={item}
    setModalValues={setModalValuesMock}
    {...rest}
  />
);
TestComponent.defaultProps = {
  key: "2c6f51ed-0ea2-477a-9b5b-ae0f592331445",
  refreshDisabled: false,
  deleteDisabled: false,
  executeDisabled: false,
  onRefresh: onRefreshMock,
  onDelete: onDeleteMock,
  onExecute: onExecuteMock,
};
describe("TradeDetailItemMobile", () => {
  it("should render correctly", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const tickerId = screen.getByText(/ICICI.BNK/i);
    const direction = screen.getByText(/BUY/i);
    const status = screen.getByText(/isf/i);
    expect(tickerId).toBeInTheDocument();
    expect(direction).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  });
  it("should render modal on click", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const tickerId = screen.getByText(/ICICI.BNK/i);
    user.click(tickerId);
    expect(setModalValuesMock).toHaveBeenCalledTimes(1);
    expect(setModalValuesMock).toHaveBeenCalledWith(ISF_ITEM);
  });
});