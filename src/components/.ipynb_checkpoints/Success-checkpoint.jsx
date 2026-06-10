export default function Success({
  footprintData,
  onRestart,
  onShare,
}) {
  const {
    ecoScore,
    total,
    biggestSource,
  } = footprintData;

  const globalAverage = 4700;

  const comparisonText =
    total < globalAverage
      ? `${(globalAverage - total).toLocaleString()} kg below global average`
      : `${(total - globalAverage).toLocaleString()} kg above global average`;

  return (
    <section className="success">
      <div className="success__container">

        {/* Hero */}

        <div className="success__hero">

          <div className="success__emoji">
            🎉
          </div>

          <h1 className="success__title">
            Congratulations!
          </h1>

          <p className="success__subtitle">
            You completed your CarbonLens sustainability journey.
          </p>

        </div>

        {/* Main Success Card */}

        <div className="success-card success-card--hero">

          <div className="success-card__icon">
            🌱
          </div>

          <h2 className="success-card__title">
            Thank you for helping the planet.
          </h2>

          <p className="success-card__text">
            Every step you take toward sustainability contributes
            to a healthier future for generations to come.
          </p>

        </div>

        {/* Statistics */}

        <div className="success__stats">

          <div className="success-stat">
            <span className="success-stat__label">
              Eco Score
            </span>

            <div className="success-stat__value">
              {ecoScore}
            </div>

            <span className="success-stat__meta">
              Sustainability Rating
            </span>
          </div>

          <div className="success-stat">
            <span className="success-stat__label">
              Carbon Footprint
            </span>

            <div className="success-stat__value">
              {Math.round(total).toLocaleString()}
            </div>

            <span className="success-stat__meta">
              kg CO₂ / year
            </span>
          </div>

          <div className="success-stat">
            <span className="success-stat__label">
              Biggest Source
            </span>

            <div className="success-stat__value">
              {biggestSource}
            </div>

            <span className="success-stat__meta">
              Primary Impact Area
            </span>
          </div>

        </div>

        {/* Comparison */}

        <div className="success-card success-card--comparison">

          <div className="success-card__header">
            🌍 Global Average Comparison
          </div>

          <div className="success-card__comparison">

            <div className="success-card__comparison-item">
              <span>Your Footprint</span>
              <strong>
                {Math.round(total).toLocaleString()} kg
              </strong>
            </div>

            <div className="success-card__comparison-item">
              <span>Global Average</span>
              <strong>
                {globalAverage.toLocaleString()} kg
              </strong>
            </div>

          </div>

          <div className="success-card__badge">
            {comparisonText}
          </div>

        </div>

        {/* Impact Section */}

        <div className="success-card success-card--impact">

          <div className="success-card__impact-icon">
            🌍
          </div>

          <h3 className="success-card__impact-title">
            Every sustainable choice matters.
          </h3>

          <p className="success-card__impact-text">
            Small actions multiplied by millions of people
            create global change.
          </p>

        </div>

        {/* Actions */}

        <div className="success__actions">

          <button
            className="success-btn success-btn--secondary"
            onClick={onRestart}
          >
            Start Again
          </button>

          <button
            className="success-btn success-btn--primary"
            onClick={onShare}
          >
            Share Achievement
          </button>

        </div>

      </div>
    </section>
  );
}