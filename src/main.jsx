import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter";
import "./index.css";
import App from "./App.jsx";
import { ExerciseProvider } from "./context/ExerciseContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ExerciseProvider>
    <App />
  </ExerciseProvider>
  // </StrictMode>
);
