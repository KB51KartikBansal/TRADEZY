import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../../../context/auth/AuthState";
import DashboardState from "../../../../../context/dashboard/DashboardState";
import OpenTrade from "../OpenTrades";
const mount = () => {
  return render(
    <AuthState>
      <DashboardState>
        <BrowserRouter>
          <OpenTrade />
        </BrowserRouter>
      </DashboardState>
    </AuthState>
  );
};
describe("OpenTrade Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should test OpenTrade component", () => {
    mount();
  });
});