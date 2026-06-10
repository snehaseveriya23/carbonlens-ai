// ============================================================
// calculator.js — CarbonLens AI
// Carbon Footprint Calculation Engine
//
// This is a PURE utility file:
//   - No React imports
//   - No UI code
//   - No side effects
//   - Just math in, results out
//
// Exported function: calculateFootprint(formData)
//
// All emission values are in kg CO₂ per YEAR.
//
// Real-world emission factors used:
//   Car travel  : 0.21 kg CO₂ per km  (avg petrol car, DEFRA 2023)
//   Electricity : 0.82 kg CO₂ per kWh (global avg grid intensity)
// ============================================================


// ── EMISSION CONSTANTS ────────────────────────────────────────
// Grouping all magic numbers at the top makes them easy to
// find, read, and change without hunting through the code.

// Transport
const CAR_EMISSION_FACTOR     = 0.21;   // kg CO₂ per km driven
const DAYS_IN_YEAR            = 365;    // daily km → annual total
const PUBLIC_TRANSPORT_SAVING = 50;     // kg CO₂ saved per day/week of public transit use

// Energy
const ELECTRICITY_EMISSION_FACTOR = 0.82;   // kg CO₂ per kWh
const MONTHS_IN_YEAR               = 12;    // monthly bill → annual total

// Food — annual kg CO₂ by diet type
const FOOD_EMISSIONS = {
  vegetarian:       400,   // plant-based: low land use, low methane
  mixed:            700,   // some meat: moderate footprint
  "non-vegetarian": 1000,  // regular red meat & dairy: highest footprint
};

// Waste — annual kg CO₂ by recycling habit
const WASTE_EMISSIONS = {
  always:    50,    // consistent recycler: diverts most waste from landfill
  sometimes: 150,   // occasional recycler
  never:     300,   // no recycling: all waste to landfill / incineration
};


// ============================================================
// STEP 1 — Transport Emissions
// ============================================================
// How it works:
//   1. Multiply daily km by the car emission factor to get
//      kg CO₂ per day driven.
//   2. Multiply by 365 to scale up to a full year.
//   3. Subtract the public transport saving:
//      each day/week of public transit use avoids 50 kg CO₂/year.
//   4. Clamp to 0 — transport emissions can't be negative.
//
// Example:
//   transportKm = 15, publicTransportDays = 3
//   base   = 15 × 0.21 × 365 = 1,149.75 kg
//   saving = 3 × 50           =   150.00 kg
//   result = 1,149.75 - 150   =   999.75 kg CO₂/year

function calcTransport(transportKm, publicTransportDays) {
  const base   = transportKm * CAR_EMISSION_FACTOR * DAYS_IN_YEAR;
  const saving = publicTransportDays * PUBLIC_TRANSPORT_SAVING;
  const result = base - saving;

  // Math.max(0, result) ensures we never return a negative number.
  // This guards against edge cases like 0 km driving + 7 days transit.
  return Math.max(0, result);
}


// ============================================================
// STEP 2 — Energy Emissions
// ============================================================
// How it works:
//   Monthly kWh × emission factor × 12 months = annual kg CO₂
//
// Example:
//   electricityUsage = 150 kWh/month
//   150 × 0.82 × 12 = 1,476 kg CO₂/year

function calcEnergy(electricityUsage) {
  return electricityUsage * ELECTRICITY_EMISSION_FACTOR * MONTHS_IN_YEAR;
}


// ============================================================
// STEP 3 — Food Emissions
// ============================================================
// Uses a lookup table (object) to map diet type → annual kg CO₂.
// The ?? operator is a safety fallback — if dietType is somehow
// undefined or misspelled, we return 0 instead of crashing.
//
// Example:
//   dietType = "mixed"  →  700 kg CO₂/year

function calcFood(dietType) {
  return FOOD_EMISSIONS[dietType] ?? 0;
}


// ============================================================
// STEP 4 — Waste Emissions
// ============================================================
// Same lookup pattern as food — maps recycling habit → annual kg CO₂.
//
// Example:
//   recyclingHabit = "sometimes"  →  150 kg CO₂/year

