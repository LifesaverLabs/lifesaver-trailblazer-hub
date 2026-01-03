import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { geoCylindricalEqualArea } from 'd3-geo-projection';
import US_GEOJSON from '../assets/usGeoJSON';
import { getCitiesForZoomLevel } from '../assets/usCitiesData';

// ============================================================================
// TYPES
// ============================================================================

interface CoverageParams {
  setupCostPerUnit: number;
  monthlyMaintenancePerUnit: number;
  yearsOfOperation: number;
  baselineAEDRate: number;
  improvedAEDRate: number;
  qalyValueUSD: number;
  annualCardiacArrestsPerCapita: number;
  averageQALYsPerSurvivor: number;
}

// Synchronized zoom state shared across all map viewports
interface SyncedZoomState {
  k: number;  // zoom scale
  x: number;  // pan x
  y: number;  // pan y
}

interface DroneLocation {
  lat: number;
  lng: number;
  region?: string;
  density?: number;
}

// ============================================================================
// CONSTANTS - HEXAGONAL CLOSE-PACKING
// ============================================================================

const GEOMETRY = {
  coverageRadiusKm: 5.35,
  hexEfficiency: 0.866,
  effectiveAreaPerInstallation: 77.9,
  hexSpacingKm: 9.27,
};

// ============================================================================
// TERRITORY DATA
// ============================================================================

interface TerritoryInfo {
  name: string;
  abbr: string;
  pop: number;
  area: number;
  center: [number, number];
  isTerritory?: boolean;
  isNonContiguous?: boolean;
}

const TERRITORIES: TerritoryInfo[] = [
  // FIRST-CLASS TERRITORIES - These are Americans too!
  { name: 'Puerto Rico', abbr: 'PR', pop: 3285874, area: 9104, center: [-66.59, 18.22], isTerritory: true },
  { name: 'U.S. Virgin Islands', abbr: 'VI', pop: 106405, area: 347, center: [-64.90, 18.34], isTerritory: true },
  { name: 'Guam', abbr: 'GU', pop: 168485, area: 544, center: [144.79, 13.44], isTerritory: true },
  { name: 'American Samoa', abbr: 'AS', pop: 55191, area: 199, center: [-170.70, -14.28], isTerritory: true },
  { name: 'Northern Mariana Islands', abbr: 'MP', pop: 47329, area: 464, center: [145.75, 15.19], isTerritory: true },
  // Non-contiguous states (also need insets)
  { name: 'Alaska', abbr: 'AK', pop: 733391, area: 1723337, center: [-154.49, 64.20], isNonContiguous: true },
  { name: 'Hawaii', abbr: 'HI', pop: 1455271, area: 28313, center: [-157.50, 20.80], isNonContiguous: true },
];

const TERRITORY_TOTAL_POP = TERRITORIES.filter(t => t.isTerritory).reduce((s, t) => s + t.pop, 0);

const FLORIDA_COORDS: [number, number][] = [
  [-87.63,31.00],[-87.41,30.67],[-87.45,30.51],[-87.37,30.43],[-87.52,30.28],
  [-87.66,30.25],[-87.91,30.41],[-87.93,30.66],[-88.01,30.69],[-87.62,30.85],
  [-87.60,31.00],[-85.50,31.00],[-85.00,31.00],[-84.87,30.71],[-83.50,30.65],
  [-82.22,30.57],[-82.17,30.36],[-82.05,30.36],[-82.00,30.56],[-82.04,30.75],
  [-81.95,30.83],[-81.72,30.75],[-81.44,30.71],[-81.38,30.27],[-81.26,29.79],
  [-80.97,29.15],[-80.52,28.46],[-80.59,28.41],[-80.57,28.09],[-80.38,27.74],
  [-80.09,27.29],[-80.03,27.17],[-80.04,26.57],[-80.15,25.74],[-80.24,25.72],
  [-80.34,25.47],[-80.30,25.38],[-80.50,25.20],[-80.57,25.24],[-80.76,25.16],
  [-81.08,25.12],[-81.17,25.22],[-81.13,25.38],[-81.35,25.82],[-81.53,25.90],
  [-81.68,25.86],[-81.80,26.09],[-81.83,26.29],[-82.04,26.52],[-82.09,26.67],
  [-82.06,26.88],[-82.14,26.91],[-82.23,27.03],[-82.37,27.46],[-82.57,27.86],
  [-82.68,28.43],[-82.64,28.89],[-82.76,29.07],[-83.22,29.42],[-83.40,29.52],
  [-83.41,29.67],[-83.54,29.72],[-83.64,29.89],[-84.02,30.10],[-84.36,30.06],
  [-84.34,29.90],[-84.45,29.93],[-84.87,29.74],[-85.31,29.70],[-85.30,29.81],
  [-85.40,29.94],[-85.92,30.24],[-86.30,30.36],[-86.63,30.40],[-86.91,30.37],
  [-87.52,30.28],[-87.37,30.43],[-87.45,30.51],[-87.41,30.67],[-87.63,31.00]
];

const FLORIDA_STATS = {
  population: 23_372_215, // 2024 Census Bureau estimate
  bounds: { north: 31.0, south: 24.5, east: -80.0, west: -87.6 },
};

// ============================================================================
// LITERATURE-GROUNDED EPIDEMIOLOGICAL CONSTANTS
// Sources: Larsen et al. 1993, PMC9039571, Lancet Digital Health, AHA
// ============================================================================

const LARSEN_MODEL = {
  baseSurvival: 0.67,           // 67% if all interventions instant
  cprDecayPerMinute: 0.023,     // 2.3% per minute to CPR
  defibDecayPerMinute: 0.011,   // 1.1% per minute to defib
  aclsDecayPerMinute: 0.021,    // 2.1% per minute to ACLS
};

const OHCA_CONSTANTS = {
  annualIncidencePerCapita: 0.001,  // 100 per 100,000
  shockableRhythmPercentage: 0.23,  // 23% have shockable rhythm
  witnessedPercentage: 0.38,        // 38% are witnessed
};

const EMS_RESPONSE = {
  urban: { median: 7.8, droneAdvantage: 2.5, droneArrivalRate: 0.65 },
  suburban: { median: 9.5, droneAdvantage: 4, droneArrivalRate: 0.70 },
  rural: { median: 13.4, droneAdvantage: 8, droneArrivalRate: 0.80 },
};

const QALY_PARAMS = {
  expectedQALYsPerSurvivor: 10.8,  // 15 years × 0.72 utility
  weatherAvailability: 0.78,       // ArcherFRS operational availability
  baselineBystanderCPRRate: 0.40,  // US average
};

const FLORIDA_DENSITY_DISTRIBUTION = {
  highDensity: { pop: 13_600_000, area: 16_000, density: 850 },
  mediumDensity: { pop: 6_500_000, area: 38_000, density: 171 },
  lowDensity: { pop: 3_272_215, area: 116_312, density: 28 },
};

// ============================================================================
// POINT IN POLYGON
// ============================================================================

