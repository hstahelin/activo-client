import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./pages/Welcome/Welcome";
import Quiz from "./pages/Quiz/Quiz";
import GeneratePlan from "./pages/GeneratePlan/GeneratePlan";
import Plan from "./pages/Plan/Plan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/start" element={<Quiz />} />
        <Route path="/generate" element={<GeneratePlan />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
