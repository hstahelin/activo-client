import { useState } from "react";
import "./Question.css";

function Question({ question, onChange, onSubmit }) {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setError(""); // clear error on change
    if (type === "checkbox") {
      onChange(name, value, checked);
    } else {
      onChange(name, value);
    }
  };

  const handleValidation = (e) => {
    e.preventDefault();
    const form = e.target;

    // validation logic
    if (question.type === "single") {
      const selected = form.querySelector(
        `input[name="${question.id}"]:checked`
      );
      if (!selected) {
        setError("Please select an option before continuing.");
        return;
      }
    }

    if (question.type === "multiple") {
      const checkedOptions = form.querySelectorAll(
        `input[name="${question.id}"]:checked`
      );
      if (checkedOptions.length === 0) {
        setError("Please select at least one option.");
        return;
      }
    }

    if (question.type === "input") {
      if (question.id === "heightWeight") {
        const height = form.querySelector('input[name="height"]')?.value;
        const weight = form.querySelector('input[name="weight"]')?.value;
        if (!height || !weight) {
          setError("Please enter both height and weight.");
          return;
        }
      } else {
        const input = form.querySelector(`input[name="${question.id}"]`)?.value;
        if (!input) {
          setError("Please enter a value before continuing.");
          return;
        }
      }
    }

    onSubmit(e); // ✅ All good
  };

  return (
    <div className="question">
      <h2 className="question__title">{question.text}</h2>
      <form className="question__form" onSubmit={handleValidation}>
        {question.type === "single" &&
          question.options.map((option) => (
            <label className="question__option" key={option.id}>
              <span className="question__label">{option.label}</span>
              <input
                className="question__input-radio"
                type="radio"
                name={question.id}
                value={option.value}
                onChange={handleChange}
              />
            </label>
          ))}

        {question.type === "multiple" &&
          question.options.map((option) => (
            <label className="question__option" key={option.id}>
              <span className="question__label">{option.label}</span>
              <input
                className="question__input-checkbox"
                type="checkbox"
                name={question.id}
                value={option.value}
                onChange={handleChange}
              />
            </label>
          ))}

        {question.type === "input" && (
          <div className="question__input-fields">
            {question.id === "heightWeight" ? (
              <>
                <label className="question__label">
                  Height (cm)
                  <input
                    className="question__input-text"
                    type="number"
                    name="height"
                    onChange={handleChange}
                  />
                </label>
                <label className="question__label">
                  Weight (kg)
                  <input
                    className="question__input-text"
                    type="number"
                    name="weight"
                    onChange={handleChange}
                  />
                </label>
              </>
            ) : (
              <label className="question__label">
                {question.text}
                <input
                  className="question__input-text"
                  type="text"
                  name={question.id}
                  onChange={handleChange}
                />
              </label>
            )}
          </div>
        )}

        {error && <p className="question__error">{error}</p>}

        <button className="question__submit" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}

export default Question;
