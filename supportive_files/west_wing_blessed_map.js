import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from 'react-simple-maps';
import { geoCylindricalEqualArea } from 'd3-geo-projection';

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

const SouthUpMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [showEndonyms, setShowEndonyms] = useState(true); // Toggle State

  const handleMoveEnd = (position: { coordinates: any, zoom: any }) => {
    setPosition(position);
  };

  return (
    <div className="w-full h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-6 relative font-sans overflow-hidden">
      
      {/* UI: Title Card & Toggle */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-4 max-w-md">
        
        {/* Title */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-sm border-l-4 border-amber-500 shadow-2xl">
          <h1 className="text-2xl font-bold text-gray-100 tracking-wider font-serif uppercase mb-2">
            Organization of Kartographers
          </h1>
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
            relative overflow-hidden group p-4 rounded-sm border-l-4 shadow-xl text-left transition-all duration-300
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
              <div className={`text-lg font-bold font-mono transition-colors ${showEndonyms ? "text-amber-400" : "text-white"}`}>
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
                  
                  // LOGIC: Toggle between Map Lookup or Raw Data Name
                  const label = showEndonyms 
                    ? (endonymMap[countryName] || countryName) 
                    : countryName;

                  // Visibility Logic (Same as before)
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
                        <Marker coordinates={geo.properties.endonym_coords || require("d3-geo").geoCentroid(geo)}>
                          <text
                            textAnchor="middle"
                            style={{
                              fontFamily: '"Courier New", monospace',
                              fill: showEndonyms ? "#2c2822" : "#555", // Slightly different color for mode
                              fontSize: `${fontSize}px`,
                              fontWeight: "bold",
                              pointerEvents: "none",
                              opacity: 0.85,
                              transform: `rotate(180deg)`,
                              transition: "fill 0.3s ease" // Smooth color transition on toggle
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <button 
          onClick={() => setPosition(p => ({ ...p, zoom: p.zoom * 1.5 }))}
          className="bg-gray-800 hover:bg-gray-700 text-white font-mono px-6 py-3 rounded-sm shadow-lg transition uppercase tracking-widest text-xs border border-gray-600"
        >
          (+)
        </button>
        <button 
          onClick={() => setPosition(p => ({ ...p, zoom: Math.max(1, p.zoom / 1.5) }))}
          className="bg-gray-800 hover:bg-gray-700 text-white font-mono px-6 py-3 rounded-sm shadow-lg transition uppercase tracking-widest text-xs border border-gray-600"
        >
          (-)
        </button>
      </div>
    </div>
  );
};

export default SouthUpMap;