import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import TradeDetailItemDesktop from "../tradeDetailItem/TradeDetailItemDesktop";
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
  <TradeDetailItemDesktop
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
describe("TradeDetailItemDesktop", () => {
  it("should render correctly", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const tickerId = screen.getByText(/ICICI.BNK/i);
    const direction = screen.getByText(/BUY/i);
    const status = screen.getByText(/insufficient funds/i);
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
  it("should call onRefresh when refresh is pressed", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const refresh = screen.getByRole("button", { name: /refresh/i });
    user.click(refresh);
    expect(onRefreshMock).toHaveBeenCalledTimes(1);
    expect(onRefreshMock).toHaveBeenCalledWith(ISF_ITEM);
  });
  it("should call onDelete when delete is pressed", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const deleteElement = screen.getByRole("button", { name: /delete/i });
    user.click(deleteElement);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(ISF_ITEM);
  });
  it("should call onExecute when execute is pressed", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const executeElement = screen.getByRole("button", { name: /execute/i });
    user.click(executeElement);
    expect(onExecuteMock).toHaveBeenCalledTimes(1);
    expect(onExecuteMock).toHaveBeenCalledWith(ISF_ITEM);
  });
  it("should disable refresh when refreshDisabled is true", () => {
    render(<TestComponent item={ISF_ITEM} refreshDisabled={true} />);
    const refreshElement = screen.getByRole("button", { name: /refresh/i });
    expect(refreshElement).toBeDisabled();
  });
  it("should disable delete when deleteDisabled is true", () => {
    render(<TestComponent item={ISF_ITEM} deleteDisabled={true} />);
    const deleteElement = screen.getByRole("button", { name: /delete/i });
    expect(deleteElement).toBeDisabled();
  });
  it("should disable execute when executeDisabled is true", () => {
    render(<TestComponent item={ISF_ITEM} executeDisabled={true} />);
    const executedElement = screen.getByRole("button", { name: /execute/i });
    expect(executedElement).toBeDisabled();
  });
});