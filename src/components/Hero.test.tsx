import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero Component", () => {
  describe("Rendering", () => {
    it("should render the component without crashing", () => {
      render(<Hero />);
      expect(document.body).toBeInTheDocument();
    });

    it("should render the Lifesaver Labs logo", () => {
      render(<Hero />);
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toBeInTheDocument();
    });

    it("should have proper image attributes for logo", () => {
      render(<Hero />);
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveAttribute("fetchPriority", "high");
      expect(logo).toHaveAttribute("decoding", "async");
      expect(logo).toHaveAttribute("width", "448");
      expect(logo).toHaveAttribute("height", "448");
    });

    it("should render the mission statement", () => {
      render(<Hero />);
      expect(
        screen.getByText(
          /We don't just save lives—we redesign and reinvent the systems that put them at risk/
        )
      ).toBeInTheDocument();
    });

    it("should render the Vision Zero reference", () => {
      render(<Hero />);
      expect(screen.getByText(/Vision Zero vote/)).toBeInTheDocument();
    });

    it("should render the grandchildren quote", () => {
      render(<Hero />);
      expect(screen.getByText(/grandchildren will inherit/)).toBeInTheDocument();
    });

    it("should render courage vs complacency message", () => {
      render(<Hero />);
      expect(screen.getByText(/courage or our complacency/)).toBeInTheDocument();
    });
  });

  describe("Content", () => {
    it("should mention public health and democracy", () => {
      render(<Hero />);
      expect(screen.getByText(/Public health is democracy in practice/)).toBeInTheDocument();
    });

    it("should mention miracles", () => {
      render(<Hero />);
      expect(screen.getByText(/miracles we're building together/)).toBeInTheDocument();
    });

    it("should reference making no little plans", () => {
      render(<Hero />);
      expect(screen.getByText(/Make no little plans/)).toBeInTheDocument();
    });

    it("should reference systems that shape generations", () => {
      render(<Hero />);
      expect(screen.getByText(/systems that shape generations/)).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have section element as root", () => {
      const { container } = render(<Hero />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have relative positioning for layering", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("relative");
    });

    it("should have min-height for hero section", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("min-h-[70vh]");
    });

    it("should have centered content", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("flex");
      expect(section).toHaveClass("items-center");
      expect(section).toHaveClass("justify-center");
    });

    it("should have overflow hidden for background", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("overflow-hidden");
    });

    it("should have fade-in animation class", () => {
      const { container } = render(<Hero />);
      const contentContainer = container.querySelector(".animate-fade-in");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should have text centered", () => {
      const { container } = render(<Hero />);
      const contentContainer = container.querySelector(".text-center");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Logo Styling", () => {
    it("should have responsive width classes", () => {
      render(<Hero />);
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("w-72");
      expect(logo).toHaveClass("md:w-96");
      expect(logo).toHaveClass("lg:w-[28rem]");
    });

    it("should be centered horizontally", () => {
      render(<Hero />);
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("mx-auto");
    });

    it("should have drop shadow", () => {
      render(<Hero />);
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("drop-shadow-lg");
    });

    it("should have bottom margin", () => {
      render(<Hero />);
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("mb-8");
    });
  });

  describe("Typography", () => {
    it("should have primary statement with larger text", () => {
      render(<Hero />);
      const primaryText = screen
        .getByText(/We don't just save lives/)
        .closest("p");
      expect(primaryText).toHaveClass("text-xl");
      expect(primaryText).toHaveClass("md:text-2xl");
    });

    it("should have secondary statement with slightly smaller text", () => {
      render(<Hero />);
      const secondaryText = screen.getByText(/Make no little plans/).closest("p");
      expect(secondaryText).toHaveClass("text-lg");
      expect(secondaryText).toHaveClass("md:text-xl");
    });

    it("should have font-medium on primary statement", () => {
      render(<Hero />);
      const primaryText = screen
        .getByText(/We don't just save lives/)
        .closest("p");
      expect(primaryText).toHaveClass("font-medium");
    });
  });

  describe("Background", () => {
    it("should have background image container", () => {
      const { container } = render(<Hero />);
      const bgContainer = container.querySelector(".bg-cover.bg-center");
      expect(bgContainer).toBeInTheDocument();
    });

    it("should have gradient overlay", () => {
      const { container } = render(<Hero />);
      const gradientOverlay = container.querySelector(".bg-gradient-to-b");
      expect(gradientOverlay).toBeInTheDocument();
    });

    it("should have absolute positioning for background layers", () => {
      const { container } = render(<Hero />);
      const absoluteElements = container.querySelectorAll(".absolute.inset-0");
      expect(absoluteElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Container", () => {
    it("should have container class for max-width", () => {
      const { container } = render(<Hero />);
      const containerEl = container.querySelector(".container");
      expect(containerEl).toBeInTheDocument();
    });

    it("should have z-10 for proper layering above background", () => {
      const { container } = render(<Hero />);
      const content = container.querySelector(".z-10");
      expect(content).toBeInTheDocument();
    });

    it("should have horizontal padding", () => {
      const { container } = render(<Hero />);
      const contentContainer = container.querySelector(".px-6");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should have vertical padding", () => {
      const { container } = render(<Hero />);
      const contentContainer = container.querySelector(".py-20");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have alt text for logo image", () => {
      render(<Hero />);
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toBeInTheDocument();
    });

    it("should use semantic section element", () => {
      const { container } = render(<Hero />);
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });
  });
});
