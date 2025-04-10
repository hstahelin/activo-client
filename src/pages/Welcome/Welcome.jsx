import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Activo</h1>
      <button onClick={() => navigate("/start")}>Take a 2 min quiz</button>
    </div>
  );
}

export default Welcome;
