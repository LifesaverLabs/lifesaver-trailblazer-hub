import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import US_GEOJSON from '../assets/usGeoJSON';

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
  population: 21538187,
  bounds: { north: 31.0, south: 24.5, east: -80.0, west: -87.6 },
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
// CALCULATIONS
// ============================================================================

const calculateCoverage = (
  params: CoverageParams,
  installations: number,
  population: number
) => {
  const totalSetupCost = installations * params.setupCostPerUnit;
  const totalAnnualMaintenance = installations * params.monthlyMaintenancePerUnit * 12;
  const totalCostOverPeriod = totalSetupCost + totalAnnualMaintenance * params.yearsOfOperation;
  
  const annualArrests = population * params.annualCardiacArrestsPerCapita;
  const additionalSurvivors = annualArrests * ((params.improvedAEDRate - params.baselineAEDRate) / 100);
  
  const estimatedLivesSavedPerYear = additionalSurvivors;
  const estimatedQALYsPerYear = additionalSurvivors * params.averageQALYsPerSurvivor;
  const totalQALYsOverPeriod = estimatedQALYsPerYear * params.yearsOfOperation;
  
  const economicValueGenerated = totalQALYsOverPeriod * params.qalyValueUSD;
  const returnOnInvestment = ((economicValueGenerated - totalCostOverPeriod) / totalCostOverPeriod) * 100;
  
  return {
    totalInstallations: installations,
    totalSetupCost,
    totalAnnualMaintenance,
    totalCostOverPeriod,
    estimatedLivesSavedPerYear,
    estimatedQALYsPerYear,
    totalQALYsOverPeriod,
    economicValueGenerated,
    returnOnInvestment,
    costPerQALY: totalCostOverPeriod / totalQALYsOverPeriod,
    costPerLifeSaved: totalCostOverPeriod / (estimatedLivesSavedPerYear * params.yearsOfOperation),
    populationCovered: population,
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
// MAP COMPONENT WITH GALL-PETERS PROJECTION
// ============================================================================

interface MapProps {
  viewMode: 'florida' | 'us';
  locations: DroneLocation[];
  showCoverage: boolean;
}

const CoverageMap: React.FC<MapProps> = ({ viewMode, locations, showCoverage }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const [transform, setTransform] = useState(d3.zoomIdentity);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height: Math.max(500, height) });
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;
    
    svg.selectAll('*').remove();
    
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 30])
      .on('zoom', (event) => {
        setTransform(event.transform);
        mainGroup.attr('transform', event.transform.toString());
      });
    
    svg.call(zoom);
    
    const mainGroup = svg.append('g').attr('transform', transform.toString());
    
    if (viewMode === 'florida') {
      // Florida view - Mercator projection
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
          .attr('stroke-width', 2 / transform.k);
      }
      
      // Coverage circles
      if (showCoverage) {
        locations.forEach(loc => {
          const point = projection([loc.lng, loc.lat]);
          if (!point) return;
          
          mainGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(4, 25 / transform.k))
            .attr('fill', 'rgba(0, 217, 255, 0.08)')
            .attr('stroke', 'rgba(0, 217, 255, 0.3)')
            .attr('stroke-width', 0.5 / transform.k);
        });
      }
      
      // Drone markers
      locations.forEach(loc => {
        const point = projection([loc.lng, loc.lat]);
        if (!point) return;
        
        mainGroup.append('circle')
          .attr('cx', point[0])
          .attr('cy', point[1])
          .attr('r', Math.max(1, 2.5 / transform.k))
          .attr('fill', '#ff6b6b')
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.3 / transform.k);
      });
      
    } else {
      // US + Territories view with GALL-PETERS equal-area for main map
      // Using Albers USA for practical rendering
      
      const mainProjection = d3.geoAlbersUsa()
        .scale(width * 1.0)
        .translate([width / 2, height * 0.45]);
      
      const mainPath = d3.geoPath().projection(mainProjection);
      
      // Filter to continental features only for main map
      const continentalFeatures = US_GEOJSON.features.filter(
        f => !f.properties?.isTerritory && !f.properties?.isNonContiguous
      );
      
      // Draw all continental states
      continentalFeatures.forEach(feature => {
        const density = (feature.properties?.pop || 0) / (feature.properties?.area || 1);
        const fillOpacity = Math.min(0.35, 0.05 + density / 300);
        
        mainGroup.append('path')
          .datum(feature)
          .attr('d', mainPath as any)
          .attr('fill', `rgba(78, 205, 196, ${fillOpacity})`)
          .attr('stroke', feature.properties?.abbr === 'FL' ? '#ff6b6b' : '#4ecdc4')
          .attr('stroke-width', (feature.properties?.abbr === 'FL' ? 2 : 0.8) / transform.k);
      });
      
      // Draw coverage on continental US
      const continentalLocations = locations.filter(loc => {
        const region = US_GEOJSON.features.find(f => f.properties?.name === loc.region);
        return region && !region.properties?.isTerritory && !region.properties?.isNonContiguous;
      });
      
      if (showCoverage) {
        continentalLocations.forEach(loc => {
          const point = mainProjection([loc.lng, loc.lat]);
          if (!point) return;
          
          mainGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(2, 15 / transform.k))
            .attr('fill', 'rgba(78, 205, 196, 0.06)')
            .attr('stroke', 'rgba(78, 205, 196, 0.2)')
            .attr('stroke-width', 0.3 / transform.k);
        });
      }
      
      continentalLocations.forEach(loc => {
        const point = mainProjection([loc.lng, loc.lat]);
        if (!point) return;
        
        mainGroup.append('circle')
          .attr('cx', point[0])
          .attr('cy', point[1])
          .attr('r', Math.max(0.6, 1.5 / transform.k))
          .attr('fill', '#f0883e')
          .attr('stroke', '#fff')
          .attr('stroke-width', 0.2 / transform.k);
      });
      
      // ========== INSETS FOR NON-CONTIGUOUS AREAS ==========
      
      const insets = [
        { abbr: 'AK', x: 0.05, y: 0.68, scale: 0.25, label: 'Alaska', color: '#4ecdc4' },
        { abbr: 'HI', x: 0.22, y: 0.78, scale: 1.2, label: 'Hawaiʻi', color: '#4ecdc4' },
        { abbr: 'PR', x: 0.70, y: 0.78, scale: 4, label: 'Puerto Rico', color: '#ffc857' },
        { abbr: 'VI', x: 0.88, y: 0.78, scale: 15, label: 'U.S. Virgin Islands', color: '#ffc857' },
        { abbr: 'GU', x: 0.04, y: 0.40, scale: 20, label: 'Guam', color: '#ffc857' },
        { abbr: 'AS', x: 0.04, y: 0.55, scale: 25, label: 'American Samoa', color: '#ffc857' },
        { abbr: 'MP', x: 0.04, y: 0.25, scale: 12, label: 'N. Mariana Islands', color: '#ffc857' },
      ];
      
      insets.forEach(({ abbr, x, y, scale, label, color }) => {
        const feature = US_GEOJSON.features.find(f => f.properties?.abbr === abbr);
        if (!feature) return;
        
        const insetW = width * 0.12;
        const insetH = height * 0.15;
        const insetX = width * x;
        const insetY = height * y;
        
        const insetGroup = mainGroup.append('g')
          .attr('transform', `translate(${insetX}, ${insetY})`);
        
        // Inset background
        insetGroup.append('rect')
          .attr('x', -4)
          .attr('y', -14)
          .attr('width', insetW + 8)
          .attr('height', insetH + 22)
          .attr('fill', 'rgba(10, 14, 18, 0.92)')
          .attr('stroke', color)
          .attr('stroke-width', 1.5 / transform.k)
          .attr('rx', 4);
        
        // Label
        insetGroup.append('text')
          .attr('x', insetW / 2)
          .attr('y', -2)
          .attr('text-anchor', 'middle')
          .attr('font-size', `${10 / transform.k}px`)
          .attr('font-weight', '600')
          .attr('fill', color)
          .text(label);
        
        // Population
        const pop = feature.properties?.pop || 0;
        insetGroup.append('text')
          .attr('x', insetW / 2)
          .attr('y', insetH + 10)
          .attr('text-anchor', 'middle')
          .attr('font-size', `${8 / transform.k}px`)
          .attr('fill', '#8b949e')
          .attr('font-family', 'JetBrains Mono, monospace')
          .text(`${formatNumber(pop)} people`);
        
        // Get center of feature for projection
        const coords = feature.geometry.coordinates[0] as [number, number][];
        const centerLng = coords.reduce((s, c) => s + c[0], 0) / coords.length;
        const centerLat = coords.reduce((s, c) => s + c[1], 0) / coords.length;
        
        const insetProjection = d3.geoMercator()
          .center([centerLng, centerLat])
          .scale(insetW * scale * 50)
          .translate([insetW / 2, insetH / 2]);
        
        const insetPath = d3.geoPath().projection(insetProjection);
        
        // Draw feature
        insetGroup.append('path')
          .datum(feature)
          .attr('d', insetPath as any)
          .attr('fill', `${color}33`)
          .attr('stroke', color)
          .attr('stroke-width', 1 / transform.k);
        
        // Draw coverage in inset
        const insetLocations = locations.filter(l => l.region === feature.properties?.name);
        
        if (showCoverage) {
          insetLocations.forEach(loc => {
            const point = insetProjection([loc.lng, loc.lat]);
            if (!point || point[0] < 0 || point[0] > insetW || point[1] < 0 || point[1] > insetH) return;
            
            insetGroup.append('circle')
              .attr('cx', point[0])
              .attr('cy', point[1])
              .attr('r', Math.max(2, 8 / transform.k))
              .attr('fill', `${color}22`)
              .attr('stroke', `${color}66`)
              .attr('stroke-width', 0.3 / transform.k);
          });
        }
        
        insetLocations.forEach(loc => {
          const point = insetProjection([loc.lng, loc.lat]);
          if (!point || point[0] < 0 || point[0] > insetW || point[1] < 0 || point[1] > insetH) return;
          
          insetGroup.append('circle')
            .attr('cx', point[0])
            .attr('cy', point[1])
            .attr('r', Math.max(0.8, 1.8 / transform.k))
            .attr('fill', color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 0.2 / transform.k);
        });
      });
      
      // Add state labels
      const topStates = continentalFeatures
        .filter(f => (f.properties?.pop || 0) > 5000000)
        .slice(0, 12);
      
      topStates.forEach(feature => {
        const coords = feature.geometry.coordinates[0] as [number, number][];
        const centerLng = coords.reduce((s, c) => s + c[0], 0) / coords.length;
        const centerLat = coords.reduce((s, c) => s + c[1], 0) / coords.length;
        const point = mainProjection([centerLng, centerLat]);
        if (!point) return;
        
        mainGroup.append('text')
          .attr('x', point[0])
          .attr('y', point[1])
          .attr('text-anchor', 'middle')
          .attr('font-size', `${8 / transform.k}px`)
          .attr('fill', '#6e7681')
          .attr('font-family', 'JetBrains Mono, monospace')
          .text(feature.properties?.abbr || '');
      });
    }
    
  }, [viewMode, locations, showCoverage, dimensions, transform]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 500 }}>
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

  const floridaResults = useMemo(() => calculateCoverage(params, floridaLocs.length, FLORIDA_STATS.population), [params, floridaLocs.length]);
  const usResults = useMemo(() => calculateCoverage(params, floridaLocs.length, usPopCovered), [params, floridaLocs.length, usPopCovered]);

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

        {/* Footer */}
        <footer style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 12, borderTop: '1px solid #21262d' }}>
          <p style={{ margin: 0, fontSize: 9, color: '#6e7681' }}>
            <a href="https://lifesaverlabs.org" target="_blank" style={{ color: '#00d9ff' }}>Lifesaver Labs PBC</a> | 
            Naybor SOS × Archer FRS | 
            <a href="https://www.blesseddialekt.org/dictionary?entry=bleader" target="_blank" style={{ color: '#ffc857' }}> Bleading</a>
          </p>
        </footer>
      </main>
    </div>
  );
}
