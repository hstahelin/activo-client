import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Welcome from "./pages/Welcome/Welcome";
import Quiz from "./pages/Quiz/Quiz";
import GeneratePlan from "./pages/GeneratePlan/GeneratePlan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/start" element={<Quiz />} />
        <Route path="/generate" element={<GeneratePlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
