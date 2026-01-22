import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { geoCylindricalEqualArea } from 'd3-geo-projection';
import { geoCentroid, geoBounds } from 'd3-geo';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- 1. THE COMPREHENSIVE ENDONYM DATABASE ---
const endonymMap: Record<string, string> = {
  // A
  "Afghanistan": "Afġānistān", "Albania": "Shqipëria", "Algeria": "Dzayer", 
  "Andorra": "Andorra", "Angola": "Angola", "Antigua and Barbuda": "Antigua and Barbuda",
  "Argentina": "Argentina", "Armenia": "Hayastan", "Australia": "Australia", 
  "Austria": "Österreich", "Azerbaijan": "Azərbaycan",
  // B
  "Bahamas": "Bahamas", "Bahrain": "Al-Baḥrayn", "Bangladesh": "Bangla Desh", 
  "Barbados": "Barbados", "Belarus": "Bielaruś", "Belgium": "België / Belgique", 
  "Belize": "Belize", "Benin": "Bénin", "Bhutan": "Druk Yul", 
  "Bolivia": "Wuliwya", "Bosnia and Herzegovina": "Bosna i Hercegovina", 
  "Botswana": "Botswana", "Brazil": "Brasil", "Brunei": "Negara Brunei Darussalam", 
  "Bulgaria": "Bŭlgariya", "Burkina Faso": "Burkina Faso", "Burundi": "Burundi",
  // C
  "Cambodia": "Kâmpŭchéa", "Cameroon": "Cameroun", "Canada": "Canada", 
  "Cape Verde": "Cabo Verde", "Central African Republic": "Ködörösêse tî Bêafrîka", 
  "Chad": "Tchad", "Chile": "Chile", "China": "Zhōngguó", 
  "Colombia": "Colombia", "Comoros": "Komori", "Congo": "Kôngo", 
  "Democratic Republic of the Congo": "Repubilika ya Kôngo", "Costa Rica": "Costa Rica", 
  "Croatia": "Hrvatska", "Cuba": "Cuba", "Cyprus": "Kýpros", 
  "Czech Republic": "Česko",
  // D
  "Denmark": "Danmark", "Djibouti": "Jabuuti", "Dominica": "Dominica", 
  "Dominican Republic": "República Dominicana",
  // E
  "East Timor": "Timor-Leste", "Ecuador": "Ecuador", "Egypt": "Miṣr", 
  "El Salvador": "El Salvador", "Equatorial Guinea": "Guinea Ecuatorial", 
  "Eritrea": "Ertra", "Estonia": "Eesti", "Ethiopia": "Ītyōṗṗyā",
  // F
  "Fiji": "Viti", "Finland": "Suomi", "France": "France",
  // G
  "Gabon": "Gabon", "Gambia": "Gambia", "Georgia": "Sakartvelo",
  "Germany": "Deutschland", "Ghana": "Ghana", "Greece": "Hellas",
  "Greenland": "Kalaallit Nunaat", "Grenada": "Grenada", "Guatemala": "Guatemala",
  "Guinea": "Guinée", "Guinea-Bissau": "Guiné-Bissau", "Guyana": "Guyana",
  // H
  "Haiti": "Ayiti", "Honduras": "Honduras", "Hungary": "Magyarország",
  // I
  "Iceland": "Ísland", "India": "Bhārat", "Indonesia": "Indonesia", 
  "Iran": "Īrān", "Iraq": "Al-ʿIrāq", "Ireland": "Éire", 
  "Israel": "Yisra'el", "Italy": "Italia", "Ivory Coast": "Côte d'Ivoire",
  // J
  "Jamaica": "Jamaica", "Japan": "Nippon", "Jordan": "Al-Urdun",
  // K
  "Kazakhstan": "Qazaqstan", "Kenya": "Kenya", "Kiribati": "Kiribati", 
  "Kosovo": "Kosova", "Kuwait": "Al-Kuwayt", "Kyrgyzstan": "Kyrgyzstan",
  // L
  "Laos": "Lao", "Latvia": "Latvija", "Lebanon": "Lubnān", 
  "Lesotho": "Lesotho", "Liberia": "Liberia", "Libya": "Lībiyā", 
  "Liechtenstein": "Liechtenstein", "Lithuania": "Lietuva", "Luxembourg": "Lëtzebuerg",
  // M
  "Macedonia": "Severna Makedonija", "Madagascar": "Madagasikara", "Malawi": "Malawi", 
  "Malaysia": "Malaysia", "Maldives": "Dhivehi Raajje", "Mali": "Mali", 
  "Malta": "Malta", "Marshall Islands": "Aorōkin Ṃajeḷ", "Mauritania": "Mūrītānyā", 
  "Mauritius": "Maurice", "Mexico": "México", "Micronesia": "Micronesia", 
  "Moldova": "Moldova", "Monaco": "Monaco", "Mongolia": "Mongol Uls", 
  "Montenegro": "Crna Gora", "Morocco": "Al-Maġrib", "Mozambique": "Moçambique", 
  "Myanmar": "Myanma",
  // N
  "Namibia": "Namibia", "Nauru": "Naoero", "Nepal": "Nepāl", 
  "Netherlands": "Nederland", "New Zealand": "Aotearoa", "Nicaragua": "Nicaragua", 
  "Niger": "Niger", "Nigeria": "Nigeria", "North Korea": "Chosŏn", 
  "Norway": "Norge / Noreg",
  // O
  "Oman": "ʿUmān",
  // P
  "Pakistan": "Pākistān", "Palau": "Belau", "Palestine": "Filasṭīn", 
  "Panama": "Panamá", "Papua New Guinea": "Papua Niugini", "Paraguay": "Paraguái", 
  "Peru": "Perú", "Philippines": "Pilipinas", "Poland": "Polska", 
  "Portugal": "Portugal",
  // Q
  "Qatar": "Qaṭar",
  // R
  "Romania": "România", "Russia": "Rossiya", "Rwanda": "Rwanda",
  // S
  "Saint Kitts and Nevis": "Saint Kitts and Nevis", "Saint Lucia": "Saint Lucia", 
  "Saint Vincent and the Grenadines": "Saint Vincent and the Grenadines", 
  "Samoa": "Samoa", "San Marino": "San Marino", "Sao Tome and Principe": "São Tomé e Príncipe", 
  "Saudi Arabia": "Al-Suwudiyyah", "Senegal": "Sénégal", "Serbia": "Srbija", 
  "Seychelles": "Seychelles", "Sierra Leone": "Sierra Leone", "Singapore": "Singapura", 
  "Slovakia": "Slovensko", "Slovenia": "Slovenija", "Solomon Islands": "Solomon Islands", 
  "Somalia": "Soomaaliya", "South Africa": "Azania", "South Korea": "Hanguk", 
  "South Sudan": "South Sudan", "Spain": "España", "Sri Lanka": "Sri Lanka", 
  "Sudan": "As-Sudan", "Suriname": "Suriname", "Swaziland": "Eswatini", 
  "Sweden": "Sverige", "Switzerland": "Schweiz", "Syria": "Sūriyā",
  // T
  "Taiwan": "Zhōnghuá Mínguó", "Tajikistan": "Tojikiston", "Tanzania": "Tanzania", 
  "Thailand": "Mueang Thai", "Togo": "Togo", "Tonga": "Tonga", 
  "Trinidad and Tobago": "Trinidad and Tobago", "Tunisia": "Tūnis", "Turkey": "Türkiye", 
  "Turkmenistan": "Türkmenistan", "Tuvalu": "Tuvalu",
  // U
  "Uganda": "Uganda", "Ukraine": "Ukrayina", "United Arab Emirates": "Al-Imārāt", 
  "United Kingdom": "United Kingdom", "United States of America": "United States", 
  "Uruguay": "Uruguay", "Uzbekistan": "O'zbekiston",
  // V
  "Vanuatu": "Vanuatu", "Vatican City": "Città del Vaticano", "Venezuela": "Venezuela", 
  "Vietnam": "Việt Nam",
  // Y
  "Yemen": "Al-Yaman",
  // Z
  "Zambia": "Zambia", "Zimbabwe": "Zimbabwe"
};

