import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../Login";
import AuthState from "../../../context/auth/AuthState";
import authContext from "../../../context/auth/authContext";
const navigate = jest.fn();
const handleSubmit = jest.fn();
describe("Login", () => {
  it("Should call OnSubmit function", async () => {
    render(
      <AuthState>
        <BrowserRouter>
          <Login onSubmit={handleSubmit} />
        </BrowserRouter>
      </AuthState>
    );
    await act(async () => {
      const emailInput = screen.getByTestId("usernameOrEmail");
      fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
      fireEvent.blur(emailInput);
      expect(emailInput).toBeInTheDocument();
      const passwordInput = screen.getByTestId("login-password");
      fireEvent.change(passwordInput, { target: { value: "Test@1234" } });
      fireEvent.blur(passwordInput);
      expect(passwordInput).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("login-button"));
    });
  });

  it("should blur fields by wrong input", async () => {
    render(
      <AuthState>
        <BrowserRouter>
          <Login onSubmit={handleSubmit} />
        </BrowserRouter>
      </AuthState>
    );
    await act(async () => {
      const emailInput = screen.getByTestId("usernameOrEmail");
      fireEvent.change(emailInput, { target: { value: "testgmail.com" } });
      fireEvent.blur(emailInput);
      expect(emailInput).toBeInTheDocument();
      const passwordInput = screen.getByTestId("login-password");
      fireEvent.change(passwordInput, { target: { value: "1234" } });
      fireEvent.blur(passwordInput);
      expect(passwordInput).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("login-button"));
    });
  });
  it("Testing navigation", async () => {
    render(
      <authContext.Provider
        value={{
          authState: {
            accessToken: "sfjklsdajlk32k3jl2l3",
            refreshToken: "dkfjlk3kl3kl2l4klj42nkl",
            isAuthenticated: true,
            loading: true,
            user: { userId: 1, userName: "sanjay" },
          },
          authDispatch: jest.fn(),
        }}
      >
        <BrowserRouter>
          <Login useNavigate={navigate} />
        </BrowserRouter>
      </authContext.Provider>
    );
  });
});