const pointInPolygon = (lat: number, lng: number, polygon: [number, number][]): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    if (((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
};

// ============================================================================
// HEX GRID GENERATION
// ============================================================================

const generateFloridaHexGrid = (): DroneLocation[] => {
  const locations: DroneLocation[] = [];
  const spacingDegLat = GEOMETRY.hexSpacingKm / 111;
  const { north, south, east, west } = FLORIDA_STATS.bounds;
  
  let row = 0;
  for (let lat = south; lat <= north; lat += spacingDegLat * 0.866) {
    const spacingDegLng = spacingDegLat / Math.cos(lat * Math.PI / 180);
    const lngOffset = (row % 2) * (spacingDegLng / 2);
    
    for (let lng = west + lngOffset; lng <= east; lng += spacingDegLng) {
      if (pointInPolygon(lat, lng, FLORIDA_COORDS)) {
        locations.push({ lat, lng, region: 'Florida' });
      }
    }
    row++;
  }
  return locations;
};

const generateUSPriorityHexGrid = (maxInstallations: number): DroneLocation[] => {
  const locations: DroneLocation[] = [];
  const spacingDegLat = GEOMETRY.hexSpacingKm / 111;
  
  // Get all features with populations, sorted by density
  const allFeatures = US_GEOJSON.features
    .map(f => ({
      name: f.properties?.name || '',
      abbr: f.properties?.abbr || '',
      pop: f.properties?.pop || 0,
      area: f.properties?.area || 1,
      isTerritory: f.properties?.isTerritory || false,
      isNonContiguous: f.properties?.isNonContiguous || false,
      density: (f.properties?.pop || 0) / (f.properties?.area || 1),
      coords: f.geometry.coordinates[0] as [number, number][],
    }))
    .filter(f => f.pop > 0)
    .sort((a, b) => b.density - a.density);
  
  const totalWeightedPop = allFeatures.reduce((s, t) => s + t.pop * Math.sqrt(t.density), 0);
  let remaining = maxInstallations;
  
  for (const territory of allFeatures) {
    if (remaining <= 0) break;
    
    const weight = territory.pop * Math.sqrt(territory.density);
    const allocation = Math.min(
      Math.ceil((weight / totalWeightedPop) * maxInstallations),
      remaining,
      Math.ceil(territory.area / GEOMETRY.effectiveAreaPerInstallation)
    );
    
    if (allocation < 1) continue;
    
    // Get bounding box from coordinates
    const lngs = territory.coords.map(c => c[0]);
    const lats = territory.coords.map(c => c[1]);
    const bounds = {
      west: Math.min(...lngs),
      east: Math.max(...lngs),
      south: Math.min(...lats),
      north: Math.max(...lats),
    };
    
    let count = 0;
    let row = 0;
    
    for (let lat = bounds.south; lat <= bounds.north && count < allocation; lat += spacingDegLat * 0.866) {
      const spacingDegLng = spacingDegLat / Math.cos(Math.abs(lat) * Math.PI / 180);
      const lngOffset = (row % 2) * (spacingDegLng / 2);
      
      for (let lng = bounds.west + lngOffset; lng <= bounds.east && count < allocation; lng += spacingDegLng) {
        if (pointInPolygon(lat, lng, territory.coords)) {
          locations.push({
            lat,
            lng,
            region: territory.name,
            density: territory.density,
          });
          count++;
        }
      }
      row++;
    }
    remaining -= count;
  }
  
  return locations;
};

// ============================================================================
// LARSEN SURVIVAL MODEL CALCULATIONS
// ============================================================================

/**
 * Calculate survival using Larsen multiparameter model (1993)
 * Survival = 67% - 2.3%×(min to CPR) - 1.1%×(min to defib) - 2.1%×(min to ACLS)
 */
const calculateLarsenSurvival = (
  minutesToCPR: number,
  minutesToDefib: number,
  minutesToALCS: number
): number => {
  const survival =
    LARSEN_MODEL.baseSurvival -
    LARSEN_MODEL.cprDecayPerMinute * minutesToCPR -
    LARSEN_MODEL.defibDecayPerMinute * minutesToDefib -
    LARSEN_MODEL.aclsDecayPerMinute * minutesToALCS;
  return Math.max(0, Math.min(1, survival));
};

/**
 * Calculate survival improvement from drone for a density tier
 */
const calculateDroneSurvivalForTier = (
  tier: 'urban' | 'suburban' | 'rural',
  bystanderCPRRate: number
): { baseline: number; withDrone: number; improvement: number } => {
  const ems = EMS_RESPONSE[tier];

  // Time to CPR: bystander starts in ~2 min, otherwise wait for EMS
  const timeToBystanderCPR = 2;
  const avgTimeToCPR = bystanderCPRRate * timeToBystanderCPR + (1 - bystanderCPRRate) * ems.median;

  // Baseline: defib at EMS arrival
  const baselineDefibTime = ems.median;
  const baselineALCSTime = ems.median + 2;

  // Drone: defib earlier when drone arrives first
  const droneDefibTime = ems.median - ems.droneAdvantage;

  const baselineSurvival = calculateLarsenSurvival(avgTimeToCPR, baselineDefibTime, baselineALCSTime);
  const droneFirstSurvival = calculateLarsenSurvival(avgTimeToCPR, droneDefibTime, baselineALCSTime);

  // Weighted by drone arrival rate
  const withDroneSurvival =
    ems.droneArrivalRate * droneFirstSurvival + (1 - ems.droneArrivalRate) * baselineSurvival;

  return {
    baseline: baselineSurvival,
    withDrone: withDroneSurvival,
    improvement: withDroneSurvival - baselineSurvival,
  };
};

/**
 * Calculate QALYs for a region with proper density stratification
 */
const calculateRegionQALYs = (
  population: number,
  areaSqKm: number,
  yearsOfOperation: number,
  options: {
    nayborSOSEnabled?: boolean;
    weatherAvailability?: number;
  } = {}
): {
  totalQALYs: number;
  additionalSurvivors: number;
  installations: number;
  qalyPerInstallation: number;
} => {
  const {
    nayborSOSEnabled = false,
    weatherAvailability = QALY_PARAMS.weatherAvailability
  } = options;

  // Determine density tier
  const density = population / areaSqKm;
  const tier: 'urban' | 'suburban' | 'rural' =
    density > 300 ? 'urban' : density > 50 ? 'suburban' : 'rural';

  // Bystander CPR rate (Naybor SOS increases it)
  const bystanderCPRRate = nayborSOSEnabled
    ? Math.min(0.73, QALY_PARAMS.baselineBystanderCPRRate + 0.20)
    : QALY_PARAMS.baselineBystanderCPRRate;

  // Annual witnessed shockable OHCAs (target population for drone AED)
  const annualOHCAs = population * OHCA_CONSTANTS.annualIncidencePerCapita;
  const targetOHCAs = annualOHCAs * OHCA_CONSTANTS.witnessedPercentage * OHCA_CONSTANTS.shockableRhythmPercentage;

  // Survival calculation
  const survivalData = calculateDroneSurvivalForTier(tier, bystanderCPRRate);

  // Apply weather availability
  const effectiveSurvival =
    weatherAvailability * survivalData.withDrone +
    (1 - weatherAvailability) * survivalData.baseline;

  const additionalSurvivorsPerYear = targetOHCAs * (effectiveSurvival - survivalData.baseline);
  const totalAdditionalSurvivors = additionalSurvivorsPerYear * yearsOfOperation;
  const totalQALYs = totalAdditionalSurvivors * QALY_PARAMS.expectedQALYsPerSurvivor;

  const installations = Math.ceil(areaSqKm / GEOMETRY.effectiveAreaPerInstallation);

  return {
    totalQALYs,
    additionalSurvivors: totalAdditionalSurvivors,
    installations,
    qalyPerInstallation: installations > 0 ? totalQALYs / installations : 0,
  };
};

/**
 * Calculate Florida full coverage (density-stratified)
 */
const calculateFloridaFullCoverage = (
  yearsOfOperation: number,
  setupCostPerUnit: number,
  monthlyMaintenancePerUnit: number,
  qalyValueUSD: number,
  options: { nayborSOSEnabled?: boolean } = {}
) => {
  const dist = FLORIDA_DENSITY_DISTRIBUTION;

  const highDensity = calculateRegionQALYs(dist.highDensity.pop, dist.highDensity.area, yearsOfOperation, options);
  const mediumDensity = calculateRegionQALYs(dist.mediumDensity.pop, dist.mediumDensity.area, yearsOfOperation, options);
  const lowDensity = calculateRegionQALYs(dist.lowDensity.pop, dist.lowDensity.area, yearsOfOperation, options);

  const totalInstallations = highDensity.installations + mediumDensity.installations + lowDensity.installations;
  const totalQALYs = highDensity.totalQALYs + mediumDensity.totalQALYs + lowDensity.totalQALYs;
  const totalAdditionalSurvivors = highDensity.additionalSurvivors + mediumDensity.additionalSurvivors + lowDensity.additionalSurvivors;

  const totalSetupCost = totalInstallations * setupCostPerUnit;
  const totalAnnualMaintenance = totalInstallations * monthlyMaintenancePerUnit * 12;
  const totalCostOverPeriod = totalSetupCost + totalAnnualMaintenance * yearsOfOperation;
  const economicValueGenerated = totalQALYs * qalyValueUSD;

  return {
    totalInstallations,
    totalSetupCost,
    totalAnnualMaintenance,
    totalCostOverPeriod,
    estimatedLivesSavedPerYear: totalAdditionalSurvivors / yearsOfOperation,
    estimatedQALYsPerYear: totalQALYs / yearsOfOperation,
    totalQALYsOverPeriod: totalQALYs,
    economicValueGenerated,
    returnOnInvestment: ((economicValueGenerated - totalCostOverPeriod) / totalCostOverPeriod) * 100,
    costPerQALY: totalQALYs > 0 ? totalCostOverPeriod / totalQALYs : Infinity,
    costPerLifeSaved: totalAdditionalSurvivors > 0 ? totalCostOverPeriod / totalAdditionalSurvivors : Infinity,
    populationCovered: FLORIDA_STATS.population,
    qalyPerInstallation: totalQALYs / totalInstallations,
    byTier: { highDensity, mediumDensity, lowDensity },
  };
};

/**
 * Calculate US Priority coverage (same installations, all high-density)
 */
const calculateUSPriorityCoverage = (
  numberOfInstallations: number,
  yearsOfOperation: number,
  setupCostPerUnit: number,
  monthlyMaintenancePerUnit: number,
  qalyValueUSD: number,
  options: { nayborSOSEnabled?: boolean } = {}
) => {
  // Each installation covers 78 sq km at urban density (850/sq km) = ~66,300 people
  const popPerInstallation = GEOMETRY.effectiveAreaPerInstallation * FLORIDA_DENSITY_DISTRIBUTION.highDensity.density;
  const totalPop = popPerInstallation * numberOfInstallations;
  const totalArea = GEOMETRY.effectiveAreaPerInstallation * numberOfInstallations;

  const result = calculateRegionQALYs(totalPop, totalArea, yearsOfOperation, options);

  const totalSetupCost = numberOfInstallations * setupCostPerUnit;
  const totalAnnualMaintenance = numberOfInstallations * monthlyMaintenancePerUnit * 12;
  const totalCostOverPeriod = totalSetupCost + totalAnnualMaintenance * yearsOfOperation;
  const economicValueGenerated = result.totalQALYs * qalyValueUSD;

  return {
    totalInstallations: numberOfInstallations,
    totalSetupCost,
    totalAnnualMaintenance,
    totalCostOverPeriod,
    estimatedLivesSavedPerYear: result.additionalSurvivors / yearsOfOperation,
    estimatedQALYsPerYear: result.totalQALYs / yearsOfOperation,
    totalQALYsOverPeriod: result.totalQALYs,
    economicValueGenerated,
    returnOnInvestment: ((economicValueGenerated - totalCostOverPeriod) / totalCostOverPeriod) * 100,
    costPerQALY: result.totalQALYs > 0 ? totalCostOverPeriod / result.totalQALYs : Infinity,
    costPerLifeSaved: result.additionalSurvivors > 0 ? totalCostOverPeriod / result.additionalSurvivors : Infinity,
    populationCovered: totalPop,
    qalyPerInstallation: result.qalyPerInstallation,
  };
};

// ============================================================================
// FORMAT UTILITIES
// ============================================================================

const formatCurrency = (v: number): string => {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
};

const formatNumber = (v: number, d = 0): string => {
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return v.toFixed(d).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// ============================================================================
// GALL-PETERS EQUAL-AREA MAP COMPONENT (SOUTH-UP ORIENTATION)
// ============================================================================
// This map uses true equal-area projection so Alaska appears proportionally
// large (~17% of continental US). The south-up orientation places typically
// "southern" areas at the top, challenging conventional cartographic bias.
//
// INTERNATIONAL INVITATION: This code is designed to be adaptable for any
// country's drone AED proposal. Replace the GeoJSON and city data with your
// nation's boundaries and population centers. Every country deserves this
// life-saving infrastructure. Species build need. 🌍
// ============================================================================

interface MapProps {
  viewMode: 'florida' | 'us';
  locations: DroneLocation[];
  showCoverage: boolean;
}

// Calculate true equal-area scale factor for each region
// Alaska is ~1,723,337 km² vs Continental US ~8,080,464 km² = ~21.3%
const AREA_RATIOS = {
  continental: 1.0,
  alaska: 0.213,      // Alaska is ~21.3% the area of continental US
  hawaii: 0.0035,     // Hawaii is ~0.35% the area of continental US
  puertoRico: 0.0011, // PR is ~0.11%
  guam: 0.000067,
  usvi: 0.000043,
  americanSamoa: 0.000025,
  cnmi: 0.000057,
};

// Geographic positioning for south-up globe orientation
// In south-up view: higher latitude = lower on screen, western = left
const INSET_POSITIONS_SOUTH_UP = {
  // Alaska: furthest north, so appears LOWEST in south-up view
  // Longitude ~-154, so positioned toward left-center
  AK: { x: 0.15, y: 0.78, areaRatio: AREA_RATIOS.alaska },

  // Hawaii: ~20°N latitude, so appears HIGHER than Alaska in south-up
  // Longitude ~-157, similar longitude to Alaska
  HI: { x: 0.08, y: 0.55, areaRatio: AREA_RATIOS.hawaii },

  // Puerto Rico: ~18°N, Caribbean, so appears high (southern)
  // Longitude ~-66, far east
  PR: { x: 0.85, y: 0.45, areaRatio: AREA_RATIOS.puertoRico },

  // US Virgin Islands: ~18°N, just east of PR
  VI: { x: 0.92, y: 0.42, areaRatio: AREA_RATIOS.usvi },

  // Guam: ~13°N, western Pacific (144°E = -216° or effectively far west on globe)
  // In terms of proximity to continental US, positioned far left
  GU: { x: 0.02, y: 0.35, areaRatio: AREA_RATIOS.guam },

  // American Samoa: ~-14°S (southern hemisphere!), so appears at TOP in south-up
  // Longitude ~-170, far west
  AS: { x: 0.02, y: 0.08, areaRatio: AREA_RATIOS.americanSamoa },

  // Northern Mariana Islands: ~15°N, near Guam
  MP: { x: 0.02, y: 0.22, areaRatio: AREA_RATIOS.cnmi },
};

const CoverageMap: React.FC<MapProps> = ({ viewMode, locations, showCoverage }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 700 });
  const [syncedZoom, setSyncedZoom] = useState<SyncedZoomState>({ k: 1, x: 0, y: 0 });
  const [showCities, setShowCities] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height: Math.max(600, height) });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Get cities appropriate for current zoom level
  const visibleCities = useMemo(() => {
    return getCitiesForZoomLevel(syncedZoom.k);
  }, [syncedZoom.k]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    svg.selectAll('*').remove();

    // Synchronized zoom handler - zooming ANY viewport zooms ALL
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 20])
      .on('zoom', (event) => {
        const newZoom = { k: event.transform.k, x: event.transform.x, y: event.transform.y };
        setSyncedZoom(newZoom);
      });

    svg.call(zoom);

    // Apply current zoom state
    const currentTransform = d3.zoomIdentity
      .translate(syncedZoom.x, syncedZoom.y)
      .scale(syncedZoom.k);

    const mainGroup = svg.append('g')
      .attr('transform', currentTransform.toString());

    if (viewMode === 'florida') {
      // Florida view - Mercator projection (not south-up for single state view)
      const projection = d3.geoMercator()
        .center([-83.5, 27.8])
        .scale(width * 5.5)
        .translate([width / 2, height / 2]);

      const pathGenerator = d3.geoPath().projection(projection);

      // Draw Florida from GeoJSON
      const floridaFeature = US_GEOJSON.features.find(f => f.properties?.abbr === 'FL');
      if (floridaFeature) {
        mainGroup.append('path')
          .datum(floridaFeature)
          .attr('d', pathGenerator as any)
          .attr('fill', 'rgba(255, 107, 107, 0.15)')
          .attr('stroke', '#ff6b6b')
          .attr('stroke-width', 2 / syncedZoom.k);
      }

      // Coverage circles
      if (showCoverage) {
        locations.forEach(loc => {
          const point = projection([loc.lng, loc.lat]);
          if (!point) return;

          mainGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(4, 25 / syncedZoom.k))
            .attr('fill', 'rgba(0, 217, 255, 0.08)')
            .attr('stroke', 'rgba(0, 217, 255, 0.3)')
            .attr('stroke-width', 0.5 / syncedZoom.k);
        });
      }

      // Drone markers
      locations.forEach(loc => {
        const point = projection([loc.lng, loc.lat]);
        if (!point) return;

        mainGroup.append('circle')
          .attr('cx', point[0])
          .attr('cy', point[1])
          .attr('r', Math.max(1, 2.5 / syncedZoom.k))
          .attr('fill', '#ff6b6b')
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.3 / syncedZoom.k);
      });

      // Florida city labels
      if (showCities) {
        const floridaCities = visibleCities.filter(c => c.abbr === 'FL');
        floridaCities.forEach(city => {
          const point = projection([city.lng, city.lat]);
          if (!point) return;

          mainGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(2, 4 / syncedZoom.k))
            .attr('fill', '#ffc857')
            .attr('stroke', '#0d1117')
            .attr('stroke-width', 0.5 / syncedZoom.k);

          if (syncedZoom.k > 1 || city.pop > 200000) {
            mainGroup.append('text')
              .attr('x', point[0] + 6 / syncedZoom.k)
              .attr('y', point[1] + 3 / syncedZoom.k)
              .attr('font-size', `${Math.max(8, 10 / syncedZoom.k)}px`)
              .attr('fill', '#e6edf3')
              .attr('font-family', 'Inter, system-ui, sans-serif')
              .text(city.name);
          }
        });
      }

    } else {
      // =====================================================================
      // GALL-PETERS EQUAL-AREA PROJECTION (SOUTH-UP)
      // =====================================================================
      // True equal-area cylindrical projection with Y-axis inverted
      // so south appears at top. This challenges Eurocentric cartographic
      // conventions while preserving accurate area relationships.

      // Create Gall-Peters (cylindrical equal-area) projection
      // Standard parallel at 45° gives the Gall-Peters variant
      const gallPeters = geoCylindricalEqualArea()
        .parallel(45)
        .rotate([98, 0, 0])  // Center on continental US
        .scale(width * 0.85)
        .translate([width * 0.5, height * 0.35]);

      // Invert Y-axis for south-up orientation
      const southUpProjection = (coords: [number, number]): [number, number] | null => {
        const projected = gallPeters(coords);
        if (!projected) return null;
        // Flip Y around center
        return [projected[0], height * 0.7 - projected[1]];
      };

      // Custom path generator for south-up
      const createSouthUpPath = (feature: any): string => {
        const coords = feature.geometry.coordinates[0] as [number, number][];
        const projected = coords.map(c => southUpProjection(c)).filter(p => p !== null) as [number, number][];
        if (projected.length < 3) return '';
        return 'M' + projected.map(p => p.join(',')).join('L') + 'Z';
      };

      // Filter to continental features only for main map
      const continentalFeatures = US_GEOJSON.features.filter(
        f => !f.properties?.isTerritory && !f.properties?.isNonContiguous
      );

      // Draw all continental states with equal-area projection
      continentalFeatures.forEach(feature => {
        const density = (feature.properties?.pop || 0) / (feature.properties?.area || 1);
        const fillOpacity = Math.min(0.35, 0.05 + density / 300);

        mainGroup.append('path')
          .attr('d', createSouthUpPath(feature))
          .attr('fill', `rgba(78, 205, 196, ${fillOpacity})`)
          .attr('stroke', feature.properties?.abbr === 'FL' ? '#ff6b6b' : '#4ecdc4')
          .attr('stroke-width', (feature.properties?.abbr === 'FL' ? 2 : 0.8) / syncedZoom.k);
      });

      // Draw coverage on continental US
      const continentalLocations = locations.filter(loc => {
        const region = US_GEOJSON.features.find(f => f.properties?.name === loc.region);
        return region && !region.properties?.isTerritory && !region.properties?.isNonContiguous;
      });

      if (showCoverage) {
        continentalLocations.forEach(loc => {
          const point = southUpProjection([loc.lng, loc.lat]);
          if (!point) return;

          mainGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(2, 12 / syncedZoom.k))
            .attr('fill', 'rgba(78, 205, 196, 0.06)')
            .attr('stroke', 'rgba(78, 205, 196, 0.2)')
            .attr('stroke-width', 0.3 / syncedZoom.k);
        });
      }

      continentalLocations.forEach(loc => {
        const point = southUpProjection([loc.lng, loc.lat]);
        if (!point) return;

        mainGroup.append('circle')
          .attr('cx', point[0])
          .attr('cy', point[1])
          .attr('r', Math.max(0.6, 1.5 / syncedZoom.k))
          .attr('fill', '#f0883e')
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.2 / syncedZoom.k);
      });

      // Continental city labels
      if (showCities) {
        const continentalCities = visibleCities.filter(c =>
          !['AK', 'HI', 'PR', 'VI', 'GU', 'AS', 'MP'].includes(c.abbr)
        );
        continentalCities.forEach(city => {
          const point = southUpProjection([city.lng, city.lat]);
          if (!point) return;

          // City dot
          mainGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(1.5, 3 / syncedZoom.k))
            .attr('fill', city.pop > 500000 ? '#ffc857' : '#8b949e')
            .attr('stroke', '#0d1117')
            .attr('stroke-width', 0.3 / syncedZoom.k);

          // City label (show based on zoom and population)
          const showLabel = (syncedZoom.k > 2 && city.pop > 100000) ||
                           (syncedZoom.k > 4 && city.pop > 50000) ||
                           (syncedZoom.k > 8) ||
                           city.pop > 500000;

          if (showLabel) {
            mainGroup.append('text')
              .attr('x', point[0] + 4 / syncedZoom.k)
              .attr('y', point[1] + 2 / syncedZoom.k)
              .attr('font-size', `${Math.max(6, 8 / syncedZoom.k)}px`)
              .attr('fill', city.pop > 500000 ? '#e6edf3' : '#8b949e')
              .attr('font-family', 'Inter, system-ui, sans-serif')
              .text(city.name);
          }
        });
      }

      // =====================================================================
      // EQUAL-AREA INSETS (SYNCHRONIZED ZOOM)
      // =====================================================================
      // Each inset uses the SAME zoom level to maintain equal-area relationship.
      // Insets are positioned based on actual geographic location on a south-up
      // globe: southern hemisphere at top, northern at bottom, west to east.

      const insets: Array<{
        abbr: string;
        x: number;
        y: number;
        areaRatio: number;
        label: string;
        color: string;
      }> = [
        { abbr: 'AS', ...INSET_POSITIONS_SOUTH_UP.AS, label: 'American Samoa (14°S)', color: '#ff6b6b' },  // Southern hemisphere!
        { abbr: 'MP', ...INSET_POSITIONS_SOUTH_UP.MP, label: 'N. Mariana Islands', color: '#ffc857' },
        { abbr: 'GU', ...INSET_POSITIONS_SOUTH_UP.GU, label: 'Guam', color: '#ffc857' },
        { abbr: 'HI', ...INSET_POSITIONS_SOUTH_UP.HI, label: 'Hawaiʻi', color: '#4ecdc4' },
        { abbr: 'PR', ...INSET_POSITIONS_SOUTH_UP.PR, label: 'Puerto Rico', color: '#ffc857' },
        { abbr: 'VI', ...INSET_POSITIONS_SOUTH_UP.VI, label: 'U.S. Virgin Islands', color: '#ffc857' },
        { abbr: 'AK', ...INSET_POSITIONS_SOUTH_UP.AK, label: 'Alaska (64°N)', color: '#4ecdc4' },  // Furthest north = bottom
      ];

      insets.forEach(({ abbr, x, y, areaRatio, label, color }) => {
        const feature = US_GEOJSON.features.find(f => f.properties?.abbr === abbr);
        if (!feature) return;

        // Calculate inset dimensions based on TRUE EQUAL AREA
        // Base size scaled by square root of area ratio (since area = w*h)
        const baseInsetSize = width * 0.15;
        const scaledSize = baseInsetSize * Math.sqrt(areaRatio) * 15; // Amplify for visibility
        const insetW = Math.max(60, Math.min(200, scaledSize));
        const insetH = insetW * 0.8;

        const insetX = width * x;
        const insetY = height * y;

        const insetGroup = mainGroup.append('g')
          .attr('transform', `translate(${insetX}, ${insetY})`);

        // Inset background with area indicator
        insetGroup.append('rect')
          .attr('x', -4)
          .attr('y', -18)
          .attr('width', insetW + 8)
          .attr('height', insetH + 32)
          .attr('fill', 'rgba(10, 14, 18, 0.95)')
          .attr('stroke', color)
          .attr('stroke-width', 1.5 / syncedZoom.k)
          .attr('rx', 4);

        // Label with latitude indicator
        insetGroup.append('text')
          .attr('x', insetW / 2)
          .attr('y', -4)
          .attr('text-anchor', 'middle')
          .attr('font-size', `${Math.max(8, 10 / syncedZoom.k)}px`)
          .attr('font-weight', '600')
          .attr('fill', color)
          .text(label);

        // Population and area info
        const pop = feature.properties?.pop || 0;
        const area = feature.properties?.area || 0;
        insetGroup.append('text')
          .attr('x', insetW / 2)
          .attr('y', insetH + 8)
          .attr('text-anchor', 'middle')
          .attr('font-size', `${Math.max(6, 8 / syncedZoom.k)}px`)
          .attr('fill', '#8b949e')
          .attr('font-family', 'JetBrains Mono, monospace')
          .text(`${formatNumber(pop)} people`);

        insetGroup.append('text')
          .attr('x', insetW / 2)
          .attr('y', insetH + 18)
          .attr('text-anchor', 'middle')
          .attr('font-size', `${Math.max(5, 7 / syncedZoom.k)}px`)
          .attr('fill', '#6e7681')
          .attr('font-family', 'JetBrains Mono, monospace')
          .text(`${formatNumber(area)} km²`);

        // Get center of feature for projection
        const coords = feature.geometry.coordinates[0] as [number, number][];
        const centerLng = coords.reduce((s, c) => s + c[0], 0) / coords.length;
        const centerLat = coords.reduce((s, c) => s + c[1], 0) / coords.length;

        // Use same Gall-Peters projection for equal-area, with SYNCHRONIZED ZOOM
        const insetProjection = geoCylindricalEqualArea()
          .parallel(45)
          .center([centerLng, centerLat])
          .scale(insetW * 80 * syncedZoom.k)  // SYNCHRONIZED with main zoom!
          .translate([insetW / 2, insetH / 2]);

        // South-up for inset too (flip Y)
        const insetSouthUp = (c: [number, number]): [number, number] | null => {
          const p = insetProjection(c);
          if (!p) return null;
          // For southern hemisphere (AS), don't flip
          if (abbr === 'AS') return p;
          return [p[0], insetH - p[1]];
        };

        // Draw feature path
        const insetCoords = coords.map(c => insetSouthUp(c)).filter(p => p !== null) as [number, number][];
        if (insetCoords.length > 2) {
          const pathD = 'M' + insetCoords.map(p => p.join(',')).join('L') + 'Z';
          insetGroup.append('path')
            .attr('d', pathD)
            .attr('fill', `${color}33`)
            .attr('stroke', color)
            .attr('stroke-width', 1 / syncedZoom.k);
        }

        // Draw coverage in inset
        const insetLocations = locations.filter(l => l.region === feature.properties?.name);

        if (showCoverage) {
          insetLocations.forEach(loc => {
            const point = insetSouthUp([loc.lng, loc.lat]);
            if (!point || point[0] < 0 || point[0] > insetW || point[1] < 0 || point[1] > insetH) return;

            insetGroup.append('circle')
              .attr('cx', point[0])
              .attr('cy', point[1])
              .attr('r', Math.max(2, 6 / syncedZoom.k))
              .attr('fill', `${color}22`)
              .attr('stroke', `${color}66`)
              .attr('stroke-width', 0.3 / syncedZoom.k);
          });
        }

        insetLocations.forEach(loc => {
          const point = insetSouthUp([loc.lng, loc.lat]);
          if (!point || point[0] < 0 || point[0] > insetW || point[1] < 0 || point[1] > insetH) return;

          insetGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(0.8, 1.5 / syncedZoom.k))
            .attr('fill', color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.2 / syncedZoom.k);
        });

        // City labels in insets
        if (showCities) {
          const insetCities = visibleCities.filter(c => c.abbr === abbr);
          insetCities.slice(0, 5).forEach(city => {
            const point = insetSouthUp([city.lng, city.lat]);
            if (!point || point[0] < 0 || point[0] > insetW || point[1] < 0 || point[1] > insetH) return;

            insetGroup.append('circle')
              .attr('cx', point[0])
              .attr('cy', point[1])
              .attr('r', 2 / syncedZoom.k)
              .attr('fill', '#ffc857');

            if (syncedZoom.k > 1 || city.pop > 50000) {
              insetGroup.append('text')
                .attr('x', point[0] + 3 / syncedZoom.k)
                .attr('y', point[1] + 2 / syncedZoom.k)
                .attr('font-size', `${Math.max(5, 7 / syncedZoom.k)}px`)
                .attr('fill', '#e6edf3')
                .text(city.name);
            }
          });
        }
      });

      // Add compass indicator showing "SOUTH UP"
      mainGroup.append('text')
        .attr('x', width * 0.5)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', `${12 / syncedZoom.k}px`)
        .attr('font-weight', '700')
        .attr('fill', '#ffc857')
        .text('↑ SOUTH');

      mainGroup.append('text')
        .attr('x', width * 0.5)
        .attr('y', height - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', `${12 / syncedZoom.k}px`)
        .attr('font-weight', '700')
        .attr('fill', '#4ecdc4')
        .text('↓ NORTH');
    }

  }, [viewMode, locations, showCoverage, showCities, dimensions, syncedZoom, visibleCities]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 600 }}>
      <div style={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 10,
        display: 'flex',
        gap: 8,
        alignItems: 'center'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#8b949e', cursor: 'pointer' }}>
          <input type="checkbox" checked={showCities} onChange={e => setShowCities(e.target.checked)} />
          City labels
        </label>
        <span style={{
          fontFamily: 'JetBrains Mono',
          fontSize: 9,
          color: '#6e7681',
          background: '#161b22',
          padding: '2px 6px',
          borderRadius: 3
        }}>
          {syncedZoom.k.toFixed(1)}x
        </span>
      </div>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ background: '#0d1117', cursor: 'grab' }}
      />
    </div>
  );
};

