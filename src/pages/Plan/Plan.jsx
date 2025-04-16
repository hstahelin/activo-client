import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { deriveFiltersFromAnswers } from "../../utils/mapping";
import { fuzzyMatchExercise } from "../../utils/fuzzyMatchExercise";
import "./Plan.css";

function Plan() {
  const location = useLocation();
  const plan = location.state?.plan;
  const [allExercises, setAllExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
        );
        const data = await res.json();
        setAllExercises(data);
      } catch (err) {
        console.error("Failed to load exercises:", err);
      }
    };

    fetchExercises();
  }, []);

  useEffect(() => {
    if (!plan || allExercises.length === 0) return;
    console.log("RAW PLAN:", plan);
    const filters = deriveFiltersFromAnswers(plan);
    console.log("Derived filters:", filters);

    const matches = allExercises.filter((exercise) => {
      const hasMuscle = filters.muscles.some((m) =>
        exercise.primaryMuscles.includes(m)
      );
      const hasForce = filters.forces.includes(exercise.force);
      const isLevelMatch = exercise.level === filters.level;
      const hasCategory = filters.categories.includes(exercise.category);
      const hasMechanic = filters.mechanic.includes(exercise.mechanic);

      return (
        hasMuscle && hasForce && isLevelMatch && hasCategory && hasMechanic
      );
    });

    setFilteredExercises(matches);
  }, [plan, allExercises]);

  return (
    <div className="plan">
      <h2>Your Personalized Workout Plan</h2>
      {filteredExercises.length === 0 ? (
        <p>Loading or no matching exercises found...</p>
      ) : (
        <ul className="exercise-list">
          {filteredExercises.map((exercise) => (
            <li key={exercise.id} className="exercise-card">
              <h3>{exercise.name}</h3>
              <img
                src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`}
                alt={exercise.name}
              />
              <p>
                <strong>Primary:</strong> {exercise.primaryMuscles.join(", ")}
              </p>
              <p>
                <strong>Equipment:</strong> {exercise.equipment}
              </p>
              <p>
                <strong>Instructions:</strong>
              </p>
              <ol>
                {exercise.instructions.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Plan;
