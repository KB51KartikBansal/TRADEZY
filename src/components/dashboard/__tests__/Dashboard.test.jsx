import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../context/auth/AuthState";
import DashboardState from "../../../context/dashboard/DashboardState";
import Dashboard from "../Dashboard";
const mount = () => {
  return render(
    <AuthState>
      <DashboardState>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </DashboardState>
    </AuthState>
  );
};
describe("Dashboard Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should Dashboard CloseTrades Component", () => {
    mount();
  });
});