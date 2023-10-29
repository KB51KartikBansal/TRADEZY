import { render, cleanup } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../context/auth/AuthState";
import Navbar from "../Navbar";
const mount = () => {
  return render(
    <AuthState>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </AuthState>
  );
};
describe("Navbar Component", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render NavBar Component", () => {
    mount();
  });
});