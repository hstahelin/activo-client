import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { extractJSONFromOpenAI } from "../../utils/extractJSONFromOpenAI"; // adjust path as needed

import "./GeneratePlan.css";

function GeneratePlan() {
  const navigate = useNavigate();
  const location = useLocation();
  const userProfile = location.state?.userProfile;

  const [loadingText, setLoadingText] = useState("Generating your plan...");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userProfile) {
      navigate("/");
      return;
    }

    const generatePrompt = (profile) => {
      return `You are a fitness coach helping users create personalized workout plans.

Based on the following user profile, generate a JSON object for a 4 weeks workout plan.
Return only the raw JSON, no explanation, no markdown formatting.

Each day should include:
- a muscle group or focus (e.g. Upper Body, Core, Full Body)
- a list of 4–6 exercises using exact names from the [ExerciseDB API](https://v2.exercisedb.io/)
- sets, reps, and rest duration per exercise

Only include exercises from the database and format the result as valid JSON.

User Profile:
- Age: ${profile.age}
- Height: ${profile.height} cm
- Weight: ${profile.weight} kg
- BMI: ${profile.bmi}
- Primary Goal: ${profile.goal}
- Body Goal: ${profile.bodyGoal}
- Motivation: ${profile.motivation.join(", ")}
- Physical Build: ${profile.physicalBuild}
- Experience Level: ${profile.experienceLevel}
- Best Shape Ever: ${profile.bestShape}
- Flexibility: ${profile.flexibilityLevel}
- Blockers: ${profile.biggestBlockers.join(", ")}
- Preferred Zones: ${profile.targetZones.join(", ")}
- Target Weight: ${profile.weightGoal} kg
- Schedule:
    - Frequency: ${profile.schedule.frequency}
    - Duration: ${profile.schedule.duration}
    - Work Schedule: ${profile.schedule.workSchedule}`;
    };

    const fetchPlan = async () => {
      const prompt = generatePrompt(userProfile);
      // console.log("Prompt: ", prompt);

      try {
        const prompt = generatePrompt(userProfile);

        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: import.meta.env.VITE_OPENAI_MODEL || "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content: "You are a helpful fitness assistant.",
                },
                { role: "user", content: prompt },
              ],
              temperature: 0.7,
              max_tokens: 2000,
            }),
          }
        );

        if (!response.ok) {
          const errorMsg = await response.text();
          throw new Error(`OpenAI Error: ${errorMsg}`);
        }

        const data = await response.json();
        console.log("DATA: ", data);

        try {
          const raw = data.choices[0].message.content;
          const planJson = extractJSONFromOpenAI(raw);
          console.log("PLAN: ", planJson);

          //navigate("/plan", { state: { plan: planJson } });
        } catch (jsonError) {
          console.error("Invalid JSON from OpenAI", jsonError);
          setError("The plan could not be generated. Please try again.");
          setLoadingText("Error processing plan");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
        setLoadingText("Failed to generate plan");
      }
    };

    fetchPlan();
  }, [userProfile, navigate]);

  return (
    <div className="generate-plan">
      <div className="loader"></div>
      <h1>{loadingText}</h1>
      {error && <button onClick={() => navigate("/")}>Back to Home</button>}
    </div>
  );
}

export default GeneratePlan;
