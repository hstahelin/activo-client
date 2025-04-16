import { createContext, useContext, useEffect, useState } from "react";

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
        );
        const data = await res.json();
        console.log("EXERCISE DATA: ", data);

        setExercises(data);
      } catch (err) {
        console.error("Failed to load exercises", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <ExerciseContext.Provider value={{ exercises, loading }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => useContext(ExerciseContext);
