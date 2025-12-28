import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("NotFound Page", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("Rendering", () => {
    it("should render the 404 heading", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("should render the error message", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
    });

    it("should render a link to return home", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const homeLink = screen.getByRole("link", { name: /Return to Home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute("href", "/");
    });
  });

  describe("Styling", () => {
    it("should have centered content", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const container = document.querySelector(".flex.items-center.justify-center");
      expect(container).toBeInTheDocument();
    });

    it("should have min-h-screen for full viewport height", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const container = document.querySelector(".min-h-screen");
      expect(container).toBeInTheDocument();
    });

    it("should have muted background", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const container = document.querySelector(".bg-muted");
      expect(container).toBeInTheDocument();
    });

    it("should have text-center class for centered text", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const textContainer = document.querySelector(".text-center");
      expect(textContainer).toBeInTheDocument();
    });
  });

  describe("Typography", () => {
    it("should have 404 with text-4xl and font-bold", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const heading = screen.getByText("404");
      expect(heading).toHaveClass("text-4xl");
      expect(heading).toHaveClass("font-bold");
    });

    it("should have error message with text-xl", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const message = screen.getByText("Oops! Page not found");
      expect(message).toHaveClass("text-xl");
    });

    it("should have primary colored link", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("text-primary");
    });

    it("should have underlined link", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveClass("underline");
    });
  });

  describe("Console Logging", () => {
    it("should log 404 error to console with pathname", () => {
      render(
        <MemoryRouter initialEntries={["/non-existent-page"]}>
          <NotFound />
        </MemoryRouter>
      );
      expect(console.error).toHaveBeenCalledWith(
        "404 Error: User attempted to access non-existent route:",
        "/non-existent-page"
      );
    });

    it("should log different paths correctly", () => {
      render(
        <MemoryRouter initialEntries={["/another/missing/route"]}>
          <NotFound />
        </MemoryRouter>
      );
      expect(console.error).toHaveBeenCalledWith(
        "404 Error: User attempted to access non-existent route:",
        "/another/missing/route"
      );
    });
  });

  describe("Accessibility", () => {
    it("should have a semantic heading", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent("404");
    });

    it("should have an accessible link", () => {
      render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAccessibleName("Return to Home");
    });
  });
});
