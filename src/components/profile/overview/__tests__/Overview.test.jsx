import Overview from "../Overview";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AuthState from "../../../../context/auth/AuthState";
import { BrowserRouter } from "react-router-dom";
describe("Overview Component", () => {
  it("Initial Conditions", () => {
    render(
      <AuthState>
        <BrowserRouter>
          <Overview />
        </BrowserRouter>
      </AuthState>
    );
    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("full-name")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("mobile")).toBeInTheDocument();
  });
});