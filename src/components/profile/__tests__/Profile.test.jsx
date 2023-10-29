import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../context/auth/AuthState";
import Profile from "../Profile";
describe("Rendering update component", () => {
  it("Testing handleOverview", async () => {
    const handleOverview = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Profile onClick={handleOverview} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("over-view"));
    });
  });
  it("Testing handleUpdate", async () => {
    const handleUpdate = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Profile onClick={handleUpdate} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("over-update"));
    });
  });
  it("Testing handleTradingDetails", async () => {
    const handleTradingDetails = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Profile onClick={handleTradingDetails} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("trading-details"));
    });
  });
});