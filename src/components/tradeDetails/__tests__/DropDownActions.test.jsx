import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import DropdownActions from "../dropDown/DropDownActions";
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
  <DropdownActions
    show={true}
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
    const refresh = screen.getByText(/Refresh/);
    expect(refresh).toBeInTheDocument();
  });
  it("should call onRefresh when refresh is pressed", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const refresh = screen.getByText(/Refresh/);
    user.click(refresh);
    expect(onRefreshMock).toHaveBeenCalledTimes(1);
    expect(onRefreshMock).toHaveBeenCalledWith(ISF_ITEM);
  });
  it("should call onDelete when delete is pressed", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const deleteElement = screen.getByText(/Delete/);
    user.click(deleteElement);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(ISF_ITEM);
  });
  it("should call onExecute when execute is pressed", () => {
    render(<TestComponent item={ISF_ITEM} />);
    const executeElement = screen.getByText(/Execute/);
    user.click(executeElement);
    expect(onExecuteMock).toHaveBeenCalledTimes(1);
    expect(onExecuteMock).toHaveBeenCalledWith(ISF_ITEM);
  });
  it("should disable refresh when refreshDisabled is true", () => {
    render(<TestComponent item={ISF_ITEM} refreshDisabled={true} />);
    const refreshElement = screen.getByRole("button", { name: /Refresh/i });
    expect(refreshElement).toHaveClass("text-muted");
  });
  it("should disable delete when deleteDisabled is true", () => {
    render(<TestComponent item={ISF_ITEM} deleteDisabled={true} />);
    const deleteElement = screen.getByRole("button", { name: /Delete/i });
    expect(deleteElement).toHaveClass("text-muted");
  });
  it("should disable execute when executeDisabled is true", () => {
    render(<TestComponent item={ISF_ITEM} executeDisabled={true} />);
    const executedElement = screen.getByRole("button", { name: /Execute/i });
    expect(executedElement).toHaveClass("text-muted");
  });
});