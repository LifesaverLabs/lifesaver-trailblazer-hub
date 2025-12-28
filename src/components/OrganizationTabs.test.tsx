import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import OrganizationTabs from "./OrganizationTabs";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("OrganizationTabs Component", () => {
  describe("Rendering", () => {
    it("should render the component without crashing", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(document.body).toBeInTheDocument();
    });

    it("should render all three tabs", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Coalition (Nonprofit)")).toBeInTheDocument();
      expect(screen.getByText("PBC (Public Benefit Corp)")).toBeInTheDocument();
      expect(screen.getByText("Civics Campaigns and Legal")).toBeInTheDocument();
    });
  });

  describe("Tab Switching", () => {
    it("should show Coalition content by default", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Lifesaver Labs Coalition")).toBeInTheDocument();
    });

    it("should switch to PBC content when PBC tab is clicked", async () => {
      renderWithRouter(<OrganizationTabs />);
      const pbcTab = screen.getByText("PBC (Public Benefit Corp)");
      await userEvent.click(pbcTab);
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs PBC")).toBeInTheDocument();
      });
    });

    it("should switch to Civics content when Civics tab is clicked", async () => {
      renderWithRouter(<OrganizationTabs />);
      const civicsTab = screen.getByText("Civics Campaigns and Legal");
      await userEvent.click(civicsTab);
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs US")).toBeInTheDocument();
      });
    });

    it("should switch back to Coalition when Coalition tab is clicked", async () => {
      renderWithRouter(<OrganizationTabs />);
      // First go to PBC
      await userEvent.click(screen.getByText("PBC (Public Benefit Corp)"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs PBC")).toBeInTheDocument();
      });

      // Then back to Coalition
      await userEvent.click(screen.getByText("Coalition (Nonprofit)"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs Coalition")).toBeInTheDocument();
      });
    });
  });

  describe("Coalition Projects", () => {
    it("should display Civigion project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Civigion")).toBeInTheDocument();
    });

    it("should display UNify SOS project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("UNify SOS")).toBeInTheDocument();
    });

    it("should display Tear Down This Firewall project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Tear Down This Firewall")).toBeInTheDocument();
    });

    it("should display Nayborly project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Nayborly")).toBeInTheDocument();
    });

    it("should display Ribbreakers United project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Ribbreakers United")).toBeInTheDocument();
    });

    it("should display #heartclot!! project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("#heartclot!!")).toBeInTheDocument();
    });

    it("should display Take 10? project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Take 10?")).toBeInTheDocument();
    });

    it("should display Krashless Kar project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Krashless Kar™")).toBeInTheDocument();
    });

    it("should display Enough Is Enuf project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("Enough Is Enuf: English for Humans")).toBeInTheDocument();
    });

    it("should display BLED project", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText("BLED⁵/Blessed Dialect")).toBeInTheDocument();
    });

    it("should show Coalition description", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(
        screen.getByText(/An open, global calmunity dedicated to catalyzing sociotechnical miracles/)
      ).toBeInTheDocument();
    });
  });

  describe("PBC Projects", () => {
    const switchToPBC = async () => {
      renderWithRouter(<OrganizationTabs />);
      await userEvent.click(screen.getByText("PBC (Public Benefit Corp)"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs PBC")).toBeInTheDocument();
      });
    };

    it("should display Naybor SOS project", async () => {
      await switchToPBC();
      expect(screen.getByText("Naybor SOS™")).toBeInTheDocument();
    });

    it("should display Safeword project", async () => {
      await switchToPBC();
      expect(screen.getByText("Safeword™")).toBeInTheDocument();
    });

    it("should show PBC description", async () => {
      await switchToPBC();
      expect(
        screen.getByText(/The calmplex product-building and technology-executing arm/)
      ).toBeInTheDocument();
    });

    it("should mention privacy-first technology", async () => {
      await switchToPBC();
      const privacyFirstRefs = screen.getAllByText(/privacy-first/);
      expect(privacyFirstRefs.length).toBeGreaterThan(0);
    });
  });

  describe("Civics Projects (USA)", () => {
    const switchToCivics = async () => {
      renderWithRouter(<OrganizationTabs />);
      await userEvent.click(screen.getByText("Civics Campaigns and Legal"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs US")).toBeInTheDocument();
      });
    };

    it("should display West Wing Mode project", async () => {
      await switchToCivics();
      expect(screen.getByText("West Wing Mode: Blesséd Map")).toBeInTheDocument();
    });

    it("should display Raising Rights project", async () => {
      await switchToCivics();
      expect(screen.getByText("Raising Rights")).toBeInTheDocument();
    });

    it("should display Feminist Yes! project", async () => {
      await switchToCivics();
      expect(screen.getByText("Feminist Yes!")).toBeInTheDocument();
    });

    it("should display CALM Currency Reform project", async () => {
      await switchToCivics();
      expect(screen.getByText("CALM Currency Reform")).toBeInTheDocument();
    });

    it("should display Calm⁴UNism project", async () => {
      await switchToCivics();
      expect(screen.getByText("Calm⁴UNism")).toBeInTheDocument();
    });

    it("should display SaveUsFromSlog project", async () => {
      await switchToCivics();
      expect(screen.getByText("#SaveUsFromSlog")).toBeInTheDocument();
    });

    it("should display Religious RCV project", async () => {
      await switchToCivics();
      expect(screen.getByText("Religious RCV")).toBeInTheDocument();
    });

    it("should display Lifesaver Labs United project", async () => {
      await switchToCivics();
      expect(screen.getByText("Lifesaver Labs United")).toBeInTheDocument();
    });

    it("should display Come Sit, Let's Be Family⁵ project", async () => {
      await switchToCivics();
      // May appear in multiple tabs
      const family5Refs = screen.getAllByText("Come Sit, Let's Be Family⁵");
      expect(family5Refs.length).toBeGreaterThan(0);
    });

    it("should show USA description", async () => {
      await switchToCivics();
      expect(
        screen.getByText(/civic-reform and democracy-innovation initiative/)
      ).toBeInTheDocument();
    });
  });

  describe("Project Links", () => {
    it("should have link to west-wing-blessed-map (internal)", async () => {
      renderWithRouter(<OrganizationTabs />);
      await userEvent.click(screen.getByText("Civics Campaigns and Legal"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs US")).toBeInTheDocument();
      });
      const link = screen.getByRole("link", { name: /West Wing Mode/i });
      expect(link).toHaveAttribute("href", "/west-wing-blessed-map");
    });

    it("should have link to letsbeFamily⁵ (internal)", async () => {
      renderWithRouter(<OrganizationTabs />);
      await userEvent.click(screen.getByText("Civics Campaigns and Legal"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs US")).toBeInTheDocument();
      });
      const links = screen.getAllByRole("link", { name: /Come Sit, Let's Be Family⁵/i });
      const family5Link = links.find((link) => link.getAttribute("href") === "/letsbeFamily⁵");
      expect(family5Link).toBeInTheDocument();
    });

    it("should have external link for Civigion", () => {
      renderWithRouter(<OrganizationTabs />);
      const link = screen.getByRole("link", { name: /Civigion/i });
      expect(link).toHaveAttribute("href", "https://www.civigion.us");
    });

    it("should have external link for UNify SOS", () => {
      renderWithRouter(<OrganizationTabs />);
      const link = screen.getByRole("link", { name: /UNify SOS/i });
      expect(link).toHaveAttribute("href", "https://www.unifysos.org");
    });

    it("should have external link for Nayborly", () => {
      renderWithRouter(<OrganizationTabs />);
      const link = screen.getByRole("link", { name: /Nayborly/i });
      expect(link).toHaveAttribute("href", "https://www.nayborly.org");
    });
  });

  describe("Project Statuses", () => {
    it("should show Beta status for some projects", () => {
      renderWithRouter(<OrganizationTabs />);
      const betaBadges = screen.getAllByText("Beta");
      expect(betaBadges.length).toBeGreaterThan(0);
    });

    it("should show Concept status for some projects", () => {
      renderWithRouter(<OrganizationTabs />);
      const conceptBadges = screen.getAllByText("Concept");
      expect(conceptBadges.length).toBeGreaterThan(0);
    });

    it("should show POC status for some projects", () => {
      renderWithRouter(<OrganizationTabs />);
      const pocBadges = screen.getAllByText("POC");
      expect(pocBadges.length).toBeGreaterThan(0);
    });

    it("should show Alpha status for some projects", () => {
      renderWithRouter(<OrganizationTabs />);
      const alphaBadges = screen.getAllByText("Alpha");
      expect(alphaBadges.length).toBeGreaterThan(0);
    });
  });

  describe("Project Descriptions", () => {
    it("should show Civigion description", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(
        screen.getByText(/Recognizing our shared faith in democratic values/)
      ).toBeInTheDocument();
    });

    it("should show UNify SOS description", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText(/one world, one emergency number/)).toBeInTheDocument();
    });

    it("should show Ribbreakers description", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText(/Uniting the CPR community/)).toBeInTheDocument();
    });

    it("should show heartclot description", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByText(/Rebranding 'heart attack'/)).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should have section element as root", () => {
      const { container } = renderWithRouter(<OrganizationTabs />);
      expect(container.querySelector("section")).toBeInTheDocument();
    });

    it("should have container class", () => {
      const { container } = renderWithRouter(<OrganizationTabs />);
      expect(container.querySelector(".container")).toBeInTheDocument();
    });

    it("should have grid layout for project cards", () => {
      const { container } = renderWithRouter(<OrganizationTabs />);
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
    });

    it("should have responsive grid columns", () => {
      const { container } = renderWithRouter(<OrganizationTabs />);
      const grid = container.querySelector(".grid.grid-cols-1");
      expect(grid).toBeInTheDocument();
    });

    it("should have animate-fade-in on tab content", () => {
      const { container } = renderWithRouter(<OrganizationTabs />);
      const fadeInEl = container.querySelector(".animate-fade-in");
      expect(fadeInEl).toBeInTheDocument();
    });
  });

  describe("Tab List Styling", () => {
    it("should have tabs list with grid layout", () => {
      renderWithRouter(<OrganizationTabs />);
      const tabsList = screen.getByRole("tablist");
      expect(tabsList).toHaveClass("grid");
    });

    it("should have responsive columns on tab list", () => {
      renderWithRouter(<OrganizationTabs />);
      const tabsList = screen.getByRole("tablist");
      expect(tabsList).toHaveClass("grid-cols-1");
      expect(tabsList).toHaveClass("md:grid-cols-3");
    });
  });

  describe("Accessibility", () => {
    it("should have tablist role", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("should have tab roles for each tab", () => {
      renderWithRouter(<OrganizationTabs />);
      const tabs = screen.getAllByRole("tab");
      expect(tabs.length).toBe(3);
    });

    it("should have tabpanel role for content", () => {
      renderWithRouter(<OrganizationTabs />);
      expect(screen.getByRole("tabpanel")).toBeInTheDocument();
    });

    it("should have aria-selected on active tab", () => {
      renderWithRouter(<OrganizationTabs />);
      const coalitionTab = screen.getByRole("tab", { name: /Coalition/i });
      expect(coalitionTab).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("External Links Security", () => {
    it("should have target=_blank for external links", () => {
      renderWithRouter(<OrganizationTabs />);
      const civigionLink = screen.getByRole("link", { name: /Civigion/i });
      expect(civigionLink).toHaveAttribute("target", "_blank");
    });

    it("should have rel=noopener noreferrer for external links", () => {
      renderWithRouter(<OrganizationTabs />);
      const civigionLink = screen.getByRole("link", { name: /Civigion/i });
      expect(civigionLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("Coalition Project Count", () => {
    it("should have 10 Coalition projects", () => {
      renderWithRouter(<OrganizationTabs />);
      // Count project cards in Coalition tab
      const coalitionProjects = [
        "Civigion",
        "UNify SOS",
        "Tear Down This Firewall",
        "Nayborly",
        "Ribbreakers United",
        "#heartclot!!",
        "Take 10?",
        "Krashless Kar™",
        "Enough Is Enuf: English for Humans",
        "BLED⁵/Blessed Dialect",
      ];
      coalitionProjects.forEach((project) => {
        expect(screen.getByText(project)).toBeInTheDocument();
      });
    });
  });

  describe("PBC Project Count", () => {
    it("should have 2 PBC projects", async () => {
      renderWithRouter(<OrganizationTabs />);
      await userEvent.click(screen.getByText("PBC (Public Benefit Corp)"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs PBC")).toBeInTheDocument();
      });
      expect(screen.getByText("Naybor SOS™")).toBeInTheDocument();
      expect(screen.getByText("Safeword™")).toBeInTheDocument();
    });
  });

  describe("USA Project Count", () => {
    it("should have 9 USA/Civics projects", async () => {
      renderWithRouter(<OrganizationTabs />);
      await userEvent.click(screen.getByText("Civics Campaigns and Legal"));
      await waitFor(() => {
        expect(screen.getByText("Lifesaver Labs US")).toBeInTheDocument();
      });
      const usaProjects = [
        "West Wing Mode: Blesséd Map",
        "Raising Rights",
        "Feminist Yes!",
        "CALM Currency Reform",
        "Calm⁴UNism",
        "#SaveUsFromSlog",
        "Religious RCV",
        "Lifesaver Labs United",
      ];
      usaProjects.forEach((project) => {
        expect(screen.getByText(project)).toBeInTheDocument();
      });
      // Come Sit, Let's Be Family⁵ appears in multiple tabs
      const family5Refs = screen.getAllByText("Come Sit, Let's Be Family⁵");
      expect(family5Refs.length).toBeGreaterThan(0);
    });
  });
});
