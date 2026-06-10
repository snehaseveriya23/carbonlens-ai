// ============================================================
// WeeklyChallenge.jsx — CarbonLens AI
// Gamified sustainability challenges
// ============================================================

export default function WeeklyChallenge({
  footprintData,
  onBack,
  onFinish,
}) {
  const challenges = [
    {
      id: 1,
      icon: "🚶",
      title: "Walk Instead Of Driving",
      description:
        "Replace short car trips with walking whenever possible this week.",
      reward: "+50 Eco Points",
      difficulty: "Easy",
    },
    {
      id: 2,
      icon: "🥗",
      title: "Meat-Free Day",
      description:
        "Choose plant-based meals for one full day and reduce food emissions.",
      reward: "+75 Eco Points",
      difficulty: "Medium",
    },
    {
      id: 3,
      icon: "💡",
      title: "Reduce Electricity Usage",
      description:
        "Turn off unused electronics and minimize energy consumption.",
      reward: "+60 Eco Points",
      difficulty: "Easy",
    },
    {
      id: 4,
      icon: "♻️",
      title: "Recycle Household Waste",
      description:
        "Properly sort and recycle household waste throughout the week.",
      reward: "+80 Eco Points",
      difficulty: "Medium",
    },
  ];

  return (
    <section className="weekly">
      <div className="weekly__container">

        {/* Hero */}

        <div className="weekly__hero">

          <span className="weekly__eyebrow">
            WEEKLY ECO CHALLENGE
          </span>

          <h2 className="weekly__title">
            Small Actions. Big Impact.
          </h2>

          <p className="weekly__subtitle">
            Complete challenges to reduce your footprint and earn eco points.
          </p>

        </div>

        {/* Progress */}

        <div className="weekly__progress">

          <div className="weekly__stat-card">
            <span className="weekly__stat-label">
              Current Streak
            </span>

            <div className="weekly__stat-value">
              5 Days
            </div>
          </div>

          <div className="weekly__stat-card">
            <span className="weekly__stat-label">
              Eco Points
            </span>

            <div className="weekly__stat-value">
              320
            </div>
          </div>

          <div className="weekly__stat-card">
            <span className="weekly__stat-label">
              Challenges Completed
            </span>

            <div className="weekly__stat-value">
              12
            </div>
          </div>

        </div>

        {/* Challenge Grid */}

        <div className="challenge__grid">

          {challenges.map((challenge) => (
            <article
              key={challenge.id}
              className="challenge__card"
            >

              <div className="challenge__icon">
                {challenge.icon}
              </div>

              <h3 className="challenge__title">
                {challenge.title}
              </h3>

              <p className="challenge__description">
                {challenge.description}
              </p>

              <div className="challenge__meta">

                <span className="eco__reward">
                  {challenge.reward}
                </span>

                <span
                  className={`eco__difficulty ${
                    challenge.difficulty === "Easy"
                      ? "eco__difficulty--easy"
                      : "eco__difficulty--medium"
                  }`}
                >
                  {challenge.difficulty}
                </span>

              </div>

              <button className="challenge__btn">
                Complete Challenge
              </button>

            </article>
          ))}

        </div>

        {/* Impact */}

        <div className="eco__impact">

          <div className="eco__impact-icon">
            🌎
          </div>

          <h3 className="eco__impact-title">
            Your potential impact this week:
          </h3>

          <div className="eco__impact-value">
            Save up to 150 kg CO₂
          </div>

        </div>

        {/* Actions */}

        <div className="weekly__actions">

          <button
            className="weekly__btn weekly__btn--secondary"
            onClick={onBack}
          >
            ← Back
          </button>

          <button
            className="weekly__btn weekly__btn--primary"
            onClick={onFinish}
          >
            Finish CarbonLens Journey →
          </button>

        </div>

      </div>
    </section>
  );
}