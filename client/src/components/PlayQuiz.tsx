import React from "react";

interface PlayQuizProps {
  handleStartQuiz: () => void;
}

const PlayQuiz: React.FC<PlayQuizProps> = ({
  handleStartQuiz,
}: PlayQuizProps) => {
  return (
    <div className="w-full max-w-3xl p-8 bg-gray-200 rounded-lg shadow-lg text-zinc-800 font-mono">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to the Quiz!
      </h1>
      <p className="text-lg text-center mb-8">
        Are you ready to test your knowledge?
      </p>
      <div className="text-center">
        <button
          onClick={handleStartQuiz}
          className="cursor-pointer px-6 py-3 bg-blue-300 text-zinc font-bold rounded-lg shadow-md hover:bg-blue-700 hover:text-white transition duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default PlayQuiz;
