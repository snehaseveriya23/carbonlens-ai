import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Calculator from "./components/Calculator";
import Dashboard from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import Simulator from "./components/Simulator";
import WeeklyChallenge from "./components/WeeklyChallenge";
import Success from "./components/Success";

import { calculateFootprint } from "./utils/calculator";

import "./App.css";

export default function App() {
  const [currentView, setCurrentView] = useState("hero");
  const [formData, setFormData] = useState(null);
  const [footprintData, setFootprintData] = useState(null);

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  // Hero → Calculator
  const handleStartCalculator = () => {
    setCurrentView("calculator");
    scrollTop();
  };

  // Calculator → Dashboard
  const handleCalculate = (data) => {
    setFormData(data);

    const result = calculateFootprint(data);
    setFootprintData(result);

    setCurrentView("dashboard");
    scrollTop();
  };

  // Calculator → Hero
  const handleBackToHero = () => {
    setCurrentView("hero");
    scrollTop();
  };

  // Dashboard → Calculator
  const handleRecalculate = () => {
    setCurrentView("calculator");
    scrollTop();
  };

  // Dashboard → Recommendations
  const handleShowRecommendations = () => {
    setCurrentView("recommendations");
    scrollTop();
  };

  // Recommendations → Dashboard
  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    scrollTop();
  };

        // Recommendations -> Simulator
  const handleShowSimulator = () => {
    setCurrentView("simulator");
    scrollTop();
  };
    
    // Simulator -> Recommendations
  const handleBackToRecommendations = () => {
    setCurrentView("recommendations");
    scrollTop();
  };

       // Simulator -> Weekly Challenge
  const handleShowWeeklyChallenge = () => {
    setCurrentView("weeklyChallenge");
    scrollTop();
  };
    
    // Weekly Challenge -> Simulator
  const handleBackToSimulator = () => {
    setCurrentView("simulator");
    scrollTop();
  };
    
    const handleFinishJourney = () => {
      setCurrentView("success");
      scrollTop();
    };
    
    const handleRestartJourney = () => {
      setCurrentView("hero");
      scrollTop();
    };
    
    const handleShareAchievement = () => {
      alert("🎉 Share feature coming soon!");
    };

  return (
    <div className="app">
      <Navbar />

      {currentView === "hero" && (
        <Hero onCalculate={handleStartCalculator} />
      )}

      {currentView === "calculator" && (
        <Calculator
          onCalculate={handleCalculate}
          onBack={handleBackToHero}
        />
      )}

      {currentView === "dashboard" && footprintData && (
        <Dashboard
          footprintData={footprintData}
          onRecalculate={handleRecalculate}
          onNext={handleShowRecommendations}
        />
      )}

      {currentView === "recommendations" && footprintData && (
        <Recommendations
          footprintData={footprintData}
          onBack={handleBackToDashboard}
          onNext={handleShowSimulator}
        />
      )}

       {currentView === "simulator" && (
          <Simulator
            footprintData={footprintData}
            onBack={handleBackToRecommendations}
            onNext={handleShowWeeklyChallenge}
          />
        )}

       {currentView === "weeklyChallenge" && (
           <WeeklyChallenge
             footprintData={footprintData}
             onBack={handleBackToSimulator}
             onFinish={handleFinishJourney}
          />
        )}

        {currentView === "success" && (
  <Success
    footprintData={footprintData}
    onRestart={handleRestartJourney}
    onShare={handleShareAchievement}
  />
)}
    </div>
  );
}