function calcWaste(recyclingHabit) {
  return WASTE_EMISSIONS[recyclingHabit] ?? 0;
}


// ============================================================
// STEP 5 — Eco Score
// ============================================================
// Formula:   ecoScore = 100 - (total / 50)
// Clamped:   always between 0 and 100
// Rounded:   no decimals (whole number score feels cleaner)
//
// How to interpret the score:
//   total =    0 kg CO₂  →  score = 100  (zero footprint — perfect)
//   total = 2000 kg CO₂  →  score =  60  (low impact lifestyle)
//   total = 3500 kg CO₂  →  score =  30  (average global footprint)
//   total = 5000 kg CO₂  →  score =   0  (very high footprint)
//
// Math.min + Math.max together form a "clamp":
//   Math.max(0, x)   → x can't go below 0
//   Math.min(100, x) → x can't go above 100

function calcEcoScore(total) {
  const raw = 100 - total / 50;
  return Math.min(100, Math.max(0, Math.round(raw)));
}


// ============================================================
// STEP 6 — Biggest Emission Source
// ============================================================
// Finds which of the 4 categories has the highest kg CO₂ value
// and returns its display name as a string.
//
// How Object.entries() + reduce() works:
//
//   Object.entries({ Transport: 999, Energy: 1476, Food: 700, Waste: 150 })
//   → [["Transport", 999], ["Energy", 1476], ["Food", 700], ["Waste", 150]]
//
//   reduce() runs a comparison tournament:
//     Round 1: ["Transport", 999]  vs ["Energy",    1476] → Energy wins
//     Round 2: ["Energy",   1476]  vs ["Food",       700] → Energy wins
//     Round 3: ["Energy",   1476]  vs ["Waste",      150] → Energy wins
//     Final winner: ["Energy", 1476]
//
//   const [biggestName] = ... destructures the array,
//   grabbing only index [0] (the name), discarding index [1] (the value).

function findBiggestSource(transport, energy, food, waste) {
  const categories = {
    Transport: transport,
    Energy:    energy,
    Food:      food,
    Waste:     waste,
  };

  const [biggestName] = Object.entries(categories).reduce(
    (winner, current) => (current[1] > winner[1] ? current : winner)
  );

  return biggestName; // "Transport" | "Energy" | "Food" | "Waste"
}


// ============================================================
// MAIN EXPORT — calculateFootprint(formData)
//
// This is the only function imported by other files.
// App.jsx calls it like this:
//
//   import { calculateFootprint } from "./utils/calculator";
//   const result = calculateFootprint(formData);
//   setFootprintData(result);
// ============================================================

export function calculateFootprint(formData) {

  // ── Destructure inputs ──────────────────────────────────────
  // Extract each field from the formData object by name.
  // This avoids repetitive formData.transportKm everywhere.
  const {
    transportKm,
    publicTransportDays,
    electricityUsage,
    dietType,
    recyclingHabit,
  } = formData;

  // ── Run each category calculation ───────────────────────────
  const transport = calcTransport(transportKm, publicTransportDays);
  const energy    = calcEnergy(electricityUsage);
  const food      = calcFood(dietType);
  const waste     = calcWaste(recyclingHabit);

  // ── Aggregate values ─────────────────────────────────────────
  const total         = transport + energy + food + waste;
  const ecoScore      = calcEcoScore(total);
  const biggestSource = findBiggestSource(transport, energy, food, waste);

  // ── Return the complete result object ────────────────────────
  // Dashboard.jsx will receive this as the `footprintData` prop
  // and use each field to render charts, scores, and stats.
  return {
    transport,      // kg CO₂/year — from car travel
    energy,         // kg CO₂/year — from electricity
    food,           // kg CO₂/year — from diet
    waste,          // kg CO₂/year — from waste & recycling
    total,          // kg CO₂/year — sum of all four
    ecoScore,       // 0–100       — higher is greener
    biggestSource,  // string      — category with highest emissions
  };
}
