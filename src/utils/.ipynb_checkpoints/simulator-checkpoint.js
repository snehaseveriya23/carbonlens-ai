// ============================================================
// simulator.js — CarbonLens AI
// Lifestyle Impact Simulation Engine
// ============================================================

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function calculateSimulation(footprintData, changes) {
  const {
    transport,
    energy,
    food,
    waste,
    total,
  } = footprintData;

  const transportReduction = clamp(changes.transportReduction);
  const energyReduction = clamp(changes.energyReduction);
  const foodReduction = clamp(changes.foodReduction);
  const wasteReduction = clamp(changes.wasteReduction);

  const newTransport =
    transport * (1 - transportReduction / 100);

  const newEnergy =
    energy * (1 - energyReduction / 100);

  const newFood =
    food * (1 - foodReduction / 100);

  const newWaste =
    waste * (1 - wasteReduction / 100);

  const newTotal =
    newTransport +
    newEnergy +
    newFood +
    newWaste;

  const savings = total - newTotal;

  const savingsPercent =
    total === 0
      ? 0
      : Math.round((savings / total) * 100);

  const newEcoScore = Math.min(
    100,
    Math.round(
      footprintData.ecoScore + savingsPercent * 0.8
    )
  );

  return {
    originalTotal: Math.round(total),
    newTotal: Math.round(newTotal),
    savings: Math.round(savings),
    savingsPercent,
    newEcoScore,
  };
}