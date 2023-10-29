import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardState from "../../../context/dashboard/DashboardState";
import Watchlist from "../Watchlist";
const mount = () => {
  return render(
    <DashboardState>
      <BrowserRouter>
        <Watchlist />
      </BrowserRouter>
    </DashboardState>
  );
};
describe("WatchList Component", () => {
  it("testing Watchlist component when  watchlist is empty", () => {
    mount();
  });
  it("testing Watchlist component with tickers", async () => {
    const handleRemove = jest.fn();
    render(
      <DashboardState>
        <BrowserRouter>
          <Watchlist onClick={handleRemove} />
        </BrowserRouter>
      </DashboardState>
    );
  });
});