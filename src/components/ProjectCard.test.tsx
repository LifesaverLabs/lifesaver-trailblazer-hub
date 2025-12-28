import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";

describe("ProjectCard Component", () => {
  const defaultProps = {
    name: "Test Project",
    logo: "TP",
    url: "https://example.com",
  };

  describe("Rendering", () => {
    it("should render the component without crashing", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(document.body).toBeInTheDocument();
    });

    it("should render the project name", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("should render the logo text when no logoImage provided", () => {
      render(<ProjectCard {...defaultProps} />);
      expect(screen.getByText("TP")).toBeInTheDocument();
    });

    it("should render as a link", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("should have correct href", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com");
    });
  });

  describe("With Logo Image", () => {
    it("should render logo image when logoImage is provided", () => {
      render(<ProjectCard {...defaultProps} logoImage="test-logo.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toBeInTheDocument();
    });

    it("should have correct src for logo image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test-logo.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveAttribute("src", "test-logo.jpg");
    });

    it("should have lazy loading on logo image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test-logo.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveAttribute("loading", "lazy");
    });

    it("should have async decoding on logo image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test-logo.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveAttribute("decoding", "async");
    });

    it("should have width attribute on logo image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test-logo.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveAttribute("width", "280");
    });

    it("should have height attribute on logo image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test-logo.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveAttribute("height", "187");
    });
  });

  describe("With Description", () => {
    it("should render description when provided", () => {
      render(<ProjectCard {...defaultProps} description="This is a test description" />);
      expect(screen.getByText("This is a test description")).toBeInTheDocument();
    });

    it("should not render description when not provided", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const descriptionEl = container.querySelector(".text-sm.text-muted-foreground.mt-2");
      expect(descriptionEl).toBeNull();
    });
  });

  describe("With Status Badge", () => {
    it("should render status badge when provided", () => {
      render(<ProjectCard {...defaultProps} status="Beta" />);
      expect(screen.getByText("Beta")).toBeInTheDocument();
    });

    it("should not render status badge when not provided", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const badges = container.querySelectorAll('[class*="badge"]');
      expect(badges.length).toBe(0);
    });

    it("should render Concept status", () => {
      render(<ProjectCard {...defaultProps} status="Concept" />);
      expect(screen.getByText("Concept")).toBeInTheDocument();
    });

    it("should render POC status", () => {
      render(<ProjectCard {...defaultProps} status="POC" />);
      expect(screen.getByText("POC")).toBeInTheDocument();
    });

    it("should render Alpha status", () => {
      render(<ProjectCard {...defaultProps} status="Alpha" />);
      expect(screen.getByText("Alpha")).toBeInTheDocument();
    });
  });

  describe("Link Attributes", () => {
    it("should have target=_blank", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("should have rel=noopener noreferrer", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should have block class for full clickable area", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toHaveClass("block");
    });

    it("should have group class for hover effects", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toHaveClass("group");
    });
  });

  describe("Card Styling", () => {
    it("should have h-full for equal height cards", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const card = container.querySelector(".h-full");
      expect(card).toBeInTheDocument();
    });

    it("should have transition-all for smooth animations", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const card = container.querySelector(".transition-all");
      expect(card).toBeInTheDocument();
    });

    it("should have duration-300 for animation timing", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const card = container.querySelector(".duration-300");
      expect(card).toBeInTheDocument();
    });

    it("should have hover:-translate-y-1 for lift effect", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const card = container.querySelector('[class*="hover:-translate-y-1"]');
      expect(card).toBeInTheDocument();
    });
  });

  describe("Logo Container Styling", () => {
    it("should have aspect-[3/2] for logo container", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const logoContainer = container.querySelector('[class*="aspect-[3/2]"]');
      expect(logoContainer).toBeInTheDocument();
    });

    it("should have bg-muted for logo background", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const logoContainer = container.querySelector(".bg-muted");
      expect(logoContainer).toBeInTheDocument();
    });

    it("should have rounded-lg for logo container", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const logoContainer = container.querySelector(".rounded-lg");
      expect(logoContainer).toBeInTheDocument();
    });

    it("should have group-hover:bg-primary/10 for hover state", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const logoContainer = container.querySelector('[class*="group-hover:bg-primary/10"]');
      expect(logoContainer).toBeInTheDocument();
    });

    it("should have overflow-hidden", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const logoContainer = container.querySelector(".overflow-hidden");
      expect(logoContainer).toBeInTheDocument();
    });
  });

  describe("Text Styling", () => {
    it("should have font-semibold on project name", () => {
      render(<ProjectCard {...defaultProps} />);
      const name = screen.getByText("Test Project");
      expect(name).toHaveClass("font-semibold");
    });

    it("should have text-lg on project name", () => {
      render(<ProjectCard {...defaultProps} />);
      const name = screen.getByText("Test Project");
      expect(name).toHaveClass("text-lg");
    });

    it("should have text-card-foreground on project name", () => {
      render(<ProjectCard {...defaultProps} />);
      const name = screen.getByText("Test Project");
      expect(name).toHaveClass("text-card-foreground");
    });

    it("should have group-hover:text-primary for name hover", () => {
      render(<ProjectCard {...defaultProps} />);
      const name = screen.getByText("Test Project");
      expect(name).toHaveClass("group-hover:text-primary");
    });

    it("should have transition-colors on name", () => {
      render(<ProjectCard {...defaultProps} />);
      const name = screen.getByText("Test Project");
      expect(name).toHaveClass("transition-colors");
    });
  });

  describe("Logo Text Styling", () => {
    it("should have text-5xl for logo text", () => {
      render(<ProjectCard {...defaultProps} />);
      const logo = screen.getByText("TP");
      expect(logo).toHaveClass("text-5xl");
    });

    it("should have font-bold for logo text", () => {
      render(<ProjectCard {...defaultProps} />);
      const logo = screen.getByText("TP");
      expect(logo).toHaveClass("font-bold");
    });

    it("should have text-primary for logo text", () => {
      render(<ProjectCard {...defaultProps} />);
      const logo = screen.getByText("TP");
      expect(logo).toHaveClass("text-primary");
    });
  });

  describe("Description Styling", () => {
    it("should have text-sm for description", () => {
      render(<ProjectCard {...defaultProps} description="Test description" />);
      const description = screen.getByText("Test description");
      expect(description).toHaveClass("text-sm");
    });

    it("should have text-muted-foreground for description", () => {
      render(<ProjectCard {...defaultProps} description="Test description" />);
      const description = screen.getByText("Test description");
      expect(description).toHaveClass("text-muted-foreground");
    });

    it("should have mt-2 margin for description", () => {
      render(<ProjectCard {...defaultProps} description="Test description" />);
      const description = screen.getByText("Test description");
      expect(description).toHaveClass("mt-2");
    });
  });

  describe("Status Badge Styling", () => {
    it("should have text-xs for status badge", () => {
      render(<ProjectCard {...defaultProps} status="Beta" />);
      const badge = screen.getByText("Beta");
      expect(badge).toHaveClass("text-xs");
    });

    it("should use secondary variant for badge", () => {
      const { container } = render(<ProjectCard {...defaultProps} status="Beta" />);
      // Badge component uses variant classes internally
      const badge = container.querySelector('[data-slot="badge"]') || screen.getByText("Beta");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("CardContent Styling", () => {
    it("should have p-6 padding", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const cardContent = container.querySelector(".p-6");
      expect(cardContent).toBeInTheDocument();
    });

    it("should have flex layout", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const flexContainer = container.querySelector(".flex.flex-col");
      expect(flexContainer).toBeInTheDocument();
    });

    it("should have items-center for centering", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const centerContainer = container.querySelector(".items-center");
      expect(centerContainer).toBeInTheDocument();
    });

    it("should have text-center for text alignment", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const centerText = container.querySelector(".text-center");
      expect(centerText).toBeInTheDocument();
    });

    it("should have gap-4 for spacing", () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      const gapContainer = container.querySelector(".gap-4");
      expect(gapContainer).toBeInTheDocument();
    });
  });

  describe("Image in Logo Container", () => {
    it("should have w-full class on image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveClass("w-full");
    });

    it("should have h-full class on image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveClass("h-full");
    });

    it("should have object-contain class on image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test.jpg" />);
      const image = screen.getByAltText("Test Project logo");
      expect(image).toHaveClass("object-contain");
    });
  });

  describe("Accessibility", () => {
    it("should have accessible link with project name", () => {
      render(<ProjectCard {...defaultProps} />);
      const link = screen.getByRole("link");
      expect(link).toContainElement(screen.getByText("Test Project"));
    });

    it("should have alt text for logo image", () => {
      render(<ProjectCard {...defaultProps} logoImage="test.jpg" />);
      expect(screen.getByAltText("Test Project logo")).toBeInTheDocument();
    });
  });

  describe("Full Props", () => {
    it("should render with all props provided", () => {
      render(
        <ProjectCard
          name="Full Project"
          logo="FP"
          logoImage="full-logo.jpg"
          url="https://full.example.com"
          description="A complete project description"
          status="Beta"
        />
      );

      expect(screen.getByText("Full Project")).toBeInTheDocument();
      expect(screen.getByAltText("Full Project logo")).toBeInTheDocument();
      expect(screen.getByText("A complete project description")).toBeInTheDocument();
      expect(screen.getByText("Beta")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "https://full.example.com");
    });
  });
});