// --- 2. CONFIGURATION ---
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Gall-Peters (South-Up) - returns the projection directly for react-simple-maps v3
// Center on 0° longitude (Greenwich), cut at International Date Line (180°) in Pacific Ocean
// Rotation: [lambda, phi, gamma] = [longitude rotation, latitude flip, roll]
// Adjustable lambda to find the right seam position
const createGallPetersProjection = (width: number, height: number, rotationLambda: number) => {
  return geoCylindricalEqualArea()
    .parallel(45)
    .rotate([rotationLambda, 180, 0]) // rotationLambda is adjustable, 180° flips for south-up
    .translate([width / 2, height / 2])
    .scale(width / 5.5);
};

const BlessedMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [showEndonyms, setShowEndonyms] = useState(true);
  const [rotation, setRotation] = useState(0); // Adjustable rotation for testing

  const handleMoveEnd = (position: { coordinates: [number, number], zoom: number }) => {
    setPosition(position);
  };

  return (
    <div className="w-full h-[70vh] bg-[#1a1a1a] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden rounded-lg">
      
      {/* UI: Title Card & Toggle */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-3 max-w-sm">
        
        {/* Title */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-sm border-l-4 border-amber-500 shadow-2xl">
          <h2 className="text-xl font-bold text-gray-100 tracking-wider font-serif uppercase mb-2">
            Organization of Kartographers
          </h2>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 uppercase">
              West Wing Mode
            </span>
            <span className="text-amber-500/80 text-xs tracking-widest uppercase">
              Gall-Peters (South-Up)
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed font-light">
            Toggle below to compare the <span className="text-amber-500">Blesséd Endonyms</span> (how people name themselves) 
            with the <span className="text-slate-400">Standard Exonyms</span> (how outsiders name them).
          </p>
        </div>

        {/* The Toggle Switch */}
        <button 
          onClick={() => setShowEndonyms(!showEndonyms)}
          aria-pressed={showEndonyms}
          aria-label={`Toggle map labels. Currently showing ${showEndonyms ? 'Blesséd Endonyms' : 'American Standard Exonyms'}`}
          className={`
            relative overflow-hidden group p-3 rounded-sm border-l-4 shadow-xl text-left transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900
            ${showEndonyms 
              ? "bg-amber-900/60 border-amber-400 hover:bg-amber-900/80" 
              : "bg-slate-700/80 border-slate-400 hover:bg-slate-700"}
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-gray-200 mb-1">
                Active Dialekt:
              </div>
              <div className={`text-base font-bold font-mono transition-colors ${showEndonyms ? "text-amber-300" : "text-white"}`}>
                {showEndonyms ? "BLESSÉD ENDONYMS" : "AMERICAN STANDARD"}
              </div>
            </div>
            {/* Visual Indicator of Switch */}
            <div 
              className="w-12 h-6 bg-black/50 rounded-full relative ml-4 border border-white/20"
              aria-hidden="true"
            >
              <div 
                className={`
                  absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 shadow-md
                  ${showEndonyms ? "right-0.5 bg-amber-400" : "left-0.5 bg-gray-300"}
                `}
              />
            </div>
          </div>
        </button>

        {/* Globe Seam Control - because Earth is round, the seam is arbitrary */}
        <div className="bg-gray-800/90 backdrop-blur-md px-3 py-2 rounded-sm border border-gray-500 shadow-lg">
          <label htmlFor="rotation-slider" className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-200">🌍 Edge of the World™</span>
            <span className="text-[10px] text-gray-400 italic">(jump-skare for flat-earthers only)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              id="rotation-slider"
              type="range"
              min="-180"
              max="180"
              step="5"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              aria-valuemin={-180}
              aria-valuemax={180}
              aria-valuenow={rotation}
              aria-label="Map rotation in degrees"
              className="flex-1 h-2 accent-amber-400 cursor-pointer"
            />
            <span className="text-amber-300 font-mono text-xs w-12 text-right" aria-live="polite">{rotation}°</span>
          </div>
        </div>
      </div>

      {/* THE MAP */}
      <div className="w-full h-full border border-gray-700 bg-[#a4b6c3] relative overflow-hidden rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <ComposableMap
          projection={createGallPetersProjection(800, 600, rotation)}
          width={800}
          height={600}
          className="w-full h-full"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={handleMoveEnd}
            minZoom={1}
            maxZoom={40}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                // Separate render: shapes first, then labels on top
                const shapes = geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey + "-shape"}
                    geography={geo}
                    fill="#d6cbb6"
                    stroke="#8a7e68"
                    strokeWidth={0.3 / position.zoom}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#c2b59b", outline: "none", cursor: "crosshair" },
                      pressed: { fill: "#a3967d", outline: "none" },
                    }}
                  />
                ));

                const labels = geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  
                  const label = showEndonyms 
                    ? (endonymMap[countryName] || countryName) 
                    : countryName;

                  // Calculate country bounds for dynamic sizing
                  const bounds = geoBounds(geo);
                  const countryWidth = Math.abs(bounds[1][0] - bounds[0][0]); // longitude span in degrees
                  const countryHeight = Math.abs(bounds[1][1] - bounds[0][1]); // latitude span in degrees
                  
                  // Estimate character width (rough approximation for monospace)
                  const labelLength = label.length;
                  const charWidthRatio = 0.55;
                  
                  // Calculate base font size that fits within country dimensions (in map units)
                  // Scale factor converts degrees to approximate SVG units for this projection
                  const scaleFactor = 2.5;
                  const widthBasedSize = (countryWidth * scaleFactor) / (labelLength * charWidthRatio);
                  const heightBasedSize = (countryHeight * scaleFactor) * 0.5;
                  
                  // Use the smaller constraint as base size
                  const baseSize = Math.min(widthBasedSize, heightBasedSize);
                  
                  // Zoom-level minimum font size table for legibility
                  // At higher zoom levels, we allow smaller minimum fonts since you're zoomed in
                  const zoomMinFontTable: Record<number, number> = {
                    1: 1.5,    // At zoom 1, minimum 1.5px
                    2: 1.2,    // At zoom 2, minimum 1.2px
                    3: 1.0,    // At zoom 3, minimum 1.0px
                    4: 0.8,    // At zoom 4, minimum 0.8px
                    5: 0.7,    // At zoom 5, minimum 0.7px
                    6: 0.6,    // At zoom 6+, minimum 0.6px
                  };
                  
                  // Get minimum font size for current zoom level
                  const zoomLevel = Math.min(6, Math.max(1, Math.floor(position.zoom)));
                  const minFontForZoom = zoomMinFontTable[zoomLevel] || 0.6;
                  
                  // Dampen shrinking for smaller countries: use sqrt to slow down shrinking rate
                  // Smaller baseSize countries shrink less aggressively
                  const shrinkDamping = Math.sqrt(baseSize / 10); // Normalized dampening factor
                  const dampedZoom = 1 + (position.zoom - 1) * Math.min(1, shrinkDamping);
                  
                  // Scale with damped zoom factor
                  const fontSize = baseSize / dampedZoom;
                  
                  // Clamp to zoom-appropriate minimum and reasonable maximum
                  const maxFontSize = 25;
                  const clampedFontSize = Math.max(minFontForZoom, Math.min(maxFontSize, fontSize));
                  
                  // Show label if country is large enough to display meaningfully
                  const isVisible = countryWidth > 0.5;

                  if (!isVisible) return null;

                  return (
                    <Marker key={geo.rsmKey + "-label"} coordinates={geoCentroid(geo)}>
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform="rotate(180) scale(-1, -1)"
                        style={{
                          fontFamily: '"Courier New", monospace',
                          fill: showEndonyms ? "#2c2822" : "#555",
                          fontSize: `${clampedFontSize}px`,
                          fontWeight: "bold",
                          pointerEvents: "none",
                          opacity: 0.85,
                        }}
                      >
                        {label}
                      </text>
                    </Marker>
                  );
                });

                return (
                  <>
                    {shapes}
                    {labels}
                  </>
                );
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 flex flex-col items-end pointer-events-none opacity-60">
           <div className="flex flex-col items-center gap-1">
             <span className="text-3xl font-serif font-bold text-slate-800">S</span>
             <div className="h-16 w-0.5 bg-slate-800"></div>
             <span className="text-3xl font-serif font-bold text-slate-800">N</span>
           </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4" role="group" aria-label="Map zoom controls">
        <button 
          onClick={() => setPosition(p => ({ ...p, zoom: p.zoom * 1.5 }))}
          aria-label="Zoom in"
          className="bg-gray-700 hover:bg-gray-600 text-white font-mono px-4 py-2 rounded-sm shadow-lg transition uppercase tracking-widest text-sm border border-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 min-w-[44px] min-h-[44px]"
        >
          (+)
        </button>
        <button 
          onClick={() => setPosition(p => ({ ...p, zoom: Math.max(1, p.zoom / 1.5) }))}
          aria-label="Zoom out"
          className="bg-gray-700 hover:bg-gray-600 text-white font-mono px-4 py-2 rounded-sm shadow-lg transition uppercase tracking-widest text-sm border border-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 min-w-[44px] min-h-[44px]"
        >
          (-)
        </button>
      </div>
    </div>
  );
};

const WestWingBlessedMap = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container px-6 py-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Lifesaver Labs
          </Button>
        </Link>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
          West Wing Mode: Blesséd Map
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A "Full-Transitioned Map" honoring how peoples name themselves, displayed with equal-area projection and South orientation.
        </p>
      </header>

      {/* Video Section */}
      <section className="container px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Cartographers for Social Equality⁵
          </h2>
          <p className="text-muted-foreground mb-6">
            This iconic scene from <em>The West Wing</em> brilliantly illustrates how our choice of map projection shapes our worldview—and why equal-area, South-up maps matter.
          </p>
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/AMfXVWFBrVo"
              title="Cartographers for Social Equality - The West Wing"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="container px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Interactive Blesséd Map
          </h2>
          <BlessedMap />
        </div>
      </section>

      {/* Priority Endonym Adoption Section */}
      <section className="container px-6 py-8" aria-labelledby="priority-heading">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-6 md:p-8">
            <h2 id="priority-heading" className="text-2xl font-display font-bold text-foreground mb-2 flex flex-wrap items-center gap-3">
              <span className="bg-primary text-primary-foreground text-sm font-bold px-3 py-1 uppercase rounded">Priority⁵</span>
              <span>Top 10 Kountries for Urgent Endonym Adoption</span>
            </h2>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              By shifting to endonyms for just these 10 nations, we kover the self-identifikation of over <strong className="text-foreground">4.7 billion souls</strong>—more than half of humanity.
            </p>
            
            {/* Accessible table */}
            <div className="overflow-x-auto -mx-2 px-2">
              <table className="w-full text-left border-collapse" role="table" aria-label="Top 10 countries by population for endonym adoption">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th scope="col" className="py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold w-12">#</th>
                    <th scope="col" className="py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold">Exonym → Endonym</th>
                    <th scope="col" className="py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold text-right">Souls</th>
                    <th scope="col" className="py-3 px-2 text-xs uppercase tracking-wider text-muted-foreground font-semibold w-20 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { rank: 1, exonym: "China", endonym: "Zhōngguó", souls: 1412, note: "Middle Kingdom", needsTransition: true },
                    { rank: 2, exonym: "India", endonym: "Bhārat", souls: 1408, note: "Land of Bharata", needsTransition: true },
                    { rank: 3, exonym: "United States", endonym: "United States", souls: 334, note: "Already uses endonym", needsTransition: false },
                    { rank: 4, exonym: "Indonesia", endonym: "Indonesia", souls: 277, note: "Already uses endonym", needsTransition: false },
                    { rank: 5, exonym: "Pakistan", endonym: "Pākistān", souls: 231, note: "Land of the Pure", needsTransition: true },
                    { rank: 6, exonym: "Brazil", endonym: "Brasil", souls: 215, note: "Brazilwood land", needsTransition: true },
                    { rank: 7, exonym: "Nigeria", endonym: "Nigeria", souls: 218, note: "Already uses endonym", needsTransition: false },
                    { rank: 8, exonym: "Bangladesh", endonym: "Bangla Desh", souls: 171, note: "Land of Bengal", needsTransition: true },
                    { rank: 9, exonym: "Russia", endonym: "Rossiya", souls: 144, note: "Land of the Rus", needsTransition: true },
                    { rank: 10, exonym: "Japan", endonym: "Nippon", souls: 125, note: "Origin of the Sun", needsTransition: true },
                  ].map((country) => (
                    <tr 
                      key={country.rank}
                      className={country.needsTransition ? "bg-primary/5" : "bg-muted/30"}
                    >
                      <td className="py-3 px-2 font-mono font-bold text-foreground">
                        {country.rank}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          {country.needsTransition ? (
                            <>
                              <span className="text-muted-foreground">{country.exonym}</span>
                              <span className="text-foreground hidden sm:inline" aria-hidden="true">→</span>
                              <span className="font-semibold text-foreground">{country.endonym}</span>
                            </>
                          ) : (
                            <span className="text-foreground">{country.endonym}</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground block mt-0.5">{country.note}</span>
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-semibold text-foreground">
                        {country.souls.toLocaleString()}M
                      </td>
                      <td className="py-3 px-2 text-center">
                        {country.needsTransition ? (
                          <span 
                            className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-primary/15 text-foreground border border-primary/30"
                            aria-label="Needs transition"
                          >
                            <span aria-hidden="true">◉</span> Action
                          </span>
                        ) : (
                          <span 
                            className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground"
                            aria-label="Already using endonym"
                          >
                            <span aria-hidden="true">✓</span> Done
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-border bg-muted/50">
                  <tr>
                    <td colSpan={2} className="py-3 px-2 text-sm text-foreground">
                      Souls requiring transition:
                    </td>
                    <td className="py-3 px-2 text-right font-mono font-bold text-foreground">
                      3,706M
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-primary/15 text-foreground border border-primary/30">
                        <span aria-hidden="true">◉</span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="py-3 px-2 text-sm text-muted-foreground">
                      Already using endonyms:
                    </td>
                    <td className="py-3 px-2 text-right font-mono font-semibold text-muted-foreground">
                      829M
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded bg-muted text-muted-foreground">
                        <span aria-hidden="true">✓</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-border">
                    <td colSpan={2} className="py-4 px-2 text-base font-semibold text-foreground">
                      Total souls in Top 10:
                    </td>
                    <td className="py-4 px-2 text-right font-mono font-bold text-lg text-foreground">
                      4,535M
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              * Population figures approximate (2023 estimates). "Souls" honors each individual's kulturel identity.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="container px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Full-Transitioned Map */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="bg-amber-500 text-black text-sm font-bold px-3 py-1 uppercase">Full-Transitioned</span>
              What is a "Full-Transitioned Map"?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This map represents the <strong>destination state</strong>—the world as it could be after a complete transition to endonym-based labeling and equal-area representation. We acknowledge that such a transition cannot happen overnight.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong>We can transition over years, even decades</strong>, gently given the relearning doses and social and administrative consistency⁵ required. Educational curricula, government documents, media style guides, and international standards would all need coordinated updates. This is a marathon, not a sprint.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The toggle feature allows you to switch between the <span className="text-amber-500 font-medium">Blesséd Endonyms</span> and the familiar American Standard exonyms—demonstrating both the destination and the starting point of this transition journey.
            </p>
          </div>

          {/* Gall-Peters Projection */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Why Gall-Peters Projection?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The familiar Mercator projection, created for 16th-century navigation, dramatically distorts the relative size of landmasses. Greenland appears as large as Africa, when in reality Africa is <strong>14 times larger</strong>. Europe and North America appear larger than they are, while the Global South is visually diminished.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The <strong>Gall-Peters projection</strong> is an equal-area cylindrical map projection. It preserves the accurate relative sizes of all countries and continents. When you see this map, you're seeing the world in its true proportions—Africa dominates as the massive continent it truly is, and smaller European nations appear appropriately modest.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Yes, Gall-Peters distorts shapes (countries appear stretched vertically near the equator). But we believe <strong>accurate size representation matters more</strong> for developing a fair mental model of our world.
            </p>
          </div>

          {/* South-Up Orientation */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Why South Above North?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              There is no scientific reason why North should be "up" on maps. In space, there is no up or down. The convention of North-up maps is a historical artifact, largely cemented by European cartographers who placed themselves at the top.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Flipping the map <strong>challenges our unconscious biases</strong>. The phrase "down under" for Australia, or describing development as nations "rising up," carries implicit hierarchies. When South is up, we must reckon with these embedded assumptions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The compass legend on this map shows <strong>"S" at top and "N" at bottom</strong>—a simple reminder that orientation is a choice, not a truth.
            </p>
          </div>

          {/* Endonyms vs Exonyms */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Why Endonyms Instead of Exonyms?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              An <strong>endonym</strong> is the name that local people use for their own place: <em>Deutschland</em>, <em>Nippon</em>, <em>Bhārat</em>, <em>Hellas</em>. An <strong>exonym</strong> is what outsiders call it: Germany, Japan, India, Greece.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Exonyms often originated from colonial encounters, trade relationships, or simple mispronunciations frozen into European languages. When we call a country by its endonym, we <strong>honor the self-identification of its people</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This map uses endonyms as the "Blesséd" default—<em>Suomi</em> for Finland, <em>Éire</em> for Ireland, <em>Druk Yul</em> for Bhutan, <em>Aotearoa</em> for New Zealand. The toggle lets you compare with familiar exonyms, revealing how much of our geographic vocabulary is actually <em>other people's names for places</em>.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Learning endonyms is an act of respect. It says: <em>"I see you as you see yourself."</em>
            </p>
          </div>

          {/* Design Goals */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Design Goals and Konstraints
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold">1.</span>
                <span><strong>Equal Representation:</strong> Every nation's landmass shown at accurate relative scale using Gall-Peters equal-area projection.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold">2.</span>
                <span><strong>Decolonized Orientation:</strong> South-up presentation challenges Northern-centric assumptions embedded in conventional cartography.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold">3.</span>
                <span><strong>Self-Identification First:</strong> Endonyms as the default, with exonyms available for comparison and transition learning.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold">4.</span>
                <span><strong>Progressive Disclosure:</strong> Zoom-based label visibility prevents overwhelming detail while rewarding exploration.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 font-bold">5.</span>
                <span><strong>Accessibility:</strong> High-contrast design, clear typography, and intuitive toggle controls for all users.</span>
              </li>
            </ul>
          </div>

          {/* Errors & Corrections */}
          <div className="bg-card border border-amber-500/30 rounded-lg p-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">
              Errors, Omissions & Corrections
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Creating a comprehensive endonym database is challenging. Languages have multiple writing systems,
              countries have multiple official languages, and even "official" names can be contested. We've made
              mistakes, and we want to be transparent about them. If you spot an error, please let us know.
            </p>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-amber-500">Known Corrections Made:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-red-400 font-mono text-sm">×</span>
                  <span>
                    <strong>Kalaallit Nunaat (Greenland):</strong> Our initial release omitted Greenland entirely from the endonym database.
                    The correct endonym is <em>Kalaallit Nunaat</em> in Kalaallisut, the sole official language of this
                    autonomous territory. We apologize for this oversight—erasing the indigenous name while discussing
                    decolonized cartography is precisely the kind of irony we should avoid.
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4 text-sm italic">
              This list will be updated as we discover and correct additional errors. Transparency about our mistakes
              is part of the learning process this map is meant to inspire.
            </p>
          </div>

        </div>
      </section>

      {/* Contribution Note */}
      <section className="container px-6 py-8 mt-8">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 text-center">
          <p className="text-foreground mb-4">
            <strong>See a mistaken Endonym label?</strong> We want to get this right. Please help us kontribute or korrekt at our GitHub repository⁵.
          </p>
          <a
            href="https://github.com/LifesaverLabs/lifesaver-trailblazer-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span>Kontribute or Korrekt on GitHub</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="container px-6 py-12 border-t border-border mt-12">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">
            Part of the <Link to="/" className="text-primary hover:underline">Lifesaver Labs</Link> civic innovation ecosystem
          </p>
          <p className="text-sm mb-3">
            "Cartographers for Social Equality" clip from <em>The West Wing</em>, Season 2, Episode 16: "Somebody's Going to Emergency, Somebody's Going to Jail"
          </p>
          <Link
            to="/open-source-acknowledgments"
            className="inline-flex items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors text-sm"
          >
            <Heart size={14} />
            <span>Built with open source</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default WestWingBlessedMap;
