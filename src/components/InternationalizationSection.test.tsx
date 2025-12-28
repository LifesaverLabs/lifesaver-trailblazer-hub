import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InternationalizationSection from "./InternationalizationSection";

describe("InternationalizationSection Component", () => {
  describe("Rendering", () => {
    it("should render the component without crashing", () => {
      render(<InternationalizationSection />);
      expect(document.body).toBeInTheDocument();
    });

    it("should render the section heading", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText("Internationalization")).toBeInTheDocument();
    });
  });

  describe("Content", () => {
    it("should mention hybridize and localize", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/hybridize and localize/)).toBeInTheDocument();
    });

    it("should mention super-happy to share", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/super-happy to share/)).toBeInTheDocument();
    });

    it("should mention Krashless Kar", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/Krashless Kar/)).toBeInTheDocument();
    });

    it("should mention Raising Rights", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/Raising Rights/)).toBeInTheDocument();
    });

    it("should mention outpacing Us", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/Perhaps you'll even end up outpacing Us/)).toBeInTheDocument();
    });

    it("should mention broader impact", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/broader impact/)).toBeInTheDocument();
    });

    it("should mention local or national context", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/local or national context/)).toBeInTheDocument();
    });

    it("should mention each culture", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText(/uniquely for each culture/)).toBeInTheDocument();
    });
  });

  describe("Bottom Icons", () => {
    it("should display Collaborate label", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText("Collaborate")).toBeInTheDocument();
    });

    it("should display Share Freely label", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText("Share Freely")).toBeInTheDocument();
    });

    it("should display Localize label", () => {
      render(<InternationalizationSection />);
      expect(screen.getByText("Localize")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have section element as root", () => {
      const { container } = render(<InternationalizationSection />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have muted background", () => {
      const { container } = render(<InternationalizationSection />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-muted/30");
    });

    it("should have vertical padding", () => {
      const { container } = render(<InternationalizationSection />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("py-20");
    });

    it("should have horizontal padding", () => {
      const { container } = render(<InternationalizationSection />);
      const section = container.querySelector("section");
      expect(section).toHaveClass("px-4");
    });

    it("should have centered container", () => {
      const { container } = render(<InternationalizationSection />);
      const innerContainer = container.querySelector(".container.mx-auto");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should have max-w-4xl for content width", () => {
      const { container } = render(<InternationalizationSection />);
      const innerContainer = container.querySelector(".max-w-4xl");
      expect(innerContainer).toBeInTheDocument();
    });

    it("should have text-center class", () => {
      const { container } = render(<InternationalizationSection />);
      const centerContainer = container.querySelector(".text-center");
      expect(centerContainer).toBeInTheDocument();
    });
  });

  describe("Globe Icon", () => {
    it("should have centered icon container", () => {
      const { container } = render(<InternationalizationSection />);
      const iconContainer = container.querySelector(".flex.justify-center.mb-6");
      expect(iconContainer).toBeInTheDocument();
    });

    it("should render Globe icon", () => {
      const { container } = render(<InternationalizationSection />);
      const svgs = container.querySelectorAll("svg");
      // Should have at least 3 icons (main Globe + 3 bottom icons)
      expect(svgs.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("Typography", () => {
    it("should have heading with correct classes", () => {
      render(<InternationalizationSection />);
      const heading = screen.getByRole("heading", { name: "Internationalization" });
      expect(heading).toHaveClass("text-3xl");
      expect(heading).toHaveClass("md:text-4xl");
      expect(heading).toHaveClass("font-bold");
    });

    it("should have paragraph text with lg size", () => {
      const { container } = render(<InternationalizationSection />);
      const paragraphs = container.querySelector(".text-lg");
      expect(paragraphs).toBeInTheDocument();
    });

    it("should have muted foreground color for text", () => {
      const { container } = render(<InternationalizationSection />);
      const mutedText = container.querySelector(".text-muted-foreground");
      expect(mutedText).toBeInTheDocument();
    });

    it("should have relaxed line height", () => {
      const { container } = render(<InternationalizationSection />);
      const relaxedText = container.querySelector(".leading-relaxed");
      expect(relaxedText).toBeInTheDocument();
    });
  });

  describe("Bottom Icons Layout", () => {
    it("should have flex layout for icons", () => {
      const { container } = render(<InternationalizationSection />);
      const iconsContainer = container.querySelector(".flex.justify-center.gap-8");
      expect(iconsContainer).toBeInTheDocument();
    });

    it("should have mt-10 margin for icons section", () => {
      const { container } = render(<InternationalizationSection />);
      const iconsContainer = container.querySelector(".mt-10");
      expect(iconsContainer).toBeInTheDocument();
    });

    it("should have items-center for icon alignment", () => {
      const { container } = render(<InternationalizationSection />);
      const iconItems = container.querySelectorAll(".flex.items-center.gap-2");
      expect(iconItems.length).toBe(3);
    });

    it("should have text-sm for icon labels", () => {
      render(<InternationalizationSection />);
      const collaborate = screen.getByText("Collaborate");
      expect(collaborate).toHaveClass("text-sm");
    });
  });

  describe("Highlighted Text", () => {
    it("should have font-medium for hybridize and localize", () => {
      render(<InternationalizationSection />);
      const hybridizeText = screen.getByText(/hybridize and localize/);
      expect(hybridizeText).toHaveClass("font-medium");
    });

    it("should have text-foreground for emphasized text", () => {
      render(<InternationalizationSection />);
      const hybridizeText = screen.getByText(/hybridize and localize/);
      expect(hybridizeText).toHaveClass("text-foreground");
    });

    it("should have font-medium and text-primary for super-happy", () => {
      render(<InternationalizationSection />);
      const superHappyText = screen.getByText(/super-happy to share/);
      expect(superHappyText).toHaveClass("font-medium");
      expect(superHappyText).toHaveClass("text-primary");
    });
  });

  describe("Italic Text", () => {
    it("should have italic text for outpacing quote", () => {
      render(<InternationalizationSection />);
      const italicText = screen.getByText(/Perhaps you'll even end up outpacing Us/);
      expect(italicText).toHaveClass("italic");
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const { container } = render(<InternationalizationSection />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have heading with proper level", () => {
      render(<InternationalizationSection />);
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Internationalization");
    });
  });

  describe("Icon Colors", () => {
    it("should have text-primary class on main Globe icon", () => {
      const { container } = render(<InternationalizationSection />);
      const primaryIcons = container.querySelectorAll(".text-primary");
      expect(primaryIcons.length).toBeGreaterThan(0);
    });

    it("should have muted color for bottom icon section", () => {
      const { container } = render(<InternationalizationSection />);
      const mutedSection = container.querySelector(".text-muted-foreground.mt-10");
      expect(mutedSection).toBeInTheDocument();
    });
  });

  describe("Content Spacing", () => {
    it("should have space-y-6 for paragraph spacing", () => {
      const { container } = render(<InternationalizationSection />);
      const spacedContent = container.querySelector(".space-y-6");
      expect(spacedContent).toBeInTheDocument();
    });

    it("should have mb-6 for heading margin", () => {
      render(<InternationalizationSection />);
      const heading = screen.getByRole("heading", { name: "Internationalization" });
      expect(heading).toHaveClass("mb-6");
    });
  });
});
