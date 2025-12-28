import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { geoCylindricalEqualArea } from 'd3-geo-projection';
import { geoCentroid } from 'd3-geo';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
  "Grenada": "Grenada", "Guatemala": "Guatemala", "Guinea": "Guinée", 
  "Guinea-Bissau": "Guiné-Bissau", "Guyana": "Guyana",
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
  "Norway": "Norge",
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

// Gall-Peters (South-Up)
const projectionDefinition = () => 
  geoCylindricalEqualArea()
    .parallel(45)
    .rotate([0, 180, 0]) 
    .translate([400, 300])
    .scale(150);

const BlessedMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [showEndonyms, setShowEndonyms] = useState(true);

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
          className={`
            relative overflow-hidden group p-3 rounded-sm border-l-4 shadow-xl text-left transition-all duration-300
            ${showEndonyms 
              ? "bg-amber-900/40 border-amber-500 hover:bg-amber-900/60" 
              : "bg-slate-800/80 border-slate-500 hover:bg-slate-800"}
          `}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest opacity-70 text-white mb-1">
                Active Dialekt:
              </div>
              <div className={`text-base font-bold font-mono transition-colors ${showEndonyms ? "text-amber-400" : "text-white"}`}>
                {showEndonyms ? "BLESSÉD ENDONYMS" : "AMERICAN STANDARD"}
              </div>
            </div>
            {/* Visual Indicator of Switch */}
            <div className="w-12 h-6 bg-black/40 rounded-full relative ml-4 border border-white/10">
              <div 
                className={`
                  absolute top-0.5 w-5 h-5 rounded-full transition-all duration-300 shadow-md
                  ${showEndonyms ? "right-0.5 bg-amber-500" : "left-0.5 bg-slate-400"}
                `}
              />
            </div>
          </div>
        </button>
      </div>

      {/* THE MAP */}
      <div className="w-full h-full border border-gray-700 bg-[#a4b6c3] relative overflow-hidden rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <ComposableMap
          projection={projectionDefinition}
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
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  
                  const label = showEndonyms 
                    ? (endonymMap[countryName] || countryName) 
                    : countryName;

                  const hugeCountries = ["Russia", "Canada", "China", "United States of America", "Brazil", "Australia", "India", "Argentina", "Kazakhstan", "Algeria"];
                  const mediumCountries = ["Mexico", "Saudi Arabia", "Indonesia", "Libya", "Iran", "Mongolia", "Peru", "Chad", "Niger", "Angola", "Mali", "South Africa", "Colombia", "Ethiopia", "Bolivia", "Mauritania", "Egypt", "Tanzania", "Nigeria", "Venezuela", "Namibia", "Mozambique", "Pakistan", "Turkey", "Chile", "Zambia", "Myanmar", "Afghanistan", "Somalia", "Central African Republic", "South Sudan", "Ukraine", "Madagascar", "Botswana", "Kenya", "France", "Yemen", "Thailand", "Spain", "Turkmenistan", "Cameroon", "Papua New Guinea", "Sweden", "Uzbekistan", "Morocco", "Iraq", "Paraguay", "Zimbabwe", "Japan", "Germany", "Philippines", "Congo", "Finland", "Vietnam", "Malaysia", "Norway", "Ivory Coast", "Poland", "Oman", "Italy"];
                  
                  let isVisible = false;
                  if (hugeCountries.includes(countryName)) isVisible = true;
                  else if (mediumCountries.includes(countryName) && position.zoom >= 2) isVisible = true;
                  else if (position.zoom >= 6) isVisible = true;

                  const fontSize = Math.max(2, 6 / Math.sqrt(position.zoom)); 

                  return (
                    <React.Fragment key={geo.rsmKey}>
                      <Geography
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
                      
                      {isVisible && (
                        <Marker coordinates={geoCentroid(geo)}>
                          <text
                            textAnchor="middle"
                            style={{
                              fontFamily: '"Courier New", monospace',
                              fill: showEndonyms ? "#2c2822" : "#555",
                              fontSize: `${fontSize}px`,
                              fontWeight: "bold",
                              pointerEvents: "none",
                              opacity: 0.85,
                              transform: `rotate(180deg)`,
                              transition: "fill 0.3s ease"
                            }}
                          >
                            {label}
                          </text>
                        </Marker>
                      )}
                    </React.Fragment>
                  );
                })
              }
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
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <button 
          onClick={() => setPosition(p => ({ ...p, zoom: p.zoom * 1.5 }))}
          className="bg-gray-800 hover:bg-gray-700 text-white font-mono px-4 py-2 rounded-sm shadow-lg transition uppercase tracking-widest text-xs border border-gray-600"
        >
          (+)
        </button>
        <button 
          onClick={() => setPosition(p => ({ ...p, zoom: Math.max(1, p.zoom / 1.5) }))}
          className="bg-gray-800 hover:bg-gray-700 text-white font-mono px-4 py-2 rounded-sm shadow-lg transition uppercase tracking-widest text-xs border border-gray-600"
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

        </div>
      </section>

      {/* Footer */}
      <footer className="container px-6 py-12 border-t border-border mt-12">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">
            Part of the <Link to="/" className="text-primary hover:underline">Lifesaver Labs</Link> civic innovation ecosystem
          </p>
          <p className="text-sm">
            "Cartographers for Social Equality" clip from <em>The West Wing</em>, Season 2, Episode 16: "Somebody's Going to Emergency, Somebody's Going to Jail"
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WestWingBlessedMap;
