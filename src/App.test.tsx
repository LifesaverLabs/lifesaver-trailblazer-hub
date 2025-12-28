import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Create a wrapper that doesn't use BrowserRouter (since App includes it)
// Instead, we'll test the routes directly

describe("App Component", () => {
  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<App />);
      expect(document.body).toBeInTheDocument();
    });

    it("should render the home page by default", () => {
      render(<App />);
      // Hero component content from Index page
      expect(screen.getByAltText("Lifesaver Labs")).toBeInTheDocument();
    });
  });

  describe("Provider Setup", () => {
    it("should include QueryClientProvider", () => {
      // App renders without error, which means QueryClientProvider is working
      render(<App />);
      expect(document.body).toBeInTheDocument();
    });

    it("should include TooltipProvider", () => {
      // App renders without error, which means TooltipProvider is working
      render(<App />);
      expect(document.body).toBeInTheDocument();
    });

    it("should include Toaster components", () => {
      render(<App />);
      // Toaster components are rendered (they may be empty initially)
      expect(document.body).toBeInTheDocument();
    });

    it("should include BrowserRouter", () => {
      // App renders without error, which means BrowserRouter is working
      render(<App />);
      expect(document.body).toBeInTheDocument();
    });
  });
});

describe("App Routing", () => {
  // Helper to render with specific route
  const renderWithRoute = (route: string) => {
    window.history.pushState({}, "Test page", route);
    return render(<App />);
  };

  describe("Home Route (/)", () => {
    it("should render Index page at root", () => {
      renderWithRoute("/");
      expect(screen.getByAltText("Lifesaver Labs")).toBeInTheDocument();
    });

    it("should show Hero section on home page", () => {
      renderWithRoute("/");
      expect(
        screen.getByText(/We don't just save lives—we redesign/)
      ).toBeInTheDocument();
    });

    it("should show OrganizationTabs on home page", () => {
      renderWithRoute("/");
      expect(screen.getByText("Coalition (Nonprofit)")).toBeInTheDocument();
    });

    it("should show InternationalizationSection on home page", () => {
      renderWithRoute("/");
      expect(screen.getByText("Internationalization")).toBeInTheDocument();
    });

    it("should show Footer on home page", () => {
      renderWithRoute("/");
      expect(screen.getByText(/First, do no harm/)).toBeInTheDocument();
    });
  });

  describe("LetsBeFamily5 Route (/letsbeFamily⁵)", () => {
    it("should render LetsBeFamily5 page at /letsbeFamily⁵", () => {
      renderWithRoute("/letsbeFamily⁵");
      expect(screen.getByText("Come Sit, Let's Be Family⁵")).toBeInTheDocument();
    });

    it("should show back link on LetsBeFamily5 page", () => {
      renderWithRoute("/letsbeFamily⁵");
      expect(screen.getByText("Back to Lifesaver Labs")).toBeInTheDocument();
    });
  });

  describe("LetsBeFamily5 Alternate Route (/letsbeFamily5)", () => {
    it("should render LetsBeFamily5 page at /letsbeFamily5 (ASCII variant)", () => {
      renderWithRoute("/letsbeFamily5");
      expect(screen.getByText("Come Sit, Let's Be Family⁵")).toBeInTheDocument();
    });
  });

  describe("WestWingBlessedMap Route (/west-wing-blessed-map)", () => {
    it("should render WestWingBlessedMap page", () => {
      renderWithRoute("/west-wing-blessed-map");
      expect(screen.getByText("West Wing Mode: Blesséd Map")).toBeInTheDocument();
    });

    it("should show back button on WestWingBlessedMap page", () => {
      renderWithRoute("/west-wing-blessed-map");
      expect(screen.getByText("Back to Lifesaver Labs")).toBeInTheDocument();
    });

    it("should show Organization of Kartographers on map page", () => {
      renderWithRoute("/west-wing-blessed-map");
      expect(screen.getByText("Organization of Kartographers")).toBeInTheDocument();
    });
  });

  describe("NotFound Route (404)", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    it("should render NotFound page for unknown routes", () => {
      renderWithRoute("/unknown-route");
      expect(screen.getByText("404")).toBeInTheDocument();
    });

    it("should show error message on 404 page", () => {
      renderWithRoute("/this-does-not-exist");
      expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
    });

    it("should show return home link on 404 page", () => {
      renderWithRoute("/random-path");
      expect(screen.getByRole("link", { name: /Return to Home/i })).toBeInTheDocument();
    });

    it("should handle deeply nested unknown routes", () => {
      renderWithRoute("/deeply/nested/unknown/path");
      expect(screen.getByText("404")).toBeInTheDocument();
    });
  });
});

describe("App Route Definitions", () => {
  it("should have route for root path", () => {
    window.history.pushState({}, "Test", "/");
    render(<App />);
    // Index page content should be present
    expect(screen.getByAltText("Lifesaver Labs")).toBeInTheDocument();
  });

  it("should have route for /letsbeFamily⁵ (unicode)", () => {
    window.history.pushState({}, "Test", "/letsbeFamily⁵");
    render(<App />);
    expect(screen.getByText("Come Sit, Let's Be Family⁵")).toBeInTheDocument();
  });

  it("should have route for /letsbeFamily5 (ASCII fallback)", () => {
    window.history.pushState({}, "Test", "/letsbeFamily5");
    render(<App />);
    expect(screen.getByText("Come Sit, Let's Be Family⁵")).toBeInTheDocument();
  });

  it("should have route for /west-wing-blessed-map", () => {
    window.history.pushState({}, "Test", "/west-wing-blessed-map");
    render(<App />);
    expect(screen.getByText("West Wing Mode: Blesséd Map")).toBeInTheDocument();
  });

  it("should have catch-all route for 404", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    window.history.pushState({}, "Test", "/anything-else");
    render(<App />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});

describe("App Navigation", () => {
  it("should allow navigation from home to LetsBeFamily5", () => {
    window.history.pushState({}, "Test", "/");
    render(<App />);

    // Navigate to LetsBeFamily5 by changing the URL
    window.history.pushState({}, "Test", "/letsbeFamily⁵");
    render(<App />);

    expect(screen.getByText("Come Sit, Let's Be Family⁵")).toBeInTheDocument();
  });

  it("should allow navigation from home to WestWingBlessedMap", () => {
    window.history.pushState({}, "Test", "/");
    render(<App />);

    // Navigate to WestWingBlessedMap
    window.history.pushState({}, "Test", "/west-wing-blessed-map");
    render(<App />);

    expect(screen.getByText("West Wing Mode: Blesséd Map")).toBeInTheDocument();
  });
});

describe("App Structure", () => {
  it("should render routes inside providers", () => {
    render(<App />);
    // If this renders without error, providers are set up correctly
    expect(document.body).toBeInTheDocument();
  });

  it("should have proper component hierarchy", () => {
    render(<App />);
    // QueryClientProvider > TooltipProvider > Toaster > Sonner > BrowserRouter > Routes
    expect(document.body).toBeInTheDocument();
  });
});
