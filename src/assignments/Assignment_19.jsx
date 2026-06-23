import { useState, useEffect } from "react";
import axios from "axios";

function Assignment_19() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        axios.get("https://apis.dnjs.lk/objects/quiz.php").then((response) => {
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

  setCurrent(current + 1);
};


    if (current >= questions.length) {
        return (
            <div>
                <h1>Quiz Finished</h1>
                <h2>Score: {score} / {questions.length}</h2>
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
        style={{ backgroundColor: "grey", color: "black" }}
        onClick={() => selectAnswer(index)}>
          {answer}
        </button>
        <br />
        <br />
      </div>
    ))}
  </div>
);
}

export default Assignment_19;