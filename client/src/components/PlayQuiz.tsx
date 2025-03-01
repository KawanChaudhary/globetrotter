import React from "react";

interface PlayQuizProps {
  handleStartQuiz: () => void;
}

const PlayQuiz: React.FC<PlayQuizProps> = ({
  handleStartQuiz,
}: PlayQuizProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-10/12 p-8 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg text-black">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to the Quiz!
        </h1>
        <p className="text-lg text-center mb-8">
          Are you ready to test your knowledge?
        </p>
        <div className="text-center">
          <button
            onClick={handleStartQuiz}
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;
