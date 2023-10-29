import { render, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DashboardFrame from "../DashboardFrame";
const mount = () => {
  return render(
    <BrowserRouter>
      <DashboardFrame color="rgb(0,162,232)" title="Closed Trades" no={17} />
    </BrowserRouter>
  );
};
describe('DashBoardFrame Component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should test dashboardFrame navigation to Closed Trades', () => {
    mount();
    window.setImmediate = window.setTimeout;
  })
});