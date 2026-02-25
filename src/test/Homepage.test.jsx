import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

describe("HomePage", () => {
  test("renders admin portal heading", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/admin portal/i)).toBeInTheDocument();
  });
});