import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

// Wrapper to provide router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Footer Component", () => {
  describe("Rendering", () => {
    it("should render the component without crashing", () => {
      renderWithRouter(<Footer />);
      expect(document.body).toBeInTheDocument();
    });

    it("should render footer element", () => {
      const { container } = renderWithRouter(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Lifesaver Labs Section", () => {
    it("should render Lifesaver Labs heading", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Lifesaver Labs")).toBeInTheDocument();
    });

    it("should render the organization description", () => {
      renderWithRouter(<Footer />);
      expect(
        screen.getByText(/coordinated ecosystem dedicated to public benefit/)
      ).toBeInTheDocument();
    });

    it("should mention life-saving innovation", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText(/life-saving innovation/)).toBeInTheDocument();
    });

    it("should mention democratic integrity", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText(/democratic integrity/)).toBeInTheDocument();
    });
  });

  describe("Organizations Section", () => {
    it("should render Our Organizations heading", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Our Organizations")).toBeInTheDocument();
    });

    it("should list Lifesaver Labs Coalition", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Lifesaver Labs Coalition")).toBeInTheDocument();
    });

    it("should list Lifesaver Labs PBC", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Lifesaver Labs PBC")).toBeInTheDocument();
    });

    it("should list Lifesaver Labs USA", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Lifesaver Labs USA")).toBeInTheDocument();
    });

    it("should have Coalition link to #coalition", () => {
      renderWithRouter(<Footer />);
      const coalitionLink = screen.getByRole("link", { name: "Lifesaver Labs Coalition" });
      expect(coalitionLink).toHaveAttribute("href", "#coalition");
    });

    it("should have PBC link to #pbc", () => {
      renderWithRouter(<Footer />);
      const pbcLink = screen.getByRole("link", { name: "Lifesaver Labs PBC" });
      expect(pbcLink).toHaveAttribute("href", "#pbc");
    });

    it("should have USA link to #usa", () => {
      renderWithRouter(<Footer />);
      const usaLink = screen.getByRole("link", { name: "Lifesaver Labs USA" });
      expect(usaLink).toHaveAttribute("href", "#usa");
    });
  });

  describe("Contact Section", () => {
    it("should render Contact heading", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    it("should display team@lifesaverlabs.org email", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("team@lifesaverlabs.org")).toBeInTheDocument();
    });

    it("should display team@neighbor911.us email", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("team@neighbor911.us")).toBeInTheDocument();
    });

    it("should display CONSENT phone number", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("+1-800-CONSENT")).toBeInTheDocument();
    });

    it("should display numeric phone number", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText("+1 (321) 252-9626")).toBeInTheDocument();
    });

    it("should have mailto link for lifesaverlabs", () => {
      renderWithRouter(<Footer />);
      const emailLink = screen.getByRole("link", { name: /team@lifesaverlabs.org/ });
      expect(emailLink).toHaveAttribute("href", "mailto:team@lifesaverlabs.org");
    });

    it("should have mailto link for neighbor911", () => {
      renderWithRouter(<Footer />);
      const emailLink = screen.getByRole("link", { name: /team@neighbor911.us/ });
      expect(emailLink).toHaveAttribute("href", "mailto:team@neighbor911.us");
    });

    it("should have tel link for CONSENT", () => {
      renderWithRouter(<Footer />);
      const phoneLink = screen.getByRole("link", { name: /800-CONSENT/ });
      expect(phoneLink).toHaveAttribute("href", "tel:+18002667368");
    });

    it("should have tel link for numeric phone", () => {
      renderWithRouter(<Footer />);
      const phoneLink = screen.getByRole("link", { name: /321.*252.*9626/ });
      expect(phoneLink).toHaveAttribute("href", "tel:+13212529626");
    });
  });

  describe("Copyright Section", () => {
    it("should display copyright notice", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText(/© \d{4} Lifesaver Labs Coalition & PBC/)).toBeInTheDocument();
    });

    it("should show current year in copyright", () => {
      renderWithRouter(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    });

    it("should mention public benefit organizations", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText(/Public benefit organizations/)).toBeInTheDocument();
    });

    it("should include liberty with superscript 5", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText(/liberty⁵-building innovation/)).toBeInTheDocument();
    });
  });

  describe("Tagline", () => {
    it("should display the Hippocratic tagline", () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText(/"First, do no harm. Then, save lives."/)).toBeInTheDocument();
    });

    it("should be italicized", () => {
      renderWithRouter(<Footer />);
      const tagline = screen.getByText(/"First, do no harm. Then, save lives."/);
      expect(tagline).toHaveClass("italic");
    });
  });

  describe("Styling", () => {
    it("should have bg-secondary class", () => {
      const { container } = renderWithRouter(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("bg-secondary");
    });

    it("should have text-secondary-foreground class", () => {
      const { container } = renderWithRouter(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("text-secondary-foreground");
    });

    it("should have mt-20 for top margin", () => {
      const { container } = renderWithRouter(<Footer />);
      const footer = container.querySelector("footer");
      expect(footer).toHaveClass("mt-20");
    });

    it("should have grid layout for content sections", () => {
      const { container } = renderWithRouter(<Footer />);
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });

    it("should have responsive grid columns", () => {
      const { container } = renderWithRouter(<Footer />);
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass("grid-cols-1");
      expect(grid).toHaveClass("md:grid-cols-3");
    });

    it("should have border-t for copyright section", () => {
      const { container } = renderWithRouter(<Footer />);
      const borderElement = container.querySelector(".border-t");
      expect(borderElement).toBeInTheDocument();
    });
  });

  describe("Icons", () => {
    it("should render Mail icons", () => {
      const { container } = renderWithRouter(<Footer />);
      const svgs = container.querySelectorAll("svg");
      // Should have at least 4 icons (2 mail, 2 phone)
      expect(svgs.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Accessibility", () => {
    it("should use semantic footer element", () => {
      const { container } = renderWithRouter(<Footer />);
      expect(container.querySelector("footer")).toBeInTheDocument();
    });

    it("should have accessible email links", () => {
      renderWithRouter(<Footer />);
      const emailLinks = screen.getAllByRole("link").filter((link) =>
        link.getAttribute("href")?.startsWith("mailto:")
      );
      expect(emailLinks.length).toBe(2);
    });

    it("should have accessible phone links", () => {
      renderWithRouter(<Footer />);
      const phoneLinks = screen.getAllByRole("link").filter((link) =>
        link.getAttribute("href")?.startsWith("tel:")
      );
      expect(phoneLinks.length).toBe(2);
    });

    it("should have heading structure", () => {
      renderWithRouter(<Footer />);
      const headings = screen.getAllByRole("heading");
      expect(headings.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Hover States", () => {
    it("should have hover:text-primary on organization links", () => {
      renderWithRouter(<Footer />);
      const coalitionLink = screen.getByRole("link", { name: "Lifesaver Labs Coalition" });
      expect(coalitionLink).toHaveClass("hover:text-primary");
    });

    it("should have transition-colors on links", () => {
      renderWithRouter(<Footer />);
      const coalitionLink = screen.getByRole("link", { name: "Lifesaver Labs Coalition" });
      expect(coalitionLink).toHaveClass("transition-colors");
    });
  });

  describe("Layout", () => {
    it("should have container class for max-width", () => {
      const { container } = renderWithRouter(<Footer />);
      const containerEl = container.querySelector(".container");
      expect(containerEl).toBeInTheDocument();
    });

    it("should have horizontal padding", () => {
      const { container } = renderWithRouter(<Footer />);
      const paddingEl = container.querySelector(".px-6");
      expect(paddingEl).toBeInTheDocument();
    });

    it("should have vertical padding", () => {
      const { container } = renderWithRouter(<Footer />);
      const paddingEl = container.querySelector(".py-12");
      expect(paddingEl).toBeInTheDocument();
    });

    it("should have gap between grid items", () => {
      const { container } = renderWithRouter(<Footer />);
      const grid = container.querySelector(".grid");
      expect(grid).toHaveClass("gap-8");
    });
  });
});
