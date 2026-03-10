import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DialectProvider } from "@/contexts/DialectContext";
import Hero from "./Hero";

const renderHero = () => render(<DialectProvider><Hero /></DialectProvider>);

describe("Hero Component", () => {
  describe("Rendering", () => {
    it("should render the component without crashing", () => {
      renderHero();
      expect(document.body).toBeInTheDocument();
    });

    it("should render the Lifesaver Labs logo", () => {
      renderHero();
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toBeInTheDocument();
    });

    it("should have proper image attributes for logo", () => {
      renderHero();
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveAttribute("fetchPriority", "high");
      expect(logo).toHaveAttribute("decoding", "async");
      expect(logo).toHaveAttribute("width", "448");
      expect(logo).toHaveAttribute("height", "448");
    });

    it("should render the mission statement", () => {
      renderHero();
      expect(
        screen.getByText(
          /We don't just save lives—we redesign and reinvent the systems that put them at risk/
        )
      ).toBeInTheDocument();
    });

    it("should render the Vision Zero reference", () => {
      renderHero();
      expect(screen.getByText(/Vision Zero vote/)).toBeInTheDocument();
    });

    it("should render the grandchildren quote", () => {
      renderHero();
      expect(screen.getByText(/grandchildren will inherit/)).toBeInTheDocument();
    });

    it("should render courage vs complacency message", () => {
      renderHero();
      expect(screen.getByText(/kourage or our komplacency/)).toBeInTheDocument();
    });
  });

  describe("Content", () => {
    it("should mention public health and democracy", () => {
      renderHero();
      expect(screen.getByText(/Publik health is demokracy in praktice/)).toBeInTheDocument();
    });

    it("should mention miracles", () => {
      renderHero();
      expect(screen.getByText(/mirakles we're building together/)).toBeInTheDocument();
    });

    it("should reference making no little plans", () => {
      renderHero();
      expect(screen.getByText(/Make no little plans/)).toBeInTheDocument();
    });

    it("should reference systems that shape generations", () => {
      renderHero();
      expect(screen.getByText(/systems that shape generations/)).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have section element as root", () => {
      const { container } = renderHero();
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have relative positioning for layering", () => {
      const { container } = renderHero();
      const section = container.querySelector("section");
      expect(section).toHaveClass("relative");
    });

    it("should have min-height for hero section", () => {
      const { container } = renderHero();
      const section = container.querySelector("section");
      expect(section).toHaveClass("min-h-[70vh]");
    });

    it("should have centered content", () => {
      const { container } = renderHero();
      const section = container.querySelector("section");
      expect(section).toHaveClass("flex");
      expect(section).toHaveClass("items-center");
      expect(section).toHaveClass("justify-center");
    });

    it("should have overflow hidden for background", () => {
      const { container } = renderHero();
      const section = container.querySelector("section");
      expect(section).toHaveClass("overflow-hidden");
    });

    it("should have fade-in animation class", () => {
      const { container } = renderHero();
      const contentContainer = container.querySelector(".animate-fade-in");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should have text centered", () => {
      const { container } = renderHero();
      const contentContainer = container.querySelector(".text-center");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Logo Styling", () => {
    it("should have responsive width classes", () => {
      renderHero();
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("w-72");
      expect(logo).toHaveClass("md:w-96");
      expect(logo).toHaveClass("lg:w-[28rem]");
    });

    it("should be centered horizontally", () => {
      renderHero();
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("mx-auto");
    });

    it("should have drop shadow", () => {
      renderHero();
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("drop-shadow-lg");
    });

    it("should have bottom margin", () => {
      renderHero();
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toHaveClass("mb-8");
    });
  });

  describe("Typography", () => {
    it("should have primary statement with larger text", () => {
      renderHero();
      const primaryText = screen
        .getByText(/We don't just save lives/)
        .closest("p");
      expect(primaryText).toHaveClass("text-xl");
      expect(primaryText).toHaveClass("md:text-2xl");
    });

    it("should have secondary statement with slightly smaller text", () => {
      renderHero();
      const secondaryText = screen.getByText(/Make no little plans/).closest("p");
      expect(secondaryText).toHaveClass("text-lg");
      expect(secondaryText).toHaveClass("md:text-xl");
    });

    it("should have font-medium on primary statement", () => {
      renderHero();
      const primaryText = screen
        .getByText(/We don't just save lives/)
        .closest("p");
      expect(primaryText).toHaveClass("font-medium");
    });
  });

  describe("Background", () => {
    it("should have background image container", () => {
      const { container } = renderHero();
      const bgContainer = container.querySelector(".bg-cover.bg-center");
      expect(bgContainer).toBeInTheDocument();
    });

    it("should have gradient overlay", () => {
      const { container } = renderHero();
      const gradientOverlay = container.querySelector(".bg-gradient-to-b");
      expect(gradientOverlay).toBeInTheDocument();
    });

    it("should have absolute positioning for background layers", () => {
      const { container } = renderHero();
      const absoluteElements = container.querySelectorAll(".absolute.inset-0");
      expect(absoluteElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("Container", () => {
    it("should have container class for max-width", () => {
      const { container } = renderHero();
      const containerEl = container.querySelector(".container");
      expect(containerEl).toBeInTheDocument();
    });

    it("should have z-10 for proper layering above background", () => {
      const { container } = renderHero();
      const content = container.querySelector(".z-10");
      expect(content).toBeInTheDocument();
    });

    it("should have horizontal padding", () => {
      const { container } = renderHero();
      const contentContainer = container.querySelector(".px-6");
      expect(contentContainer).toBeInTheDocument();
    });

    it("should have vertical padding", () => {
      const { container } = renderHero();
      const contentContainer = container.querySelector(".py-20");
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have alt text for logo image", () => {
      renderHero();
      const logo = screen.getByAltText("Lifesaver Labs");
      expect(logo).toBeInTheDocument();
    });

    it("should use semantic section element", () => {
      const { container } = renderHero();
      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });
  });
});
