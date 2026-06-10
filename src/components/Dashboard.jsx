// ============================================================
// Dashboard.jsx — CarbonLens AI
// Displays the full carbon footprint result after calculation.
//
// Props:
//   footprintData — object returned by calculateFootprint()
//   onRecalculate — called when user clicks "Recalculate"
//   onNext        — called when user clicks "See Recommendations"
// ============================================================

// ── Grade config ─────────────────────────────────────────────
// Maps an ecoScore range to a letter grade, label, color, and message.
// We iterate top-down — first match wins.
const GRADES = [
  {
    min: 90, grade: "A",
    label: "Exceptional",
    color: "#2d6a4f",
    bg: "rgba(45,106,79,0.10)",
    ring: "#2d6a4f",
    message: "You're a sustainability champion! Your footprint is far below the global average.",
  },
  {
    min: 75, grade: "B",
    label: "Great",
    color: "#40916c",
    bg: "rgba(64,145,108,0.10)",
    ring: "#40916c",
    message: "Great effort! You're living well below the average carbon footprint.",
  },
  {
    min: 60, grade: "C",
    label: "Average",
    color: "#52b788",
    bg: "rgba(82,183,136,0.10)",
    ring: "#52b788",
    message: "You're around the global average. A few habit changes could make a big difference.",
  },
  {
    min: 40, grade: "D",
    label: "Needs Work",
    color: "#f4a261",
    bg: "rgba(244,162,97,0.10)",
    ring: "#f4a261",
    message: "Your footprint is above average. Let's identify easy wins to bring it down.",
  },
  {
    min: 0, grade: "F",
    label: "High Impact",
    color: "#e63946",
    bg: "rgba(230,57,70,0.10)",
    ring: "#e63946",
    message: "Your carbon footprint is significantly high. Small daily changes can lead to major reductions.",
  },
];

// ── Category display config ───────────────────────────────────
// Maps each footprint category to an icon and accent color.
const CATEGORY_CONFIG = {
  transport: { icon: "🚗", label: "Transport",         color: "#3a86ff", bg: "rgba(58,134,255,0.08)"  },
  energy:    { icon: "⚡", label: "Energy",            color: "#f4a261", bg: "rgba(244,162,97,0.08)"  },
  food:      { icon: "🍽", label: "Food",              color: "#52b788", bg: "rgba(82,183,136,0.08)"  },
  waste:     { icon: "♻", label: "Waste & Recycling", color: "#9b72cf", bg: "rgba(155,114,207,0.08)" },
};

// ── Biggest source messages ───────────────────────────────────
// Short contextual message shown on the "Biggest Source" card.
const SOURCE_MESSAGES = {
  Transport: "Consider carpooling, cycling, or public transit more often.",
  Energy:    "Switching to energy-efficient appliances can cut this significantly.",
  Food:      "Reducing red meat even 2 days a week makes a measurable impact.",
  Waste:     "Consistent recycling and composting are quick wins here.",
};

// ── Helper: get grade object for a score ─────────────────────
// Walks down GRADES array and returns the first entry where
// ecoScore >= entry.min. Since array is ordered high → low,
// the first match is always the correct grade.
function getGrade(ecoScore) {
  return GRADES.find((g) => ecoScore >= g.min) || GRADES[GRADES.length - 1];
}

// ── Helper: format kg CO₂ numbers nicely ─────────────────────
// 1200    → "1,200"
// 999.75  → "1,000"  (rounded)
function formatKg(value) {
  return Math.round(value).toLocaleString();
}

// ── Helper: calculate percentage of total ────────────────────
// Used for the emission bar widths inside breakdown cards.
function pct(value, total) {
  if (total === 0) return 0;
  return Math.min(100, Math.round((value / total) * 100));
}

// ── Helper: build SVG arc path for the score ring ────────────
// Draws a circular progress arc using SVG.
// percentage 0–100 controls how much of the circle is filled.
function buildArcPath(percentage, radius) {
  const circumference = 2 * Math.PI * radius;      // full circle length
  const filled = (percentage / 100) * circumference; // how much to fill
  // strokeDasharray: "filled unfilled" — draws filled portion then gap
  return { circumference, strokeDashoffset: circumference - filled };
}

