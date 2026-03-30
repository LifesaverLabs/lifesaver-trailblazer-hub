// @ts-nocheck
import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock topojson-client for tests
vi.mock("topojson-client", () => ({
  feature: () => ({
    features: [
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "United States of America" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "Germany" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "Japan" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "Brazil" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "India" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "China" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "Finland" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "New Zealand" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "Ireland" } },
      { type: "Feature", geometry: { type: "Polygon", coordinates: [[[0,0],[1,0],[1,1],[0,1],[0,0]]] }, properties: { name: "Greece" } },
    ],
  }),
}));

// Mock d3-geo functions
vi.mock("d3-geo", () => ({
  geoCentroid: (geo: any) => [0, 0],
  geoBounds: (geo: any) => [
    [-10, -10],
    [10, 10],
  ],
  geoPath: () => {
    const pathFn = (geo: any) => "M0,0L1,0L1,1Z";
    pathFn.projection = () => pathFn;
    return pathFn;
  },
}));

// Mock d3-geo-projection
vi.mock("d3-geo-projection", () => ({
  geoCylindricalEqualArea: () => {
    const projFn = (coords: [number, number]) => [0, 0];
    projFn.parallel = () => projFn;
    projFn.rotate = () => projFn;
    projFn.translate = () => projFn;
    projFn.scale = () => projFn;
    return projFn;
  },
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
vi.mock("@/assets/krashless-kar-logo.webp", () => ({ default: "krashless-kar-logo.webp" }));
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