// ============================================================================
// UI COMPONENTS
// ============================================================================

const Slider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  unit?: string;
  description?: string;
}> = ({ label, value, min, max, step, onChange, format = String, unit = '', description }) => (
  <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 6, padding: '8px 10px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
      <span style={{ fontSize: 11, color: '#e6edf3' }}>{label}</span>
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#00d9ff' }}>{format(value)}{unit}</span>
    </div>
    {description && <div style={{ fontSize: 9, color: '#6e7681', marginBottom: 4 }}>{description}</div>}
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))}
      style={{ width: '100%', height: 3, background: '#0a0e12', borderRadius: 2, appearance: 'none', cursor: 'pointer' }} />
  </div>
);

const Stat: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = '#e6edf3' }) => (
  <div style={{ background: '#101418', border: '1px solid #21262d', borderRadius: 6, padding: 10 }}>
    <div style={{ fontSize: 9, color: '#8b949e', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 18, fontWeight: 700, color, marginTop: 2 }}>{value}</div>
  </div>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function FloridaCoverageCalculator() {
  const [viewMode, setViewMode] = useState<'florida' | 'us'>('florida');
  const [showCoverage, setShowCoverage] = useState(true);
  
  const [params, setParams] = useState<CoverageParams>({
    setupCostPerUnit: 75000,
    monthlyMaintenancePerUnit: 500,
    yearsOfOperation: 10,
    baselineAEDRate: 2.8,
    improvedAEDRate: 55,
    qalyValueUSD: 100000,
    annualCardiacArrestsPerCapita: 0.001,
    averageQALYsPerSurvivor: 12,
  });

  const update = useCallback((k: keyof CoverageParams, v: number) => setParams(p => ({ ...p, [k]: v })), []);

  const floridaLocs = useMemo(() => generateFloridaHexGrid(), []);
  const usLocs = useMemo(() => generateUSPriorityHexGrid(floridaLocs.length), [floridaLocs.length]);
  
  const usPopCovered = useMemo(() => {
    const regionCounts = new Map<string, number>();
    usLocs.forEach(loc => { if (loc.region) regionCounts.set(loc.region, (regionCounts.get(loc.region) || 0) + 1); });
    
    return US_GEOJSON.features.reduce((sum, f) => {
      const count = regionCounts.get(f.properties?.name || '') || 0;
      const area = f.properties?.area || 1;
      const pop = f.properties?.pop || 0;
      const coverage = Math.min(1, (count * GEOMETRY.effectiveAreaPerInstallation) / area);
      return sum + pop * coverage;
    }, 0);
  }, [usLocs]);

  const floridaResults = useMemo(() => calculateFloridaFullCoverage(
    params.yearsOfOperation,
    params.setupCostPerUnit,
    params.monthlyMaintenancePerUnit,
    params.qalyValueUSD
  ), [params.yearsOfOperation, params.setupCostPerUnit, params.monthlyMaintenancePerUnit, params.qalyValueUSD]);

  const usResults = useMemo(() => calculateUSPriorityCoverage(
    floridaResults.totalInstallations, // Same number of installations
    params.yearsOfOperation,
    params.setupCostPerUnit,
    params.monthlyMaintenancePerUnit,
    params.qalyValueUSD
  ), [floridaResults.totalInstallations, params.yearsOfOperation, params.setupCostPerUnit, params.monthlyMaintenancePerUnit, params.qalyValueUSD]);

  const currentResults = viewMode === 'florida' ? floridaResults : usResults;
  const currentLocs = viewMode === 'florida' ? floridaLocs : usLocs;
  
  const qalyDiff = usResults.totalQALYsOverPeriod - floridaResults.totalQALYsOverPeriod;

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#0a0e12', color: '#e6edf3', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ background: '#101418', borderBottom: '1px solid #21262d', padding: '20px 16px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0, background: 'linear-gradient(135deg, #e6edf3 0%, #00d9ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Drone Survival Kit Coverage Analysis
        </h1>
        <p style={{ color: '#8b949e', margin: '4px 0 12px', fontSize: 12 }}>
          Archer FRS × Naybor SOS — United States <em>and Territories</em>
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: '#161b22', border: '1px solid #21262d', borderRadius: 6, padding: 2 }}>
            {(['florida', 'us'] as const).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                padding: '5px 10px', border: 'none', borderRadius: 4,
                background: viewMode === mode ? (mode === 'florida' ? '#ff6b6b' : '#4ecdc4') : 'transparent',
                color: viewMode === mode ? (mode === 'florida' ? '#fff' : '#0a0e12') : '#8b949e',
                fontFamily: 'JetBrains Mono', fontSize: 9, fontWeight: viewMode === mode ? 600 : 400, cursor: 'pointer',
              }}>
                {mode === 'florida' ? '🍊 FLORIDA' : '🇺🇸 US + TERRITORIES'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Why territories matter */}
      {viewMode === 'us' && (
        <div style={{ background: 'rgba(255, 200, 87, 0.08)', borderBottom: '1px solid #ffc857', padding: '8px 16px', textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 10, color: '#c9b38a' }}>
            <strong style={{ color: '#ffc857' }}>Why show territories?</strong> Standard "US maps" erase {formatNumber(TERRITORY_TOTAL_POP)} Americans 
            in PR, Guam, USVI, American Samoa, CNMI. When they're not on the map, they're invisible to policy.
            <em> All US maps should be "United States and Territories" maps.</em>
          </p>
        </div>
      )}

      {/* Main */}
      <main style={{ maxWidth: 1600, margin: '0 auto', padding: 14, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        {/* Map */}
        <section style={{ background: '#101418', border: '1px solid #21262d', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderBottom: '1px solid #21262d', background: '#161b22' }}>
            <h2 style={{ margin: 0, fontSize: 11, fontWeight: 600 }}>
              Coverage Map
              <span style={{ marginLeft: 6, padding: '2px 5px', borderRadius: 3, fontSize: 8, fontFamily: 'JetBrains Mono', fontWeight: 700,
                background: viewMode === 'florida' ? '#ff6b6b' : '#4ecdc4', color: viewMode === 'florida' ? '#fff' : '#0a0e12' }}>
                {viewMode === 'florida' ? 'FLORIDA' : 'US+T'}
              </span>
              <span style={{ marginLeft: 4, padding: '2px 5px', borderRadius: 3, fontSize: 8, fontFamily: 'JetBrains Mono', background: '#21262d', color: '#8b949e' }}>
                ZOOMABLE
              </span>
            </h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#8b949e', cursor: 'pointer' }}>
              <input type="checkbox" checked={showCoverage} onChange={e => setShowCoverage(e.target.checked)} />
              Coverage radii
            </label>
          </div>
          
          <div style={{ height: 500 }}>
            <CoverageMap viewMode={viewMode} locations={currentLocs} showCoverage={showCoverage} />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#21262d', borderTop: '1px solid #21262d' }}>
            {[
              { v: formatNumber(currentLocs.length), l: 'Installations' },
              { v: `${formatNumber(currentResults.populationCovered / 1e6, 1)}M`, l: 'Pop. Covered' },
              { v: `${GEOMETRY.hexSpacingKm.toFixed(2)} km`, l: 'Hex Spacing' },
              { v: viewMode === 'florida' ? '100%' : `${((usPopCovered / 335000000) * 100).toFixed(1)}%`, l: 'Pop. %' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#161b22', padding: 6, textAlign: 'center' }}>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 700, color: '#00d9ff' }}>{s.v}</div>
                <div style={{ fontSize: 7, color: '#8b949e', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Controls */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ background: '#101418', border: '1px solid #21262d', borderRadius: 8, padding: 10 }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 600, color: '#00d9ff' }}>💰 Cost</h3>
            <div style={{ display: 'grid', gap: 5 }}>
              <Slider label="Setup/Unit" value={params.setupCostPerUnit} min={25000} max={200000} step={5000} onChange={v => update('setupCostPerUnit', v)} format={formatCurrency} />
              <Slider label="Monthly Maint." value={params.monthlyMaintenancePerUnit} min={100} max={2000} step={50} onChange={v => update('monthlyMaintenancePerUnit', v)} format={formatCurrency} />
              <Slider label="Years" value={params.yearsOfOperation} min={1} max={25} step={1} onChange={v => update('yearsOfOperation', v)} unit="yr" />
            </div>
          </div>
          
          <div style={{ background: '#101418', border: '1px solid #21262d', borderRadius: 8, padding: 10 }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 600, color: '#00d9ff' }}>🏥 Medical (Estimates)</h3>
            <div style={{ display: 'grid', gap: 5 }}>
              <Slider label="Baseline AED" value={params.baselineAEDRate} min={0.5} max={15} step={0.1} onChange={v => update('baselineAEDRate', v)} format={v => v.toFixed(1)} unit="%" description="Current US ~2-3%" />
              <Slider label="Projected AED" value={params.improvedAEDRate} min={20} max={85} step={1} onChange={v => update('improvedAEDRate', v)} unit="%" description="Speculative (Sweden/Seattle inspired)" />
              <Slider label="QALYs/Survivor" value={params.averageQALYsPerSurvivor} min={5} max={25} step={1} onChange={v => update('averageQALYsPerSurvivor', v)} unit="yr" />
              <Slider label="QALY Value" value={params.qalyValueUSD} min={50000} max={300000} step={10000} onChange={v => update('qalyValueUSD', v)} format={formatCurrency} />
            </div>
          </div>
          
          {/* Territory stats */}
          {viewMode === 'us' && (
            <div style={{ background: 'rgba(255, 200, 87, 0.08)', border: '1px solid #ffc857', borderRadius: 8, padding: 10 }}>
              <h3 style={{ margin: '0 0 6px', fontSize: 10, fontWeight: 600, color: '#ffc857' }}>🏝️ Territory Coverage</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                {TERRITORIES.filter(t => t.isTerritory).map(t => (
                  <div key={t.abbr} style={{ fontSize: 9, color: '#c9b38a', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.name}</span>
                    <span style={{ fontFamily: 'JetBrains Mono' }}>{formatNumber(t.pop)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Uncertainty Notice */}
        <div style={{ gridColumn: '1 / -1', background: 'rgba(255, 200, 87, 0.06)', border: '1px solid rgba(255, 200, 87, 0.3)', borderRadius: 6, padding: '10px 14px' }}>
          <h4 style={{ margin: '0 0 4px', fontSize: 11, color: '#ffc857' }}>⚠️ Provisional Estimates</h4>
          <p style={{ margin: 0, fontSize: 10, color: '#a89860', lineHeight: 1.4 }}>
            These projections are <strong>speculative</strong>—extrapolated from Sweden/Seattle bystander rates, not pilot data.
            We will continuously revise as early coverage generates real data.
          </p>
        </div>

        {/* Comparison */}
        <div style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.05) 0%, rgba(255, 107, 107, 0.05) 100%)', border: '1px solid #21262d', borderRadius: 8, padding: 14 }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 600, textAlign: 'center' }}>📊 Same Budget Comparison</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: '#ff6b6b', margin: '0 0 4px', fontSize: 10 }}>🍊 Florida Full</h4>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, color: '#ff6b6b' }}>{formatNumber(floridaResults.totalQALYsOverPeriod)}</div>
              <div style={{ fontSize: 8, color: '#6e7681' }}>QALYs ({params.yearsOfOperation}yr)</div>
            </div>
            <div style={{ padding: '3px 8px', background: '#161b22', borderRadius: 4, color: '#6e7681', fontSize: 10 }}>VS</div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: '#4ecdc4', margin: '0 0 4px', fontSize: 10 }}>🇺🇸 US+T Priority</h4>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 20, fontWeight: 700, color: '#4ecdc4' }}>{formatNumber(usResults.totalQALYsOverPeriod)}</div>
              <div style={{ fontSize: 8, color: '#6e7681' }}>QALYs ({params.yearsOfOperation}yr)</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, paddingTop: 8, borderTop: '1px solid #21262d' }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 16, fontWeight: 700, color: qalyDiff >= 0 ? '#00ff9d' : '#f85149' }}>
              {qalyDiff >= 0 ? '+' : ''}{formatNumber(qalyDiff)} QALYs
            </div>
          </div>
        </div>

        {/* Results */}
        <section style={{ gridColumn: '1 / -1' }}>
          <h2 style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{viewMode === 'florida' ? '🍊 Florida' : '🇺🇸 US+T'} Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 5 }}>
            <Stat label="Setup" value={formatCurrency(currentResults.totalSetupCost)} />
            <Stat label="Annual Maint." value={formatCurrency(currentResults.totalAnnualMaintenance)} />
            <Stat label={`Total (${params.yearsOfOperation}yr)`} value={formatCurrency(currentResults.totalCostOverPeriod)} color="#00d9ff" />
            <Stat label="Lives/Year" value={formatNumber(currentResults.estimatedLivesSavedPerYear)} color="#3fb950" />
            <Stat label="QALYs/Year" value={formatNumber(currentResults.estimatedQALYsPerYear)} color="#3fb950" />
            <Stat label="Total QALYs" value={formatNumber(currentResults.totalQALYsOverPeriod)} color="#3fb950" />
            <Stat label="Cost/Life" value={formatCurrency(currentResults.costPerLifeSaved)} color={currentResults.costPerLifeSaved < 500000 ? '#3fb950' : '#f0883e'} />
            <Stat label="ROI" value={`${currentResults.returnOnInvestment >= 0 ? '+' : ''}${currentResults.returnOnInvestment.toFixed(0)}%`} color="#00d9ff" />
          </div>
        </section>

        {/* International Invitation */}
        {viewMode === 'us' && (
          <div style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.08) 0%, rgba(255, 200, 87, 0.08) 100%)', border: '1px solid rgba(78, 205, 196, 0.3)', borderRadius: 8, padding: 16 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 14, fontWeight: 700, color: '#4ecdc4' }}>
              International Invitation
            </h3>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: '#c9d1d9', lineHeight: 1.5 }}>
              This map and codebase are designed to be <strong>adaptable for any country</strong>.
              Every nation deserves drone AED coverage. Replace the GeoJSON boundaries and city data
              with your country's geography, and the equal-area projection will preserve accurate
              territorial relationships.
            </p>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: '#8b949e', lineHeight: 1.5, fontStyle: 'italic' }}>
              Species build need. Cardiac arrest knows no borders. Whether you're in Brazil, India,
              Nigeria, Indonesia, or any nation—your citizens deserve the same chance at survival.
              Fork this project, adapt it to your geography, and advocate for drone AED infrastructure
              in your communities.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 10 }}>
              <a href="https://github.com/lifesaverlabs/lifesaver-trailblazer-hub" target="_blank"
                 style={{ color: '#4ecdc4', textDecoration: 'none' }}>
                View Source Code
              </a>
              <span style={{ color: '#6e7681' }}>|</span>
              <a href="https://github.com/lifesaverlabs/lifesaver-trailblazer-hub/blob/main/dokumentation/QALY-MODEL-BIBLIOGRAPHY.md"
                 target="_blank" style={{ color: '#ffc857', textDecoration: 'none' }}>
                QALY Model Documentation
              </a>
              <span style={{ color: '#6e7681' }}>|</span>
              <span style={{ color: '#8b949e' }}>
                Gall-Peters Equal-Area Projection
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 12, borderTop: '1px solid #21262d' }}>
          <p style={{ margin: 0, fontSize: 9, color: '#6e7681' }}>
            <a href="https://lifesaverlabs.org" target="_blank" style={{ color: '#00d9ff' }}>Lifesaver Labs PBC</a> |
            Naybor SOS × Archer FRS |
            <a href="https://github.com/lifesaverlabs/lifesaver-trailblazer-hub/blob/main/dokumentation/QALY-MODEL-BIBLIOGRAPHY.md" target="_blank" style={{ color: '#8b949e' }}>Model Sources & Bibliography</a> |
            <a href="https://www.blesseddialekt.org/dictionary?entry=bleader" target="_blank" style={{ color: '#ffc857' }}> Bleading</a> |
            <a href="/open-source-acknowledgments" style={{ color: '#8b949e' }}>♥ Open Source</a>
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 8, color: '#484f58' }}>
            Map projection: Gall-Peters (equal-area cylindrical) | Orientation: South-up | Cities: &ge;25,000 population
          </p>
        </footer>
      </main>
    </div>
  );
}
