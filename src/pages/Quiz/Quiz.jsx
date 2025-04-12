import { useState } from "react";
import Question from "../../components/Question/Question";
import Summary from "../Summary/Summary";
import { QUESTIONS } from "../../data/questions";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

function Quiz() {
  const [answers, setAnswers] = useState({});
  const [currentQuestionId, setCurrentQuestionId] = useState(QUESTIONS[0].id);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();

  const currentIndex = QUESTIONS.findIndex((q) => q.id === currentQuestionId);
  const totalQuestions = QUESTIONS.length;
  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);
  const currentQuestion = QUESTIONS.find((q) => q.id === currentQuestionId);

  const handleAnswerChange = (questionId, value, checked = true) => {
    setAnswers((prev) => {
      if (questionId === "height" || questionId === "weight") {
        return {
          ...prev,
          heightWeight: {
            ...prev.heightWeight,
            [questionId]: value,
          },
        };
      }

      const isMultiple = currentQuestion.type === "multiple";
      if (isMultiple) {
        const prevAnswers = prev[questionId] || [];
        const updatedAnswers = checked
          ? [...prevAnswers, value]
          : prevAnswers.filter((v) => v !== value);
        return { ...prev, [questionId]: updatedAnswers };
      }

      return { ...prev, [questionId]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentAnswer = answers[currentQuestion.id];

    let nextId = null;

    if (currentQuestion.type === "single") {
      const selectedOption = currentQuestion.options?.find(
        (opt) => opt.value.toString() === currentAnswer?.toString()
      );
      nextId = selectedOption?.nextQuestionId;
    } else if (currentQuestion.type === "multiple") {
      const selectedOptions = currentQuestion.options?.filter((opt) =>
        currentAnswer?.includes(opt.value)
      );
      nextId = selectedOptions?.[0]?.nextQuestionId;
    } else if (currentQuestion.type === "input") {
      nextId = currentQuestion.nextQuestionId;
    }

    nextId = nextId || currentQuestion.nextQuestionId;

    if (nextId) {
      setCurrentQuestionId(nextId);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    const confirmRestart = window.confirm(
      "Are you sure you want to start over?"
    );
    if (!confirmRestart) return;
    setAnswers({});
    setCurrentQuestionId(QUESTIONS[0].id);
    setIsComplete(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="quiz">
      <div className="quiz__progress-bar">
        <div
          className="quiz__progress-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <header className="quiz__header">
        <h1 className="quiz__title">Let's personalize your fitness journey</h1>
      </header>

      {!isComplete && currentQuestion ? (
        <>
          <Question
            question={currentQuestion}
            onChange={handleAnswerChange}
            onSubmit={handleSubmit}
          />
          <button className="quiz__restart" onClick={handleRestart}>
            Start Over
          </button>
        </>
      ) : (
        <>
          <Summary answers={answers} onRestart={handleRestart} />
          <button className="quiz__restart" onClick={handleRestart}>
            Start Over
          </button>
        </>
      )}
    </div>
  );
}

export default Quiz;
