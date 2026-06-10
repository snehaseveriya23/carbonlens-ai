import { useEffect, useRef } from "react";

const categories = [
  {
    icon: "🚗",
    label: "Transport",
    desc: "Flights, cars, public transit",
    color: "#3a86ff",
    bg: "rgba(58,134,255,0.08)",
  },
  {
    icon: "⚡",
    label: "Energy",
    desc: "Electricity & home heating",
    color: "#f4a261",
    bg: "rgba(244,162,97,0.08)",
  },
  {
    icon: "🍽",
    label: "Food",
    desc: "Diet & food consumption habits",
    color: "#52b788",
    bg: "rgba(82,183,136,0.08)",
  },
  {
    icon: "♻",
    label: "Waste & Recycling",
    desc: "Waste generation & recycling",
    color: "#9b72cf",
    bg: "rgba(155,114,207,0.08)",
  },
];

const stats = [
  { value: "4.7T", label: "Tons CO₂ avg/person/year" },
  { value: "68%", label: "Emissions from daily habits" },
  { value: "2°C", label: "Target we must stay under" },
];

export default function Hero({ onCalculate }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll(".hero__animate");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" id="home" ref={heroRef}>
      {/* Animated background blobs */}
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1"></div>
        <div className="hero__blob hero__blob--2"></div>
        <div className="hero__blob hero__blob--3"></div>
        <div className="hero__grid-pattern"></div>
      </div>

      <div className="hero__container">
        {/* Badge */}
        <div className="hero__badge hero__animate">
          <span className="hero__badge-dot"></span>
          AI-Powered Carbon Intelligence
        </div>

        {/* Headline */}
        <h1 className="hero__headline hero__animate">
          Measure <span className="hero__headline-gradient">Today.</span>
          <br />
          Reduce <span className="hero__headline-gradient">Tomorrow.</span>
          <br />
          Shape a{" "}
          <span className="hero__headline-underline">Greener Future.</span>
        </h1>

        {/* Description */}
        <p className="hero__description hero__animate">
          CarbonLens AI helps individuals understand, track, and reduce their
          carbon footprint through personalized insights and sustainable
          actions.
        </p>

        {/* CTA Buttons */}
        <div className="hero__actions hero__animate">
          <button className="hero__btn hero__btn--primary" onClick={onCalculate}>
            <span>Calculate My Footprint</span>
            <span className="hero__btn-arrow">→</span>
          </button>
          <button className="hero__btn hero__btn--secondary">
            Learn How It Works
          </button>
        </div>

        {/* Stats Row */}
        <div className="hero__stats hero__animate">
          {stats.map((s, i) => (
            <div className="hero__stat" key={i}>
              <span className="hero__stat-value">{s.value}</span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="hero__divider hero__animate">
          <span>Track emissions across 4 key lifestyle areas</span>
        </div>

        {/* Category Cards */}
        <div className="hero__categories hero__animate">
          {categories.map((cat, i) => (
            <div
              className="hero__cat-card"
              key={cat.label}
              style={{
                "--cat-color": cat.color,
                "--cat-bg": cat.bg,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="hero__cat-icon">{cat.icon}</div>
              <div className="hero__cat-info">
                <span className="hero__cat-label">{cat.label}</span>
                <span className="hero__cat-desc">{cat.desc}</span>
              </div>
              <div className="hero__cat-arrow">↗</div>
            </div>
          ))}
        </div>

        {/* Footer trust line */}
        <p className="hero__trust hero__animate">
          🔒 No account needed &nbsp;·&nbsp; 🌍 Works offline &nbsp;·&nbsp; ✅
          Free forever
        </p>
      </div>
    </section>
  );
}
