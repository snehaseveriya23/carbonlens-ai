import { useMemo, useState } from "react";
import { calculateSimulation } from "../utils/simulator";

export default function Simulator({
  footprintData,
  onBack,
  onNext,
}) {
  const [changes, setChanges] = useState({
    transportReduction: 0,
    energyReduction: 0,
    foodReduction: 0,
    wasteReduction: 0,
  });

  const simulation = useMemo(
    () =>
      calculateSimulation(
        footprintData,
        changes
      ),
    [footprintData, changes]
  );

  const {
    originalTotal,
    newTotal,
    savings,
    savingsPercent,
    newEcoScore,
  } = simulation;

  const impactMessage =
    savingsPercent < 10
      ? "Small improvements can add up over time."
      : savingsPercent <= 25
      ? "Great progress. You're moving toward a sustainable lifestyle."
      : "Outstanding impact reduction. Your future footprint is dramatically lower.";

  const updateValue = (key, value) => {
    setChanges((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  return (
    <section className="sim">
      <div className="sim__container">

        <div className="sim__hero">
          <span className="sim__eyebrow">
            Carbon Impact Simulator
          </span>

          <h2 className="sim__title">
            What If You Reduced Your Impact?
          </h2>

          <p className="sim__subtitle">
            Experiment with lifestyle changes and
            see your future carbon footprint instantly.
          </p>
        </div>

        <div className="sim__controls">

          <div className="sim__slider-card">
            <div className="sim__slider-header">
              <span>🚗 Transport Reduction</span>
              <strong>
                {changes.transportReduction}%
              </strong>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={changes.transportReduction}
              onChange={(e) =>
                updateValue(
                  "transportReduction",
                  e.target.value
                )
              }
            />
          </div>

          <div className="sim__slider-card">
            <div className="sim__slider-header">
              <span>⚡ Energy Reduction</span>
              <strong>
                {changes.energyReduction}%
              </strong>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={changes.energyReduction}
              onChange={(e) =>
                updateValue(
                  "energyReduction",
                  e.target.value
                )
              }
            />
          </div>

          <div className="sim__slider-card">
            <div className="sim__slider-header">
              <span>🍽 Food Reduction</span>
              <strong>
                {changes.foodReduction}%
              </strong>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={changes.foodReduction}
              onChange={(e) =>
                updateValue(
                  "foodReduction",
                  e.target.value
                )
              }
            />
          </div>

          <div className="sim__slider-card">
            <div className="sim__slider-header">
              <span>♻ Waste Reduction</span>
              <strong>
                {changes.wasteReduction}%
              </strong>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={changes.wasteReduction}
              onChange={(e) =>
                updateValue(
                  "wasteReduction",
                  e.target.value
                )
              }
            />
          </div>

        </div>

        <div className="sim__results">

          <div className="sim__result-card">
            <span className="sim__label">
              Original Footprint
            </span>

            <div className="sim__value">
              {originalTotal.toLocaleString()}
            </div>

            <span className="sim__unit">
              kg CO₂ / year
            </span>
          </div>

          <div className="sim__result-card">
            <span className="sim__label">
              New Footprint
            </span>

            <div className="sim__value sim__value--green">
              {newTotal.toLocaleString()}
            </div>

            <span className="sim__unit">
              kg CO₂ / year
            </span>
          </div>

          <div className="sim__result-card">
            <span className="sim__label">
              CO₂ Saved
            </span>

            <div className="sim__value sim__value--green">
              {savings.toLocaleString()}
            </div>

            <span className="sim__unit">
              kg CO₂
            </span>
          </div>

          <div className="sim__result-card">
            <span className="sim__label">
              Improvement
            </span>

            <div className="sim__value sim__value--green">
              {savingsPercent}%
            </div>

            <span className="sim__unit">
              reduction
            </span>
          </div>

        </div>

        <div className="sim__score">

          <div className="sim__score-card">
            <div className="sim__score-box">
              <span>Current</span>
              <h3>{footprintData.ecoScore}</h3>
            </div>

            <div className="sim__score-arrow">
              →
            </div>

            <div className="sim__score-box sim__score-box--future">
              <span>Projected</span>
              <h3>{newEcoScore}</h3>
            </div>
          </div>

        </div>

        <div className="sim__impact">
          <div className="sim__impact-icon">
            🌎
          </div>

          <h3>Future Impact</h3>

          <p>{impactMessage}</p>
        </div>

        <div className="sim__actions">

          <button
            className="sim__btn sim__btn--secondary"
            onClick={onBack}
          >
            ← Back
          </button>

          <button
            className="sim__btn sim__btn--primary"
            onClick={onNext}
          >
            Continue to Weekly Challenge →
          </button>

        </div>

      </div>
    </section>
  );
}