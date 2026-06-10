// ============================================================
// Calculator.jsx — CarbonLens AI
// Collects user inputs across 4 emission categories.
// On submit, calls onCalculate(formData) with raw values.
// No calculation logic here — that lives in utils/calculator.js
// ============================================================

import { useState } from "react";

// ── Section config ──────────────────────────────────────────
// Each section has an id, icon, label, and a color accent.
// Used to render the progress pills at the top.
const SECTIONS = [
  { id: "transport",  icon: "🚗", label: "Transport",         color: "#3a86ff" },
  { id: "energy",     icon: "⚡", label: "Energy",            color: "#f4a261" },
  { id: "food",       icon: "🍽", label: "Food",              color: "#52b788" },
  { id: "waste",      icon: "♻", label: "Waste & Recycling", color: "#9b72cf" },
];

// ── Diet options ─────────────────────────────────────────────
const DIET_OPTIONS = [
  { value: "vegetarian",     icon: "🥦", label: "Vegetarian",     desc: "No meat or fish"      },
  { value: "mixed",          icon: "🥗", label: "Mixed",           desc: "Some meat & veggies"  },
  { value: "non-vegetarian", icon: "🍖", label: "Non-Vegetarian",  desc: "Regular meat eater"   },
];

// ── Recycling options ─────────────────────────────────────────
const RECYCLING_OPTIONS = [
  { value: "always",    icon: "✅", label: "Always",    desc: "I recycle everything" },
  { value: "sometimes", icon: "🔄", label: "Sometimes", desc: "When I remember"      },
  { value: "never",     icon: "🗑", label: "Never",     desc: "I don't recycle"      },
];

// ============================================================
// Reusable OptionCard component
// Renders a single selectable card (diet or recycling).
// Using a sub-component keeps the JSX below clean.
// ============================================================
function OptionCard({ opt, isSelected, onSelect, accentColor }) {
  return (
    <button
      type="button"                   // IMPORTANT: prevents triggering form submit
      className={`calc__option-card ${isSelected ? "calc__option-card--selected" : ""}`}
      style={{ "--opt-color": accentColor }}
      onClick={() => onSelect(opt.value)}
    >
      <span className="calc__option-icon">{opt.icon}</span>

      {/* Wrapper used on mobile to keep label+desc together in row layout */}
      <span className="calc__option-info">
        <span className="calc__option-label">{opt.label}</span>
        <span className="calc__option-desc">{opt.desc}</span>
      </span>

      {/* Green checkmark badge — only visible when selected */}
      {isSelected && <span className="calc__option-check">✓</span>}
    </button>
  );
}

