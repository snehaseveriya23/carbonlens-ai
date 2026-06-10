import { recommendations } from "../data/recommendations";

export default function Recommendations({
  footprintData,
  onBack,
  onNext,
}) {
  const category = footprintData.biggestSource.toLowerCase();

  const topRecommendations = recommendations
    .filter((item) => item.category === category)
    .slice(0, 3);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "rec__difficulty--easy";
      case "Medium":
        return "rec__difficulty--medium";
      default:
        return "rec__difficulty--hard";
    }
  };

  return (
    <section className="rec">
      <div className="rec__container">

        <div className="rec__hero">
          <span className="rec__eyebrow">
            Personalized Recommendations
          </span>

          <h2 className="rec__title">
            Your Personalized Action Plan
          </h2>

          <p className="rec__subtitle">
            These recommendations are generated based on your biggest
            carbon emission source.
          </p>
        </div>

        <div className="rec__grid">
          {topRecommendations.map((item) => (
            <article key={item.id} className="rec__card">

              <div className="rec__icon">
                {item.icon}
              </div>

              <h3 className="rec__card-title">
                {item.title}
              </h3>

              <p className="rec__description">
                {item.description}
              </p>

              <div className="rec__meta">

                <div className="rec__saving">
                  🌱 Save {item.savings}
                </div>

                <div
                  className={`rec__difficulty ${getDifficultyClass(
                    item.difficulty
                  )}`}
                >
                  {item.difficulty}
                </div>

              </div>
            </article>
          ))}
        </div>

        <div className="rec__cta">

          <button
            className="rec__btn rec__btn--secondary"
            onClick={onBack}
          >
            ← Back
          </button>

          <button
            className="rec__btn rec__btn--primary"
            onClick={onNext}
          >
            Continue to Simulator →
          </button>

        </div>

      </div>
    </section>
  );
}