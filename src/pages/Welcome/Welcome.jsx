import { useNavigate } from "react-router-dom";
import "./Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className="welcome__content">
        <h1 className="welcome__title">
          Welcome to <span>Activo</span>
        </h1>
        <p className="welcome__subtitle">
          Your personalized fitness journey starts here.
        </p>
        <button className="welcome__cta" onClick={() => navigate("/start")}>
          Take the 2-Minute Quiz →
        </button>
      </div>
    </div>
  );
}

export default Welcome;