// ============================================================
// Sub-component: ScoreRing
// SVG circular progress ring showing the eco score.
// ============================================================
function ScoreRing({ score, gradeObj }) {
  const radius = 54;
  const { circumference, strokeDashoffset } = buildArcPath(score, radius);
  const size = 140; // viewBox size

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="dash__score-ring"
      aria-label={`Eco score: ${score} out of 100`}
    >
      {/* Background track circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--green-mist)"
        strokeWidth="10"
      />
      {/* Animated filled arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={gradeObj.ring}
        strokeWidth="10"
        strokeLinecap="round"
        // SVG arcs start at 3 o'clock; rotate -90deg to start at 12 o'clock
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ transition: "stroke-dashoffset 1.2s ease" }}
      />
      {/* Score number in center */}
      <text
        x="50%"
        y="44%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="26"
        fontWeight="800"
        fontFamily="Syne, sans-serif"
        fill={gradeObj.color}
      >
        {score}
      </text>
      {/* "/100" sub-label */}
      <text
        x="50%"
        y="62%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="500"
        fontFamily="DM Sans, sans-serif"
        fill="#9aada0"
      >
        / 100
      </text>
    </svg>
  );
}

// ============================================================
// Sub-component: BreakdownCard
// One card for each emission category (Transport/Energy/Food/Waste).
// ============================================================
function BreakdownCard({ categoryKey, value, total }) {
  const config = CATEGORY_CONFIG[categoryKey];
  const percentage = pct(value, total);

  return (
    <div
      className="dash__breakdown-card"
      style={{ "--cat-color": config.color, "--cat-bg": config.bg }}
    >
      {/* Icon box */}
      <div className="dash__breakdown-icon">{config.icon}</div>

      {/* Label + value */}
      <div className="dash__breakdown-info">
        <span className="dash__breakdown-label">{config.label}</span>
        <span className="dash__breakdown-value">
          {formatKg(value)}
          <span className="dash__breakdown-unit"> kg CO₂</span>
        </span>
      </div>

      {/* Percentage badge */}
      <div className="dash__breakdown-pct">{percentage}%</div>

      {/* Progress bar — full width at bottom of card */}
      <div className="dash__breakdown-bar-track">
        <div
          className="dash__breakdown-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================
// Main Component — Dashboard
// ============================================================
export default function Dashboard({ footprintData, onRecalculate, onNext }) {

  // Destructure all values we need from props
  const { transport, energy, food, waste, total, ecoScore, biggestSource } = footprintData;

  // Get the grade object once — used in multiple places below
  const gradeObj = getGrade(ecoScore);

  // Normalise biggestSource to title-case for lookups
  // (calculator returns "Transport", but guard against lowercase too)
  const sourceKey = biggestSource.charAt(0).toUpperCase() + biggestSource.slice(1).toLowerCase();
  const sourceConfig = CATEGORY_CONFIG[biggestSource.toLowerCase()] || CATEGORY_CONFIG.transport;
  const sourceMessage = SOURCE_MESSAGES[sourceKey] || "Focus on reducing this category first.";

  // ── Motivational callout message based on eco score ──────────
  // Three tiers: great / average / needs improvement
  let calloutIcon, calloutTitle, calloutText;
  if (ecoScore >= 75) {
    calloutIcon  = "🌍";
    calloutTitle = "You're making a real difference!";
    calloutText  = "Your lifestyle choices are helping protect the planet. Keep inspiring others around you to do the same.";
  } else if (ecoScore >= 50) {
    calloutIcon  = "🌱";
    calloutTitle = "You're on the right track.";
    calloutText  = "With a few targeted changes in your highest-emission areas, you could significantly lower your footprint this year.";
  } else {
    calloutIcon  = "💡";
    calloutTitle = "Every action counts — start today.";
    calloutText  = "Even reducing your biggest emission source by 20% would have a meaningful impact. Small steps, taken consistently, create lasting change.";
  }

  // ── JSX ──────────────────────────────────────────────────────
  return (
    <section className="dash" id="dashboard">
      <div className="dash__container">

        {/* ── Page Header ── */}
        <div className="dash__header">
          <div className="dash__header-text">
            <span className="dash__eyebrow">Your Results</span>
            <h2 className="dash__title">Your Carbon Footprint Report</h2>
            <p className="dash__subtitle">
              Based on your daily habits, here's your estimated annual carbon footprint
              and personalised eco score.
            </p>
          </div>
          <button className="dash__recalc-btn" onClick={onRecalculate}>
            ← Recalculate
          </button>
        </div>

        {/* ════════════════════════════════════════
            ROW 1 — Three summary cards
        ════════════════════════════════════════ */}
        <div className="dash__summary-row">

          {/* ── Card 1: Eco Score ── */}
          <div
            className="dash__card dash__card--score"
            style={{ "--grade-color": gradeObj.color, "--grade-bg": gradeObj.bg }}
          >
            <div className="dash__card-label">Eco Score</div>

            <ScoreRing score={ecoScore} gradeObj={gradeObj} />

            {/* Grade badge */}
            <div
              className="dash__grade-badge"
              style={{ background: gradeObj.bg, color: gradeObj.color }}
            >
              <span className="dash__grade-letter">{gradeObj.grade}</span>
              <span className="dash__grade-label">{gradeObj.label}</span>
            </div>
            <p className="dash__grade-msg">{gradeObj.message}</p>
          </div>

          {/* ── Card 2: Total Emissions ── */}
          <div className="dash__card dash__card--total">
            <div className="dash__card-label">Total Emissions</div>
            <div className="dash__total-icon">🌫️</div>
            <div className="dash__total-value">
              {formatKg(total)}
              <span className="dash__total-unit">kg CO₂</span>
            </div>
            <div className="dash__total-sub">per year</div>

            {/* Context bar: how user compares to global average (4700 kg) */}
            <div className="dash__compare">
              <div className="dash__compare-label">
                <span>Your footprint</span>
                <span>Global avg: 4,700 kg</span>
              </div>
              <div className="dash__compare-track">
                <div
                  className="dash__compare-fill"
                  style={{ width: `${Math.min(100, pct(total, 4700))}%` }}
                />
                {/* Global average marker */}
                <div className="dash__compare-marker" style={{ left: "100%" }} />
              </div>
              <p className="dash__compare-note">
                {total < 4700
                  ? `✅ ${formatKg(4700 - total)} kg below global average`
                  : `⚠️ ${formatKg(total - 4700)} kg above global average`}
              </p>
            </div>
          </div>

          {/* ── Card 3: Biggest Source ── */}
          <div
            className="dash__card dash__card--source"
            style={{ "--source-color": sourceConfig.color, "--source-bg": sourceConfig.bg }}
          >
            <div className="dash__card-label">Biggest Source</div>
            <div className="dash__source-icon">{sourceConfig.icon}</div>
            <div className="dash__source-name">{sourceConfig.label}</div>
            <div className="dash__source-value">
              {formatKg(footprintData[biggestSource.toLowerCase()])}
              <span className="dash__source-unit"> kg CO₂/yr</span>
            </div>
            <p className="dash__source-msg">{sourceMessage}</p>
            <div
              className="dash__source-tag"
              style={{ background: sourceConfig.bg, color: sourceConfig.color }}
            >
              Priority area
            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════
            ROW 2 — Emission Breakdown Grid
        ════════════════════════════════════════ */}
        <div className="dash__section">
          <div className="dash__section-header">
            <h3 className="dash__section-title">Emission Breakdown</h3>
            <p className="dash__section-desc">
              Annual kg CO₂ across your four lifestyle categories
            </p>
          </div>

          <div className="dash__breakdown-grid">
            <BreakdownCard categoryKey="transport" value={transport} total={total} />
            <BreakdownCard categoryKey="energy"    value={energy}    total={total} />
            <BreakdownCard categoryKey="food"      value={food}      total={total} />
            <BreakdownCard categoryKey="waste"     value={waste}     total={total} />
          </div>
        </div>

        {/* ════════════════════════════════════════
            ROW 3 — Motivational Callout
        ════════════════════════════════════════ */}
        <div className="dash__callout">
          <div className="dash__callout-icon">{calloutIcon}</div>
          <div className="dash__callout-body">
            <h4 className="dash__callout-title">{calloutTitle}</h4>
            <p className="dash__callout-text">{calloutText}</p>
          </div>
        </div>

        {/* ── CTA Button ── */}
        <div className="dash__cta-wrap">
          <p className="dash__cta-note">
            Ready to lower your score? See your personalised action plan.
          </p>
          <button className="dash__cta-btn" onClick={onNext}>
            <span>See My Recommendations</span>
            <span className="dash__cta-arrow">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}
