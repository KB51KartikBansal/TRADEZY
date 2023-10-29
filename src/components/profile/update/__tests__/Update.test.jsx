import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Update from "../Update";
import { BrowserRouter } from "react-router-dom";
import AuthState from "../../../../context/auth/AuthState";
describe("Rendering update component", () => {
  it("renders the password validation error", async () => {
    render(
      <AuthState>
        <BrowserRouter>
          <Update />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      const passwordInput = screen.getByTestId("content-password");
      fireEvent.change(passwordInput, {
        target: { value: "Test@9090" },
      });
      fireEvent.blur(passwordInput);
      const newPasswordInput = screen.getByTestId("content-newpassword");
      fireEvent.change(newPasswordInput, {
        target: { value: "Test1@9090" },
      });
      fireEvent.blur(newPasswordInput);
      const confirmPasswordInput = screen.getByTestId(
        "content-confirmpassword"
      );
      fireEvent.change(confirmPasswordInput, {
        target: { value: "Test1@9090" },
      });
      fireEvent.blur(confirmPasswordInput);
    });
    expect(screen.getByTestId("content-password").value).toBe("Test@9090");
    expect(screen.getByTestId("content-newpassword").value).toBe("Test1@9090");
    expect(screen.getByTestId("content-confirmpassword").value).toBe(
      "Test1@9090"
    );
  });
  it("renders handleMouseDownNewPassword", async () => {
    const handleMouseDownNewPassword = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Update onMouseDown={handleMouseDownNewPassword} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.mouseDown(screen.getByTestId("newpass-btn"));
    });
  });
  it("renders handleClickShowNewPassword", async () => {
    const handleClickShowNewPassword = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Update onClick={handleClickShowNewPassword} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("newpass-btn"));
    });
  });
  it("renders handleMouseDownPassword", async () => {
    const handleMouseDownPassword = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Update onMouseDown={handleMouseDownPassword} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.mouseDown(screen.getByTestId("icon-button"));
    });
  });
  it("renders handleClickShowPassword", async () => {
    const handleClickShowPassword = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Update onClick={handleClickShowPassword} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("icon-button"));
    });
  });
  it("renders handleMouseDownConfirmPassword", async () => {
    const handleMouseDownConfirmPassword = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Update onMouseDown={handleMouseDownConfirmPassword} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.mouseDown(screen.getByTestId("con-btn"));
    });
  });
  it("renders handleClickShowConfirmPassword", async () => {
    const handleClickShowConfirmPassword = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Update onClick={handleClickShowConfirmPassword} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("con-btn"));
    });
  });
  it("renders onSubmit", async () => {
    const handleSubmit = jest.fn();
    render(
      <AuthState>
        <BrowserRouter>
          <Update onSubmit={handleSubmit} />
        </BrowserRouter>
      </AuthState>
    );
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(screen.getByTestId("btn-submit"));
    });
  });
});