import Pagination from "../Pagination";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
describe("Pagination Component", () => {
  it("Testing click functions", async () => {
    render(
      <Pagination
        className="pagination-bar"
        currentPage={2}
        totalCount={150}
        pageSize={10}
        onPageChange={jest.fn()}
      />
    );
    const counter = screen.getByTestId(2);
    const prevbtn = screen.getByTestId("prev");
    fireEvent.click(prevbtn);
    fireEvent.click(counter);
    const nextbtn = screen.getByTestId("next");
    fireEvent.click(nextbtn);
    fireEvent.click(counter);
    expect(await screen.findAllByText(2)).toBeDefined();
  });
});