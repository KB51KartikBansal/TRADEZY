import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import EmptyTradeDetail from "../EmptyTradeDetail";
import { BrowserRouter } from "react-router-dom";
describe("EmptyTradeDetail", () => {
  it("should render correctly", () => {
    render(
      <BrowserRouter>
        <EmptyTradeDetail />
      </BrowserRouter>
    );
    const headerElement = screen.getByText(/You have no trade details/i);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("alert");
    expect(headerElement).toBeInTheDocument();
  });
});