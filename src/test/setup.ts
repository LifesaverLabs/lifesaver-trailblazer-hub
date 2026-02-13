// @ts-nocheck
import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock react-simple-maps as it requires canvas and complex geo operations
vi.mock("react-simple-maps", () => ({
  ComposableMap: ({ children, ...props }: any) =>
    React.createElement("svg", { "data-testid": "composable-map", ...props }, children),
  Geographies: ({ children }: any) => {
    const mockGeographies = [
      { rsmKey: "geo-1", properties: { name: "United States of America" } },
      { rsmKey: "geo-2", properties: { name: "Germany" } },
      { rsmKey: "geo-3", properties: { name: "Japan" } },
      { rsmKey: "geo-4", properties: { name: "Brazil" } },
      { rsmKey: "geo-5", properties: { name: "India" } },
      { rsmKey: "geo-6", properties: { name: "China" } },
      { rsmKey: "geo-7", properties: { name: "Finland" } },
      { rsmKey: "geo-8", properties: { name: "New Zealand" } },
      { rsmKey: "geo-9", properties: { name: "Ireland" } },
      { rsmKey: "geo-10", properties: { name: "Greece" } },
    ];
    return React.createElement(
      "g",
      { "data-testid": "geographies" },
      children({ geographies: mockGeographies })
    );
  },
  Geography: ({ geography, ...props }: any) =>
    React.createElement("path", {
      "data-testid": `geography-${geography.rsmKey}`,
      "data-country": geography.properties.name,
      ...props,
    }),
  ZoomableGroup: ({ children, zoom, center, ...props }: any) =>
    React.createElement(
      "g",
      {
        "data-testid": "zoomable-group",
        "data-zoom": zoom,
        "data-center": center?.join(","),
      },
      children
    ),
  Marker: ({ children, coordinates, ...props }: any) =>
    React.createElement(
      "g",
      { "data-testid": "marker", "data-coordinates": coordinates?.join(",") },
      children
    ),
}));

// Mock d3-geo functions
vi.mock("d3-geo", () => ({
  geoCentroid: (geo: any) => [0, 0],
  geoBounds: (geo: any) => [
    [-10, -10],
    [10, 10],
  ],
}));

// Mock d3-geo-projection
vi.mock("d3-geo-projection", () => ({
  geoCylindricalEqualArea: () => ({
    parallel: () => ({
      rotate: () => ({
        translate: () => ({
          scale: () => ({}),
        }),
      }),
    }),
  }),
}));

// Mock image imports
vi.mock("@/assets/hero-lifesaver.webp", () => ({ default: "hero-lifesaver.webp" }));
vi.mock("@/assets/lifesaver-labs-logo.webp", () => ({ default: "lifesaver-labs-logo.webp" }));
vi.mock("@/assets/come-sit-lets-be-family5-logo.webp", () => ({ default: "family5-logo.webp" }));
vi.mock("@/assets/table-tent-preview.jpg", () => ({ default: "table-tent-preview.jpg" }));
vi.mock("@/assets/enough-is-enuf-logo.jpg", () => ({ default: "enough-is-enuf-logo.jpg" }));
vi.mock("@/assets/bled-blessed-dialect-logo.jpg", () => ({ default: "bled-logo.jpg" }));
vi.mock("@/assets/nayborly-logo.jpg", () => ({ default: "nayborly-logo.jpg" }));
vi.mock("@/assets/ribbreakers-united-logo.jpg", () => ({ default: "ribbreakers-logo.jpg" }));
vi.mock("@/assets/save-us-from-slog-logo.jpg", () => ({ default: "save-us-logo.jpg" }));
vi.mock("@/assets/heartclot-logo.jpg", () => ({ default: "heartclot-logo.jpg" }));
vi.mock("@/assets/safeword-logo.jpg", () => ({ default: "safeword-logo.jpg" }));
vi.mock("@/assets/nayborsos-logo.webp", () => ({ default: "nayborsos-logo.webp" }));
vi.mock("@/assets/unify-sos-logo.jpg", () => ({ default: "unify-sos-logo.jpg" }));
vi.mock("@/assets/civigion-logo.jpg", () => ({ default: "civigion-logo.jpg" }));
vi.mock("@/assets/take10-logo.jpg", () => ({ default: "take10-logo.jpg" }));
vi.mock("@/assets/raising-rights-logo.jpg", () => ({ default: "raising-rights-logo.jpg" }));
vi.mock("@/assets/calmunism-logo.jpg", () => ({ default: "calmunism-logo.jpg" }));
vi.mock("@/assets/tear-down-this-firewall-logo.jpg", () => ({ default: "firewall-logo.jpg" }));
vi.mock("@/assets/krashless-kar-logo.jpg", () => ({ default: "krashless-kar-logo.jpg" }));
vi.mock("@/assets/religious-rcv-logo.jpg", () => ({ default: "religious-rcv-logo.jpg" }));
vi.mock("@/assets/lifesaver-labs-united-logo.jpg", () => ({ default: "united-logo.jpg" }));
vi.mock("@/assets/calm-currency-reform-logo.webp", () => ({ default: "currency-logo.webp" }));
vi.mock("@/assets/feminist-yes-logo.webp", () => ({ default: "feminist-yes-logo.webp" }));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
