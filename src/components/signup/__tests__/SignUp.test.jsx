import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "../SignUp";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../context/auth/AuthState";
describe("Signup Component", () => {
  it("Initial Conditions", () => {
    render(
      <AuthState>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </AuthState>
    );
    const firstnameInput = screen.getByTestId("firstName");
    expect(firstnameInput).toBeInTheDocument();
    const lastnameInput = screen.getByTestId("lastName");
    expect(lastnameInput).toBeInTheDocument();
    const emailInput = screen.getByTestId("email");
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId("signup-password");
    expect(passwordInput).toBeInTheDocument();
    const confirmpasswordInput = screen.getByTestId("confirmPassword");
    expect(confirmpasswordInput).toBeInTheDocument();
    const submitButton = screen.getByRole("button", {
      name: "SignUp",
      exact: false,
    });
    expect(submitButton).toBeDisabled();
  });
  it("call the OnSubmit function", async () => {
    render(
      <AuthState>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId("userName"), {
        target: { value: "Ankita" },
      });
      fireEvent.change(screen.getByTestId("firstName"), {
        target: { value: "Ankita" },
      });
      fireEvent.change(screen.getByTestId("lastName"), {
        target: { value: "Ray" },
      });
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "test@gmail.com" },
      });
      fireEvent.change(screen.getByTestId("signup-password"), {
        target: { value: "Anki@2222" },
      });
      fireEvent.change(screen.getByTestId("confirmPassword"), {
        target: { value: "Anki@2222" },
      });
    });
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("signup-button"));
    });
    expect(screen.getByTestId("userName").value).toBe("Ankita");
    expect(screen.getByTestId("firstName").value).toBe("Ankita");
    expect(screen.getByTestId("lastName").value).toBe("Ray");
    expect(screen.getByTestId("email").value).toBe("test@gmail.com");
    expect(screen.getByTestId("signup-password").value).toBe("Anki@2222");
    expect(screen.getByTestId("confirmPassword").value).toBe("Anki@2222");
  });
  it("call the OnSubmit function2", async () => {
    render(
      <AuthState>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(screen.getByTestId("userName"), {
        target: { value: 123 },
      });
      fireEvent.change(screen.getByTestId("firstName"), {
        target: { value: 123 },
      });
      fireEvent.change(screen.getByTestId("lastName"), {
        target: { value: 123 },
      });
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "test" },
      });
      fireEvent.change(screen.getByTestId("signup-password"), {
        target: { value: "nki@222" },
      });
      fireEvent.change(screen.getByTestId("confirmPassword"), {
        target: { value: "nki@2222" },
      });
    });
  });
});