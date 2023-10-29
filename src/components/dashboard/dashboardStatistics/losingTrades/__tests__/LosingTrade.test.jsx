import { render, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../../../context/auth/AuthState";
import DashboardState from "../../../../../context/dashboard/DashboardState";
import LosingTrade from "../LosingTrade";
const mount = () => {
  return render(
    <AuthState>
      <DashboardState>
        <BrowserRouter>
          <LosingTrade />
        </BrowserRouter>
      </DashboardState>
    </AuthState>
  );
};
describe("LosingTrade Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render LosingTrade Component", () => {
    mount();
  });
});