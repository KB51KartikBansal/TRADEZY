import { render, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../../../context/auth/AuthState";
import DashboardState from "../../../../../context/dashboard/DashboardState";
import CloseTrade from "../ClosedTrades";
const mount = () => {
  return render(
    <AuthState>
      <DashboardState>
        <BrowserRouter>
          <CloseTrade />
        </BrowserRouter>
      </DashboardState>
    </AuthState>
  );
};
describe("CloseTrades Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render CloseTrades Component", () => {
    mount();
  });
});