// ============================================================
// Main Component
// Props:
//   onCalculate(formData) — called when form is submitted
//   onBack()              — called when "Go Back" is clicked
// ============================================================
export default function Calculator({ onCalculate, onBack }) {

  // ── Form state ──────────────────────────────────────────────
  // Single object holds all 5 fields. Simpler than 5 useState calls.
  const [formData, setFormData] = useState({
    transportKm:         "",   // string → converted to Number on submit
    publicTransportDays: "",
    electricityUsage:    "",
    dietType:            "",   // "vegetarian" | "mixed" | "non-vegetarian"
    recyclingHabit:      "",   // "always" | "sometimes" | "never"
  });

  // ── Validation errors ───────────────────────────────────────
  // Same keys as formData. Non-empty string = show error for that field.
  const [errors, setErrors] = useState({});

  // ── Active section pill tracker ──────────────────────────────
  const [activeSection, setActiveSection] = useState("transport");

  // ── Handler: number input change ────────────────────────────
  const handleNumberChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));   // clear error on type
  };

  // ── Handler: option card click ───────────────────────────────
  const handleOptionSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // ── Validation ───────────────────────────────────────────────
  // Builds an error object. Returns true only if it's empty.
  const validate = () => {
    const newErrors = {};

    if (formData.transportKm === "" || Number(formData.transportKm) < 0)
      newErrors.transportKm = "Please enter your daily car travel (0 if none).";

    if (
      formData.publicTransportDays === "" ||
      Number(formData.publicTransportDays) < 0 ||
      Number(formData.publicTransportDays) > 7
    )
      newErrors.publicTransportDays = "Enter a value between 0 and 7 days.";

    if (formData.electricityUsage === "" || Number(formData.electricityUsage) <= 0)
      newErrors.electricityUsage = "Please enter your monthly electricity usage.";

    if (!formData.dietType)
      newErrors.dietType = "Please select your diet type.";

    if (!formData.recyclingHabit)
      newErrors.recyclingHabit = "Please select your recycling habit.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // true = all valid
  };

  // ── Submit handler ───────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();          // stop browser from reloading the page
    if (!validate()) return;     // abort if any field fails validation

    // Coerce number strings → actual numbers before passing up
    const result = {
      transportKm:         Number(formData.transportKm),
      publicTransportDays: Number(formData.publicTransportDays),
      electricityUsage:    Number(formData.electricityUsage),
      dietType:            formData.dietType,
      recyclingHabit:      formData.recyclingHabit,
    };

    onCalculate(result);   // hand off to App.jsx
  };

  // ── JSX ──────────────────────────────────────────────────────
  return (
    <section className="calc" id="calculator">
      <div className="calc__container">

        {/* ── Page Header ── */}
        <div className="calc__header">
          <button className="calc__back-btn" onClick={onBack}>
            ← Go Back
          </button>
          <div className="calc__title-group">
            <span className="calc__eyebrow">Step 1 of 1</span>
            <h2 className="calc__title">Calculate Your Carbon Footprint</h2>
            <p className="calc__subtitle">
              Fill in your daily habits across the four categories below.
              We'll compute your personalized carbon score instantly.
            </p>
          </div>
        </div>

        {/* ── Section Progress Pills ── */}
        <div className="calc__progress">
          {SECTIONS.map((s) => (
            <div
              key={s.id}
              className={`calc__pill ${activeSection === s.id ? "calc__pill--active" : ""}`}
              style={{ "--pill-color": s.color }}
            >
              <span>{s.icon}</span>
              <span className="calc__pill-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── The Form ── */}
        <form className="calc__form" onSubmit={handleSubmit} noValidate>

          {/* ════════════════════════════════════════
              SECTION 1 — TRANSPORT 🚗
          ════════════════════════════════════════ */}
          <div className="calc__card" onFocus={() => setActiveSection("transport")}>
            <div className="calc__card-header" style={{ "--section-color": "#3a86ff" }}>
              <div className="calc__card-icon">🚗</div>
              <div>
                <h3 className="calc__card-title">Transport</h3>
                <p className="calc__card-desc">How do you get around each day?</p>
              </div>
              <div className="calc__card-badge">Category 1</div>
            </div>

            {/* Two-column grid on desktop, stacks on mobile */}
            <div className="calc__fields calc__fields--two-col">

              {/* Daily car travel */}
              <div className="calc__field">
                <label className="calc__label" htmlFor="transportKm">
                  Daily Car Travel
                  <span className="calc__label-unit">(km/day)</span>
                </label>
                <p className="calc__field-hint">Enter 0 if you don't drive.</p>
                <div className="calc__input-wrap">
                  <span className="calc__input-prefix">🚗</span>
                  <input
                    id="transportKm"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 20"
                    className={`calc__input ${errors.transportKm ? "calc__input--error" : ""}`}
                    value={formData.transportKm}
                    onChange={(e) => handleNumberChange("transportKm", e.target.value)}
                  />
                  <span className="calc__input-suffix">km</span>
                </div>
                {errors.transportKm && (
                  <span className="calc__error">{errors.transportKm}</span>
                )}
              </div>

              {/* Public transport */}
              <div className="calc__field">
                <label className="calc__label" htmlFor="publicTransportDays">
                  Public Transport
                  <span className="calc__label-unit">(days/week)</span>
                </label>
                <p className="calc__field-hint">Bus, metro, or train (0–7 days).</p>
                <div className="calc__input-wrap">
                  <span className="calc__input-prefix">🚌</span>
                  <input
                    id="publicTransportDays"
                    type="number"
                    min="0"
                    max="7"
                    step="1"
                    placeholder="e.g. 3"
                    className={`calc__input ${errors.publicTransportDays ? "calc__input--error" : ""}`}
                    value={formData.publicTransportDays}
                    onChange={(e) => handleNumberChange("publicTransportDays", e.target.value)}
                  />
                  <span className="calc__input-suffix">days</span>
                </div>
                {errors.publicTransportDays && (
                  <span className="calc__error">{errors.publicTransportDays}</span>
                )}
              </div>

            </div>
          </div>

          {/* ════════════════════════════════════════
              SECTION 2 — ENERGY ⚡
          ════════════════════════════════════════ */}
          <div className="calc__card" onFocus={() => setActiveSection("energy")}>
            <div className="calc__card-header" style={{ "--section-color": "#f4a261" }}>
              <div className="calc__card-icon">⚡</div>
              <div>
                <h3 className="calc__card-title">Energy</h3>
                <p className="calc__card-desc">Your home electricity consumption</p>
              </div>
              <div className="calc__card-badge">Category 2</div>
            </div>

            <div className="calc__fields">
              <div className="calc__field">
                <label className="calc__label" htmlFor="electricityUsage">
                  Monthly Electricity Consumption
                  <span className="calc__label-unit">(kWh/month)</span>
                </label>
                <p className="calc__field-hint">
                  Check your electricity bill — typically 100–400 kWh/month for a home.
                </p>
                <div className="calc__input-wrap">
                  <span className="calc__input-prefix">💡</span>
                  <input
                    id="electricityUsage"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g. 150"
                    className={`calc__input ${errors.electricityUsage ? "calc__input--error" : ""}`}
                    value={formData.electricityUsage}
                    onChange={(e) => handleNumberChange("electricityUsage", e.target.value)}
                  />
                  <span className="calc__input-suffix">kWh</span>
                </div>
                {errors.electricityUsage && (
                  <span className="calc__error">{errors.electricityUsage}</span>
                )}
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════
              SECTION 3 — FOOD 🍽
          ════════════════════════════════════════ */}
          <div className="calc__card" onFocus={() => setActiveSection("food")}>
            <div className="calc__card-header" style={{ "--section-color": "#52b788" }}>
              <div className="calc__card-icon">🍽</div>
              <div>
                <h3 className="calc__card-title">Food</h3>
                <p className="calc__card-desc">Your typical diet and eating habits</p>
              </div>
              <div className="calc__card-badge">Category 3</div>
            </div>

            <div className="calc__fields">
              <div className="calc__field">
                <label className="calc__label">
                  Diet Type
                </label>
                <p className="calc__field-hint">
                  Select the option that best describes your regular diet.
                </p>
                <div className="calc__options calc__options--3">
                  {DIET_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      opt={opt}
                      isSelected={formData.dietType === opt.value}
                      onSelect={(val) => handleOptionSelect("dietType", val)}
                      accentColor="#52b788"
                    />
                  ))}
                </div>
                {errors.dietType && (
                  <span className="calc__error">{errors.dietType}</span>
                )}
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════
              SECTION 4 — WASTE & RECYCLING ♻
          ════════════════════════════════════════ */}
          <div className="calc__card" onFocus={() => setActiveSection("waste")}>
            <div className="calc__card-header" style={{ "--section-color": "#9b72cf" }}>
              <div className="calc__card-icon">♻</div>
              <div>
                <h3 className="calc__card-title">Waste & Recycling</h3>
                <p className="calc__card-desc">How you manage household waste</p>
              </div>
              <div className="calc__card-badge">Category 4</div>
            </div>

            <div className="calc__fields">
              <div className="calc__field">
                <label className="calc__label">
                  Recycling Habit
                </label>
                <p className="calc__field-hint">
                  How consistently do you recycle at home?
                </p>
                <div className="calc__options calc__options--3">
                  {RECYCLING_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      opt={opt}
                      isSelected={formData.recyclingHabit === opt.value}
                      onSelect={(val) => handleOptionSelect("recyclingHabit", val)}
                      accentColor="#9b72cf"
                    />
                  ))}
                </div>
                {errors.recyclingHabit && (
                  <span className="calc__error">{errors.recyclingHabit}</span>
                )}
              </div>
            </div>
          </div>

          {/* ── Submit Button ── */}
          <div className="calc__submit-wrap">
            <p className="calc__submit-note">
              🔒 Your data never leaves your device. No account needed.
            </p>
            <button type="submit" className="calc__submit-btn">
              <span>See My Carbon Footprint</span>
              <span className="calc__submit-arrow">→</span>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
}
