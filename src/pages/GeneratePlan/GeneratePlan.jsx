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
      return `You are a fitness coach helping users create personalized 4-week workout plans.
      Create the plan according the following user profile. Take extra consideration to Experience Level, Body Goal, Preferred Zones and Schedule.
    
    Return the result as a valid raw JSON object with NO explanation or markdown formatting (e.g., no \`\`\`json tags).
    
    The workout plan must include:
    - A breakdown by week and day, ${profile.schedule.frequency}
    - Each day includes:
      - The muscle group or focus (e.g. back, cardio, chest, lower arms, lower legs, neck, shoulders, upper arms, upper legs, waist)
      - Number of exercises based on Schedule/Frequency
      - For each exercise: name, sets, reps, and rest duration
    
    ⚠️ Important:
    Only use common, recognizable exercises  found in the [free-exercise-db](https://github.com/yuhonas/free-exercise-db).
    If you're not sure about an exercise name, make your best guess — the matching will be handled programmatically later.
    
    Do not invent new exercise names. Prioritize standard, conventional movements (e.g. Push-ups, Squats, Dumbbell Rows).

    ⚠️ Important: Wrap any text values like "30 seconds", "15 each side", "N/A" in double quotes. The output must be 100% valid JSON with properly quoted strings, keys, and values.
    ❌ Do not return unquoted values like: 15 each side or 10 minutes — they must be strings: "15 each side", "10 minutes".
    
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
              max_tokens: 4000,
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

          navigate("/plan", { state: { plan: planJson } });
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
