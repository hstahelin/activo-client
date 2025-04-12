import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fuzzyMatchExercise } from "../../utils/fuzzyMatchExercise";

import "./Plan.css";

function Plan() {
  const location = useLocation();
  const plan = location.state?.plan;
  const [exerciseDB, setExerciseDB] = useState([]);

  console.log("PLAN: ", plan);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(
          "https://exercisedb.p.rapidapi.com/exercises?limit=0",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );

        const data = await res.json();
        console.log("DATA EXERCISE: ", data);

        setExerciseDB(data);
      } catch (err) {
        console.error("Failed to load exercises from ExerciseDB", err);
      }
    };

    fetchExercises();
  }, []);

  const findExerciseInfo = (name) => fuzzyMatchExercise(name, exerciseDB);

  if (!plan || typeof plan !== "object") {
    return <div className="plan">No valid plan found.</div>;
  }

  return (
    <div className="plan">
      <h1>My Custom Fitness Plan</h1>
      {Object.entries(plan).map(([weekName, week]) => (
        <div className="plan__week" key={weekName}>
          <h2>{weekName}</h2>
          {Object.entries(week).map(([dayName, day]) => (
            <div className="plan__day" key={dayName}>
              <h3>
                {dayName} - {day["Muscle Group"]}
              </h3>
              <div className="plan__exercises">
                {day.Exercises.map((ex, i) => {
                  const info = findExerciseInfo(ex.Name);
                  return (
                    <div className="plan__exercise" key={i}>
                      <div className="plan__exercise-info">
                        <h4>{ex.Name}</h4>
                        {ex.Sets && (
                          <p>
                            <strong>Sets:</strong> {ex.Sets}
                          </p>
                        )}
                        {ex.Reps && (
                          <p>
                            <strong>Reps:</strong> {ex.Reps}
                          </p>
                        )}
                        {ex.Duration && (
                          <p>
                            <strong>Duration:</strong> {ex.Duration}
                          </p>
                        )}
                        {ex.Rest && (
                          <p>
                            <strong>Rest:</strong> {ex.Rest}
                          </p>
                        )}
                      </div>
                      {info && (
                        <div className="plan__exercise-preview">
                          <img
                            src={info.gifUrl}
                            alt={info.name}
                            loading="lazy"
                          />
                          <p className="plan__muscle">Target: {info.target}</p>
                          <p className="plan__equipment">
                            Equipment: {info.equipment}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Plan;
