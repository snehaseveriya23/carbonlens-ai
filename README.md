# 🌱 CarbonLens AI

### Measure Today. Reduce Tomorrow. Shape a Greener Future.

CarbonLens AI is an intelligent sustainability platform that empowers individuals to understand, track, and reduce their carbon footprint through personalized insights, eco scoring, impact simulations, and actionable sustainability recommendations.

The platform transforms everyday lifestyle choices into meaningful environmental insights, helping users make smarter and greener decisions for a sustainable future.

---

# 🚀 Live Demo

### Deployed Application

https://carbonlens-ai.vercel.app

---

# 📖 Project Overview

CarbonLens AI analyzes a user's lifestyle habits across key emission categories and generates:

* Annual Carbon Footprint
* Eco Score Rating
* Emission Breakdown Analysis
* Personalized Action Plans
* Carbon Reduction Simulations
* Weekly Sustainability Challenges
* Sustainability Achievement Summary

The platform is designed to make environmental awareness simple, interactive, and actionable.

---

# 🎯 Chosen Vertical

### Sustainability & Climate Awareness

CarbonLens AI is built within the Sustainability & Climate Awareness domain to help individuals understand the environmental impact of their daily lifestyle choices and encourage sustainable behavior through data-driven insights and interactive experiences.

---

# ❗ Problem Statement

Many people want to live sustainably but struggle to understand how their daily activities contribute to carbon emissions.

Without clear visibility into their environmental impact, it becomes difficult to make informed decisions that reduce carbon footprints.

CarbonLens AI addresses this challenge by providing:

* Carbon footprint measurement
* Personalized sustainability recommendations
* Impact simulations
* Habit-building eco challenges
* Environmental awareness through actionable insights

---

# 🧠 Approach & Logic

The application collects user lifestyle information across four major carbon emission categories:

### 🚗 Transportation

Travel habits and vehicle usage.

### ⚡ Energy Consumption

Household electricity and energy usage.

### 🍽 Food Habits

Dietary choices and food consumption patterns.

### ♻ Waste Management

Recycling and waste disposal behaviors.

The collected inputs are processed to:

1. Calculate estimated annual carbon emissions.
2. Generate an Eco Score.
3. Identify the highest contributing emission source.
4. Recommend personalized sustainability actions.
5. Simulate future carbon reduction scenarios.
6. Encourage behavioral change through weekly challenges.

---

# ⚙️ How The Solution Works

## Step 1: Carbon Footprint Assessment

Users enter information about:

* Transportation habits
* Energy usage
* Food consumption
* Waste management practices

---

## Step 2: Intelligent Analysis

CarbonLens AI processes the data and calculates:

* Estimated Carbon Footprint
* Sustainability Score
* Emission Breakdown
* Largest Emission Source

---

## Step 3: Personalized Recommendations

The platform generates targeted recommendations based on the user's highest emission category.

Examples include:

* Energy-saving actions
* Sustainable transportation suggestions
* Eco-friendly dietary choices
* Waste reduction strategies

---

## Step 4: Impact Simulation

Users can experiment with sustainability improvements and instantly view:

* Potential carbon reduction
* Projected footprint
* Emission savings
* Future eco score

---

## Step 5: Weekly Eco Challenges

Users participate in sustainability-focused challenges such as:

* Walking instead of driving
* Meat-free days
* Reducing electricity consumption
* Recycling household waste

These challenges encourage long-term sustainable habits.

---

## Step 6: Sustainability Success Dashboard

The final success screen presents:

* Eco Score Summary
* Carbon Footprint Overview
* Global Comparison
* Sustainability Achievements
* Environmental Impact Insights

---

# ✨ Features

## 🧮 Carbon Footprint Calculator

Calculate annual carbon emissions based on:

* Transport habits
* Energy consumption
* Food choices
* Waste & Recycling practices

---

## 📊 Eco Score Dashboard

Visual insights including:

* Eco Score Rating
* Total Annual Emissions
* Biggest Emission Source
* Global Average Comparison
* Category-wise Emission Breakdown

---

## 🎯 Personalized Recommendations

Receive customized sustainability recommendations based on your highest carbon-emitting category.

---

## 🔬 Carbon Impact Simulator

Experiment with lifestyle changes and instantly visualize:

* Potential carbon reduction
* Future carbon footprint
* Improvement percentage
* Projected eco score

---

## 🏆 Weekly Eco Challenges

Gamified sustainability challenges designed to encourage positive environmental habits.

---

## 🎉 Success & Achievement Tracking

Celebrate environmental achievements through:

* Sustainability summaries
* Eco scores
* Impact statistics
* Environmental contribution insights

---

# 🛠 Tech Stack

