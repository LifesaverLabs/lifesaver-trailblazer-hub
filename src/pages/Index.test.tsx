import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "./Index";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Index Page", () => {
  describe("Rendering", () => {
    it("should render the page without crashing", () => {
      renderWithRouter(<Index />);
      expect(document.body).toBeInTheDocument();
    });

    it("should render the Hero component", () => {
      renderWithRouter(<Index />);
      // Hero contains the Lifesaver Labs logo
      expect(screen.getByAltText("Lifesaver Labs")).toBeInTheDocument();
    });

    it("should render the OrganizationTabs component", () => {
      renderWithRouter(<Index />);
      // OrganizationTabs contains the tabs
      expect(screen.getByText("Coalition (Nonprofit)")).toBeInTheDocument();
      expect(screen.getByText("PBC (Public Benefit Corp)")).toBeInTheDocument();
      expect(screen.getByText("Civics Campaigns and Legal")).toBeInTheDocument();
    });

    it("should render the InternationalizationSection component", () => {
      renderWithRouter(<Index />);
      expect(screen.getByText("Internationalization")).toBeInTheDocument();
    });

    it("should render the Footer component", () => {
      renderWithRouter(<Index />);
      expect(screen.getByText(/First, do no harm/)).toBeInTheDocument();
    });
  });

  describe("Page Structure", () => {
    it("should have min-h-screen class on main container", () => {
      renderWithRouter(<Index />);
      const mainContainer = document.querySelector(".min-h-screen");
      expect(mainContainer).toBeInTheDocument();
    });

    it("should have bg-background class for theming", () => {
      renderWithRouter(<Index />);
      const bgContainer = document.querySelector(".bg-background");
      expect(bgContainer).toBeInTheDocument();
    });
  });

  describe("Content Verification", () => {
    it("should display the mission statement", () => {
      renderWithRouter(<Index />);
      expect(
        screen.getByText(/We don't just save lives—we redesign and reinvent the systems/)
      ).toBeInTheDocument();
    });

    it("should display the Vision Zero reference", () => {
      renderWithRouter(<Index />);
      expect(screen.getByText(/Vision Zero vote/)).toBeInTheDocument();
    });

    it("should display the grandchildren quote", () => {
      renderWithRouter(<Index />);
      expect(screen.getByText(/grandchildren will inherit/)).toBeInTheDocument();
    });
  });
});
