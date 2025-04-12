import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Summary.css";
import { QUESTIONS } from "../../data/questions";

const calculateBMI = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return bmi.toFixed(1);
};

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

function Summary({ answers, onGeneratePlan }) {
  const [showAnswers, setShowAnswers] = useState(false);

  const navigate = useNavigate();

  const height = answers.heightWeight?.height;
  const weight = answers.heightWeight?.weight;
  const bmi = calculateBMI(height, weight);
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  const targetWeight = answers.weightGoal;
  const targetBMI = calculateBMI(height, targetWeight);
  const targetBMICategory = targetBMI ? getBMICategory(targetBMI) : null;

  const getLabel = (questionId, value) => {
    const question = QUESTIONS.find((q) => q.id === questionId);
    if (!question) return value;

    if (question.type === "input") {
      if (questionId === "heightWeight" && typeof value === "object") {
        return `Height: ${value.height} cm, Weight: ${value.weight} kg`;
      }
      return value;
    }

    if (question.type === "multiple") {
      return value
        .map((v) => question.options.find((o) => o.value === v)?.label || v)
        .join(", ");
    }

    return question.options.find((o) => o.value == value)?.label || value;
  };

  const generateUserProfile = (answers) => {
    const height = Number(answers?.heightWeight?.height || 0);
    const weight = Number(answers?.heightWeight?.weight || 0);
    const bmi =
      height && weight ? (weight / (height / 100) ** 2).toFixed(1) : null;

    return {
      age: mapLabel("age", answers.age), // mapped from age question
      height,
      weight,
      bmi: bmi ? Number(bmi) : null,
      goal: mapGoal(answers.goal), // map to readable text
      motivation: mapArray("motivation", answers.motivation),
      bodyGoal: mapLabel("bodyGoal", answers.bodyGoal),
      physicalBuild: mapLabel("build", answers.build),
      experienceLevel: mapLabel(
        "exerciseExperience",
        answers.exerciseExperience
      ),
      biggestBlockers: mapArray("blocks", answers.blocks),
      flexibilityLevel: mapLabel("flexibility", answers.flexibility),
      targetZones: mapArray("zones", answers.zones),
      bestShape: mapLabel("bestShape", answers.bestShape),
      schedule: {
        frequency: mapLabel("timeCommitment", answers.timeCommitment),
        duration: mapLabel("duration", answers.duration),
        workSchedule: mapLabel("schedule", answers.schedule),
      },
      weightGoal: Number(answers.weightGoal) || null,
    };
  };

  const mapArray = (questionId, values) => {
    if (!Array.isArray(values)) return [];
    return values.map((value) => mapLabel(questionId, value));
  };

  const mapLabel = (questionId, value) => {
    const question = QUESTIONS.find((q) => q.id === questionId);
    const match = question?.options?.find((opt) => opt.value === value);
    return match?.label || value;
  };

  const mapGoal = (value) => {
    const goals = {
      1: "Build Muscle",
      2: "Change Weight",
      3: "Lose Fat",
      4: "Improve Fitness",
    };
    return goals[value] || value;
  };

  const handleGeneratePlan = () => {
    const userProfile = generateUserProfile(answers);
    console.log("userProfile: ", userProfile);
    console.log("answers: ", answers);

    navigate("/generate", { state: { userProfile } });
  };

  return (
    <div className="summary">
      <h2>Your Summary</h2>

      {bmi && (
        <div className="summary__bmi">
          <strong>BMI:</strong> {bmi} ({bmiCategory})
        </div>
      )}

      {bmi && (
        <div className="summary__bmi-info">
          <p>
            <strong>What is BMI?</strong>
            <br />
            Body Mass Index (BMI) is a useful screening tool for estimating body
            fat and assessing health risks. It is calculated from your height
            and weight.
          </p>
          <p>
            <em>Note:</em> BMI may not reflect body composition accurately in
            athletes or older adults.
          </p>
          <table className="summary__bmi-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>BMI Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Underweight</td>
                <td>Below 18.5</td>
              </tr>
              <tr>
                <td>Normal</td>
                <td>18.5–24.9</td>
              </tr>
              <tr>
                <td>Overweight</td>
                <td>25.0–29.9</td>
              </tr>
              <tr>
                <td>Obesity</td>
                <td>30.0 and above</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {bmi && targetBMI && (
        <div className="summary__bmi-target">
          🎯 <strong>BMI Goal:</strong> from {bmi} to{" "}
          <strong>{targetBMI}</strong> ({targetBMICategory})
        </div>
      )}

      <button className="summary__submit" onClick={handleGeneratePlan}>
        🚀 Generate My Plan
      </button>

      {!showAnswers && (
        <button
          className="summary__toggle"
          onClick={() => setShowAnswers(true)}
        >
          Show Answers
        </button>
      )}

      {showAnswers && (
        <>
          <ul className="summary__list">
            {Object.entries(answers).map(([key, value]) => (
              <li key={key}>
                <strong>{QUESTIONS.find((q) => q.id === key)?.text}:</strong>{" "}
                {getLabel(key, value)}
              </li>
            ))}
          </ul>
          <button
            className="summary__toggle"
            onClick={() => setShowAnswers(false)}
          >
            Hide Answers
          </button>
        </>
      )}
    </div>
  );
}

export default Summary;