## Frontend

* React.js
* Vite
* JavaScript (ES6+)

## Styling

* CSS3
* Responsive Design
* Glassmorphism UI
* Modern SaaS Design

## Development Tools

* Git
* GitHub
* Vercel

---

# 📁 Project Structure

```text
src/
├── components/
│   ├── Hero.jsx
│   ├── Navbar.jsx
│   ├── Calculator.jsx
│   ├── Dashboard.jsx
│   ├── Recommendations.jsx
│   ├── Simulator.jsx
│   ├── WeeklyChallenge.jsx
│   └── Success.jsx
│
├── data/
│   └── recommendations.js
│
├── utils/
│   ├── calculator.js
│   └── simulator.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

# 📌 Assumptions

* Carbon emission values are estimated using generalized emission factors.
* User-provided information is assumed to be accurate.
* Global comparison values represent average estimates and may vary across countries and regions.
* The application is intended for educational and sustainability awareness purposes.

---

# 🧪 Testing

The application was manually tested across all primary user flows:

### Tested Features

* Carbon footprint calculation
* Dashboard rendering
* Recommendation generation
* Carbon simulator functionality
* Weekly challenge navigation
* Success page rendering
* Responsive layout behavior

All core functionalities performed as expected.

---

# 🔒 Security Considerations

* No sensitive user information is collected.
* No authentication credentials are stored.
* No third-party APIs process user data.
* All calculations are performed client-side.
* User inputs remain within the browser session.

---

# ♿ Accessibility

CarbonLens AI incorporates accessibility-focused design principles:

* Responsive desktop and mobile layouts
* Clear visual hierarchy
* Readable typography
* Consistent navigation structure
* High-contrast interface components
* User-friendly interaction patterns

---

# 🌍 Sustainability Impact

CarbonLens AI promotes environmental awareness by helping users:

* Understand their carbon footprint
* Identify major emission sources
* Simulate greener lifestyle choices
* Build sustainable habits
* Contribute toward a cleaner future

---
## 🧪 Testing

### Manual Testing

The application was manually tested across all major user flows and components.

| Feature           | Test Scenario                                          | Result   |
| ----------------- | ------------------------------------------------------ | -------- |
| Carbon Calculator | Enter valid lifestyle inputs                           | ✅ Passed |
| Carbon Calculator | Verify annual footprint calculations                   | ✅ Passed |
| Dashboard         | Display Eco Score correctly                            | ✅ Passed |
| Dashboard         | Display highest emission source                        | ✅ Passed |
| Recommendations   | Generate category-specific suggestions                 | ✅ Passed |
| Simulator         | Apply sustainability actions and recalculate emissions | ✅ Passed |
| Weekly Challenges | Display challenge cards correctly                      | ✅ Passed |
| Weekly Challenges | Complete challenge workflow                            | ✅ Passed |
| Success Page      | Display sustainability summary                         | ✅ Passed |
| Navigation        | Verify screen transitions between modules              | ✅ Passed |
| Responsive Design | Tested on desktop and mobile screen sizes              | ✅ Passed |

### Input Validation Testing

| Validation Case                              | Result   |
| -------------------------------------------- | -------- |
| Empty inputs handled gracefully              | ✅ Passed |
| Numeric fields accept valid values           | ✅ Passed |
| Calculator prevents application crashes      | ✅ Passed |
| Simulator handles multiple updates correctly | ✅ Passed |

### End-to-End User Flow

1. User enters lifestyle information.
2. Carbon footprint is calculated.
3. Dashboard visualizes sustainability metrics.
4. Personalized recommendations are generated.
5. User explores carbon reduction scenarios through the simulator.
6. Weekly challenges encourage sustainable habits.
7. Success page summarizes the sustainability journey.

All application flows were verified successfully during testing.

### Browser Testing

The application was tested on:

* Google Chrome
* Microsoft Edge

### Performance Verification

* Fast page rendering using React + Vite.
* Optimized component structure.
* Responsive UI across multiple screen sizes.
* Smooth navigation between application modules.


# 🚀 Future Enhancements

* AI-powered recommendation engine
* Personalized sustainability roadmap
* User authentication
* Progress tracking dashboard
* Community sustainability leaderboard
* Carbon offset recommendations
* Real-time emissions analytics

---

# 🌐 Deployment

### Live Application

https://carbonlens-ai.vercel.app

### GitHub Repository

https://github.com/snehaseveriya23/carbonlens-ai

---

# 👩‍💻 Author

**Sneha Severiya**

B.Tech Data Science Student

Passionate about AI, Data Science, Sustainability, and building impactful technology solutions.

---

# 📜 License

This project is developed for educational, innovation, and sustainability awareness purposes.
