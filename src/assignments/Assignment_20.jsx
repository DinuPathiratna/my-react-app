import { useState, useEffect } from "react";
import axios from "axios";

function Assignment_20() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const [userAnswers, setUserAnswers] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://apis.dnjs.lk/objects/quiz.php")
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const selectAnswer = (index) => {
    if (index === questions[current].correct) {
      setScore(score + 1);
    }

    setUserAnswers([...userAnswers, index]);
    setCurrent(current + 1);
  };

  const nextReview = () => {
    if (reviewIndex < questions.length - 1) {
      setReviewIndex(reviewIndex + 1);
    }
  };

  const lastReview = () => {
    if (reviewIndex > 0) {
      setReviewIndex(reviewIndex - 1);
    }
  };

  if (questions.length === 0) {
    return <h2>Loading...</h2>;
  }

  if (current >= questions.length) {
    const question = questions[reviewIndex];
    const selectedAnswer = userAnswers[reviewIndex];

    return (
      <div>
        <h1>Quiz Finished</h1>
        <h2>
          Score: {score} / {questions.length}
        </h2>

        <hr />

        <h3>
          Question {reviewIndex + 1} / {questions.length}
        </h3>

        <p>{question.question}</p>

        {question.answers.map((answer, index) => {
          let color = "black";

          if (index === question.correct) {
            color = "green";
          } else if (
            index === selectedAnswer &&
            selectedAnswer !== question.correct
          ) {
            color = "red";
          }

          return (
            <div
              key={index}
              style={{
                color: color,
                marginBottom: "10px",
              }}
            >
              {answer}
            </div>
          );
        })}

        <button onClick={lastReview}>Last</button>

        <button onClick={nextReview}>Next</button>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div>
      <h2>{question.question}</h2>

      {question.answers.map((answer, index) => (
        <div key={index}>
          <button
            style={{
              backgroundColor: "grey",
              color: "black",
            }}
            onClick={() => selectAnswer(index)}
          >
            {answer}
          </button>

          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default Assignment_20;