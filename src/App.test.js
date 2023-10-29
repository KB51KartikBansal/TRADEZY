import { render } from "@testing-library/react";
import App from "./App";
import SimpleDateTime from "react-simple-timestamp-to-date/src/utilities/SimpleDateTime";
import AuthState from "./context/auth/AuthState";
import DashboardState from "./context/dashboard/DashboardState";
test("App component testing", () => {
  render(
    <AuthState>
      <DashboardState>
        <App />
      </DashboardState>
    </AuthState>
  );
});
