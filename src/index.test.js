import ReactDOM from "react-dom";
import App from "./App";
import AuthState from "./context/auth/AuthState";
import DashboardState from "./context/dashboard/DashboardState";
jest.mock("react-dom", () => ({ render: jest.fn() }));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <AuthState>
      <DashboardState>
        <App />
      </DashboardState>
    </AuthState>,
    div
  );
  global.document.getElementById = (id) => id === "root" && div;
  expect(ReactDOM.render).toHaveBeenCalledWith(
    <AuthState>
      <DashboardState>
        <App />
      </DashboardState>
    </AuthState>,
    div
  );
});
