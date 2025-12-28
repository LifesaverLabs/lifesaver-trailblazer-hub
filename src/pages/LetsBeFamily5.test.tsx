import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LetsBeFamily5 from "./LetsBeFamily5";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("LetsBeFamily5 Page", () => {
  describe("Hero Section", () => {
    it("should render the page title", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("Come Sit, Let's Be Family⁵")).toBeInTheDocument();
    });

    it("should render the tagline", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(
        screen.getByText(
          "Turning restaurant tables into bridges between strangers, one conversation at a time."
        )
      ).toBeInTheDocument();
    });

    it("should render the subtitle", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(
        screen.getByText("Because every meal shared could be the start of a beautiful friendship.")
      ).toBeInTheDocument();
    });

    it("should render the Family5 logo", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByAltText("Come Sit, Let's Be Family⁵")).toBeInTheDocument();
    });

    it("should render back button link", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("Back to Lifesaver Labs")).toBeInTheDocument();
    });

    it("should have back button that links to home", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const backLink = screen.getByText("Back to Lifesaver Labs").closest("a");
      expect(backLink).toHaveAttribute("href", "/");
    });
  });

  describe("Loneliness Epidemic Section", () => {
    it("should render the section header", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("The Loneliness We Can Fix")).toBeInTheDocument();
    });

    it("should reference Bowling Alone", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const bowlingAloneRefs = screen.getAllByText(/Bowling Alone/);
      expect(bowlingAloneRefs.length).toBeGreaterThan(0);
    });

    it("should mention Robert Putnam", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Robert Putnam/)).toBeInTheDocument();
    });

    it("should mention health impact comparison", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/15 cigarettes a day/)).toBeInTheDocument();
    });

    it("should render the invitation quote", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(
        screen.getByText(/We're open. We welcome conversation. Come sit, let's be Family⁵./)
      ).toBeInTheDocument();
    });
  });

  describe("Table Tent Vision Section", () => {
    it("should render the section header", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("The Table Tent Revolution")).toBeInTheDocument();
    });

    it("should render instructions for diners", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("For Diners & Café Patrons")).toBeInTheDocument();
    });

    it("should render instructions for restaurant owners", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("For Restaurant & Café Owners")).toBeInTheDocument();
    });

    it("should mention downloading designs", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Download a design you love/)).toBeInTheDocument();
    });

    it("should mention printing on cardstock", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const cardstockRefs = screen.getAllByText(/cardstock/i);
      expect(cardstockRefs.length).toBeGreaterThan(0);
    });

    it("should mention kabillion meals", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/kabillion restaurant meals/)).toBeInTheDocument();
    });
  });

  describe("Downloads Section", () => {
    it("should render the section header", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("Download & Print")).toBeInTheDocument();
    });

    it("should render Big Ideas table tent card", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Big Ideas & Life Models/)).toBeInTheDocument();
    });

    it("should show version for Big Ideas table tent", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("v0.0.5")).toBeInTheDocument();
    });

    it("should render Kome Sit tablet display card", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const komeSitRefs = screen.getAllByText(/Kome Sit/i);
      expect(komeSitRefs.length).toBeGreaterThan(0);
    });

    it("should show version for Kome Sit display", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const v003Refs = screen.getAllByText("v0.0.3");
      expect(v003Refs.length).toBeGreaterThan(0);
    });

    it("should render Heads Down Mode display card", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Heads Down Mode/)).toBeInTheDocument();
    });

    it("should have download PDF link", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const downloadLink = screen.getByRole("link", { name: /Download PDF/i });
      expect(downloadLink).toHaveAttribute("href", "/downloads/come-sit-table-tent-with-qr.pdf");
    });

    it("should have tablet display link for Kome Sit", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const links = screen.getAllByRole("link", { name: /Open Tablet Display/i });
      const komeSitLink = links.find(
        (link) => link.getAttribute("href") === "/downloads/kome-sit-tablet-display.html"
      );
      expect(komeSitLink).toBeInTheDocument();
    });

    it("should have tablet display link for Heads Down", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const links = screen.getAllByRole("link", { name: /Open Heads Down Display/i });
      const headsDownLink = links.find(
        (link) => link.getAttribute("href") === "/downloads/lifesaver-heads-down-display.html"
      );
      expect(headsDownLink).toBeInTheDocument();
    });

    it("should show pro tip about cardstock", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Pro tip:/)).toBeInTheDocument();
      expect(screen.getByText(/laminate for durability/)).toBeInTheDocument();
    });
  });

  describe("Kome Sit Slide Descriptions (v0.0.3)", () => {
    it("should show slide 1 description", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Come Sit With Me. This table is open./)).toBeInTheDocument();
    });

    it("should show slide 2 description", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/On the Menu: Life Models, Big Ideas.../)).toBeInTheDocument();
    });

    it("should show slide 3 description", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Kome Sit With Me, Kousin./)).toBeInTheDocument();
    });

    it("should show slide 4 description", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Pardon the Spelling/)).toBeInTheDocument();
      expect(screen.getByText(/Blesséd Dialekt intro/)).toBeInTheDocument();
    });

    it("should show slide 5 description", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Why the change\?/)).toBeInTheDocument();
      expect(screen.getByText(/EnoughIsEnuf.org/)).toBeInTheDocument();
    });

    it("should indicate 5 slides and rotation timing", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("5 slides · Rotates every 2′18″")).toBeInTheDocument();
    });
  });

  describe("Creative Commons Section", () => {
    it("should render the section header", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("Free to Remix & Share")).toBeInTheDocument();
    });

    it("should mention CC0 license", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/CC0 1.0 Universal/)).toBeInTheDocument();
    });

    it("should list usage rights", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("✓ Use for any purpose")).toBeInTheDocument();
      expect(screen.getByText("✓ Modify and adapt freely")).toBeInTheDocument();
      expect(screen.getByText("✓ No attribution required")).toBeInTheDocument();
      expect(screen.getByText("✓ Commercial use welcome")).toBeInTheDocument();
    });

    it("should encourage branching", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("Branch, Create, Share Back")).toBeInTheDocument();
    });

    it("should have contact email", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const emailRefs = screen.getAllByText(/team@lifesaverlabs.org/);
      expect(emailRefs.length).toBeGreaterThan(0);
    });
  });

  describe("Call to Action Section", () => {
    it("should render the section header", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("A Message to Social Spaces Everywhere")).toBeInTheDocument();
    });

    it("should address various venues", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Restaurant and café owners/)).toBeInTheDocument();
      expect(screen.getByText(/pub keepers/)).toBeInTheDocument();
      expect(screen.getByText(/co-working spaces/)).toBeInTheDocument();
    });

    it("should mention community service", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/You're not just serving food—you're serving community/)).toBeInTheDocument();
    });
  });

  describe("Final Section", () => {
    it("should render Hebrew quote (Psalm 133:1)", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/הִנֵּה מַה־טּוֹב/)).toBeInTheDocument();
    });

    it("should render English translation of psalm", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Behold, how good and how pleasant/)).toBeInTheDocument();
    });

    it("should cite Psalm 133:1", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/Psalm 133:1/)).toBeInTheDocument();
    });

    it("should reference Bowling Alone again", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const bowlingAloneRefs = screen.getAllByText(/Bowling Alone/);
      expect(bowlingAloneRefs.length).toBeGreaterThan(0);
    });

    it("should have Sitting Together call to action", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("Sitting Together")).toBeInTheDocument();
    });

    it("should end with family invitation", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("Come sit. Let's be Family⁵.")).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    it("should render the footer", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText(/First, do no harm/)).toBeInTheDocument();
    });
  });

  describe("Preview Card Content", () => {
    it("should show table tent preview image", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(
        screen.getByAltText("Big Ideas & Life Models - Table Tent Preview")
      ).toBeInTheDocument();
    });

    it("should show preview card for Kome Sit display", () => {
      renderWithRouter(<LetsBeFamily5 />);
      // The preview card shows a simplified version
      const previewTexts = screen.getAllByText("Come Sit With Me.");
      expect(previewTexts.length).toBeGreaterThan(0);
    });

    it("should show preview card for Heads Down display", () => {
      renderWithRouter(<LetsBeFamily5 />);
      expect(screen.getByText("HEADS DOWN")).toBeInTheDocument();
      expect(screen.getByText("Deep Work Mode")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveTextContent("Come Sit, Let's Be Family⁵");
    });

    it("should have multiple h2 section headers", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const h2s = screen.getAllByRole("heading", { level: 2 });
      expect(h2s.length).toBeGreaterThanOrEqual(5);
    });

    it("should have accessible download links", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const downloadButton = screen.getByRole("link", { name: /Download PDF/i });
      expect(downloadButton).toBeInTheDocument();
    });

    it("should have accessible tablet display links", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const tabletButtons = screen.getAllByRole("link", { name: /Open (Tablet|Heads Down) Display/i });
      expect(tabletButtons.length).toBe(2);
    });
  });

  describe("External Links", () => {
    it("should open tablet displays in new tab", () => {
      renderWithRouter(<LetsBeFamily5 />);
      const tabletLinks = screen.getAllByRole("link", { name: /Open (Tablet|Heads Down) Display/i });
      tabletLinks.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });
});
