import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import {
  getClueRequest,
  checkAnswerRequest,
  getRandomQuizRequest,
} from "../store/reducers/quizReducer";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Player } from "@lottiefiles/react-lottie-player";
import sadAnimation from "../assets/sad.json";

const ShowQuiz = () => {
  const dispatch = useDispatch();
  const { quiz, loading, error, clueUsed, submitted, currentScore, isCorrect } =
    useSelector((state: RootState) => state.quiz);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSadAnimation, setShowSadAnimation] = useState(false);
  const { width, height } = useWindowSize();

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleFetchClue = () => {
    if (quiz) {
      dispatch(getClueRequest(quiz.id));
    }
  };

  const getNewQuiz = () => {
    dispatch(getRandomQuizRequest());
  };

  useEffect(() => {
    getNewQuiz();
  }, []);

  const [timer, setTimer] = useState(6);

  const handleSubmit = () => {
    if (quiz && selectedOption) {
      dispatch(
        checkAnswerRequest({
          id: quiz.id,
          answer: selectedOption,
          usedClue: clueUsed,
        })
      );
    }
  };

  useEffect(() => {
    if (!submitted) return;
    console.log("Updated quiz:", quiz);
    if (isCorrect) {
      setShowConfetti(true);

      let countdown = 6;
      const interval = setInterval(() => {
        countdown -= 1;
        setTimer(countdown);
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        setShowConfetti(false);
        getNewQuiz(); // ✅ Move to next quiz
      }, 6000);
    } else {
      setShowSadAnimation(true);
      setTimeout(() => {
        setShowSadAnimation(false)
      }, 3000);
    }
  }, [quiz]);


  if (!quiz) {
    return null;
  }

  return (
    <div>
      {showConfetti && <Confetti width={width} height={height} />}
      {showSadAnimation && (
        <div className="fixed inset-3 flex items-center justify-center bg-opacity-50 z-50">
          <Player
            autoplay
            loop
            src={sadAnimation}
            style={{ height: "150px", width: "150px" }}
          />
        </div>
      )}

      <div className="w-full max-w-4xl p-8 bg-gray-200 rounded-lg shadow-lg text-black">
        <h2 className="text-2xl font-bold mb-4 font-mono">{quiz.trivia}</h2>
        <div className="flex justify-between ">

        <ul className="mb-4">
          {quiz.options.map((option, index) => (
              <li key={index} className="mb-2">
              <label
                className={
                  "flex items-center font-mono" +
                  (submitted
                    ? quiz.correctAnswer === option
                      ? "text-green-500"
                      : "text-red-500"
                    : "")
                }
              >
                <input
                  type="radio"
                  name="option"
                  disabled={submitted}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                  className="mr-2"
                  />
                {option}
              </label>
            </li>
          ))}
        </ul>
        <p className="flex items-center justify-around">
            <span className="font-bold">Score: {currentScore}</span>
        </p>
          </div>
        <div className="flex flex-col">
          <div className="flex gap-5 items-center mb-6">
            <button
              onClick={handleFetchClue}
              className={`p-2 cursor-pointer font-mono ${
                clueUsed
                  ? "bg-zinc-700 text-white"
                  : "bg-amber-200 text-amber-500"
              } font-bold rounded-lg shadow-md transition duration-300`}
              disabled={clueUsed}
            >
              {clueUsed ? "Clue" : "Show Clue"}
            </button>
            <p className="text-amber-800 font-mono">
              {clueUsed ? quiz.clue : null}
            </p>
          </div>
          {submitted && (
            <div className="flex gap-5 items-center mb-6">
              <div className="p-2 cursor-pointer font-mono bg-rose-200 text-rose-500 font-bold rounded-lg shadow-md transition duration-300">
                {submitted ? "Fun Fact" : null}
              </div>
              <p className="text-amber-800 font-mono">{quiz.funFact}</p>
            </div>
          )}
          {selectedOption && (
            <button
              onClick={handleSubmit}
              className={`p-2 cursor-pointer bg-blue-500 text-white font-bold rounded-lg shadow-md 
                hover:bg-blue-700 transition duration-300 flex items-center justify-center min-w-[160px]`}
              disabled={submitted}
            >
              {submitted ? (
                isCorrect ? (
                  <span className="flex items-center gap-2">
                    <span>Next in</span>
                    <span className="w-6 h-6 flex items-center justify-center bg-white text-blue-500 font-bold rounded-full">
                      {timer}
                    </span>
                  </span>
                ) : (
                  "Wrong Answer"
                )
              ) : (
                "Submit Answer"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowQuiz;
