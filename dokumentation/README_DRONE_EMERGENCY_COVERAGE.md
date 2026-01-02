# Drone Survival Kit Coverage Calculator v5

**United States _and Territories_ — All on One Map**

## Why This Matters

Standard "US maps" typically show only the 48 contiguous states. This cartographic convention erases **3.7 million Americans**:

| Territory | Population | Context |
|-----------|------------|---------|
| **Puerto Rico** | 3,285,874 | More than 21 US states |
| Guam | 168,485 | Critical Pacific presence |
| U.S. Virgin Islands | 106,405 | Hurricane-vulnerable |
| American Samoa | 55,191 | Remote Pacific |
| Northern Mariana Islands | 47,329 | Remote Pacific |

When territories aren't on the map, they're invisible to policymakers. Hurricane response, infrastructure investment, healthcare funding—all suffer from this cartographic erasure.

**All US maps should be "United States and Territories" maps.**

## Features

- **Real GeoJSON boundaries** for all 50 states + DC + 5 territories
- **Gall-Peters inspired equal-area** main projection
- **Proper insets** with population labels:
  - Alaska, Hawaiʻi (non-contiguous states)
  - Puerto Rico, USVI (Caribbean territories)
  - Guam, American Samoa, CNMI (Pacific territories)
- **Zoomable** — Pan and zoom to see hex coverage detail
- **Population-density prioritization** — Drones allocated by density for maximum life-saving efficiency
- **First-class territory treatment** — Equal priority weighting with continental metros

## Hexagonal Close-Packing

```
Coverage radius: 5.35 km
Hex spacing: 9.27 km (5.35 × √3)  
Effective area: 77.9 km²/installation (90 × 0.866)
```

No dead zones. Many areas enjoy overlapping dual coverage.

## Installation

### Lovable.dev

Copy both files to your project:
- `src/data/usGeoJSON.ts` — Embedded GeoJSON data
- `src/components/FloridaCoverageCalculator.tsx` — Main component

```tsx
import FloridaCoverageCalculator from './components/FloridaCoverageCalculator';
export default () => <FloridaCoverageCalculator />;
```

### Next.js / React

Copy the files and import. Requires `d3` peer dependency.

## Epistemic Honesty

All AED improvement projections are **speculative extrapolations** from Sweden/Seattle bystander rates, not pilot data. We commit to revising estimates as real coverage data arrives.

## License

MIT — Lifesaver Labs PBC
