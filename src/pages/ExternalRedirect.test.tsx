import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ExternalRedirect from "./ExternalRedirect";

describe("ExternalRedirect", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // Mock window.location.href
    Object.defineProperty(window, "location", {
      writable: true,
      value: { ...originalLocation, href: "" },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: originalLocation,
    });
  });

  const GOOGLE_DRIVE_URL =
    "https://drive.google.com/drive/folders/1e6bCx6KH1woBCpy2DMu_s2nl-bDt0PUa?usp=drive_link";

  const renderWithRoute = (initialPath: string, routePath: string, url: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path={routePath} element={<ExternalRedirect url={url} />} />
          <Route path="*" element={<div data-testid="not-found">404</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("should redirect /scotus02026 to Google Drive", () => {
    renderWithRoute("/scotus02026", "/scotus02026", GOOGLE_DRIVE_URL);
    expect(window.location.href).toBe(GOOGLE_DRIVE_URL);
  });

  it("should redirect /skotusat²02026 (literal superscript) to Google Drive", () => {
    renderWithRoute("/skotusat%C2%B202026", "/skotusat²02026", GOOGLE_DRIVE_URL);
    expect(window.location.href).toBe(GOOGLE_DRIVE_URL);
  });

  it("should render null (no visible UI)", () => {
    const { container } = renderWithRoute("/scotus02026", "/scotus02026", GOOGLE_DRIVE_URL);
    expect(container.innerHTML).toBe("");
  });

  it("should not redirect for unmatched routes", () => {
    const { getByTestId } = renderWithRoute("/unknown-path", "/scotus02026", GOOGLE_DRIVE_URL);
    expect(getByTestId("not-found")).toBeInTheDocument();
    expect(window.location.href).toBe("");
  });

  it("should redirect /storiesofstandards/safeword to GitHub", () => {
    const githubUrl = "https://github.com/LifesaverLabs/safeword/tree/develop/personal_experience";
    renderWithRoute("/storiesofstandards/safeword", "/storiesofstandards/safeword", githubUrl);
    expect(window.location.href).toBe(githubUrl);
  });

  it("should redirect /guilt+guiltprevention to GitHub", () => {
    const githubUrl = "https://github.com/LifesaverLabs/safeword/tree/develop/";
    renderWithRoute("/guilt+guiltprevention", "/guilt+guiltprevention", githubUrl);
    expect(window.location.href).toBe(githubUrl);
  });
});
