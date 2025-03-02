import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import { toPng } from "html-to-image";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa";

interface QuizResultProps {
  handlePlayAgain: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ handlePlayAgain }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const lastAttempt = user?.attempts[user.attempts.length - 1];
  const isHighScore = lastAttempt && lastAttempt.score === user.highestScore;
  const resultRef = useRef<HTMLDivElement>(null);

  const handleShareOnPlatform = async (platform: string) => {
    if (resultRef.current) {
      try {
        const dataUrl = await toPng(resultRef.current);
        const blob = await (await fetch(dataUrl)).blob();
        const filesArray = [
          new File([blob], "quiz-result.png", {
            type: blob.type,
          }),
        ];

        const shareData = {
          files: filesArray,
          title: "Quiz Result",
          text: "Check out my quiz result!",
          url: window.location.href,
        };

        if (navigator.canShare && navigator.canShare({ files: filesArray })) {
          await navigator.share(shareData);
        } else {
          let shareUrl = "";
          const encodedUrl = encodeURIComponent(window.location.href);
          const encodedText = encodeURIComponent("Check out my quiz result!");

          switch (platform) {
            case "whatsapp":
              shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
              break;
            case "facebook":
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
              break;
            case "linkedin":
              shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
              break;
            default:
              break;
          }

          window.open(shareUrl, "_blank");
        }
      } catch (error) {
        console.error("Error sharing the quiz result:", error);
      }
    }
  };

  if (!lastAttempt) {
    return null;
  }

  return (
   
      <div ref={resultRef} className="w-full max-w-4xl p-8 bg-gray-100 rounded-lg shadow-lg text-black font-mono">
        <h1 className="text-4xl font-bold text-center mb-8">Quiz Result</h1>
        <h1 className="text-4xl font-bold text-center mb-8">{user.username}</h1>
        <div className=" justify-around text-center mb-8">
          <div className="flex items-center justify-around mb-8">

          <p className="text-2xl font-bold">Total Score: {lastAttempt.score}</p>
          <p className="text-xl">Total Correct Answers: {lastAttempt.correct}</p>
          </div>
          {isHighScore && lastAttempt.score > 0 && (
            <p className="text-xl text-green-500 font-bold">Congratulations! You've set a new high score!</p>
          )}
          {lastAttempt.score === 0 && <p className="text-xl text-rose-500 font-bold">You need to work on your skills {":("}</p>}
        </div>
        <div className="relative flex justify-around">
          <div className={`p-2 cursor-pointer border-2 border-rose-700 text-rose-700 font-bold 
                rounded-lg shadow-md transition duration-300 flex items-center justify-center 
                min-w-[160px] outline-none gap-5`}>
              <button
                onClick={() => handleShareOnPlatform("whatsapp")}
                className="cursor-pointer text-xl font-bold hover:text-green-700"
              >
                <FaWhatsapp className="mr-2" />
              </button>
              <button
                onClick={() => handleShareOnPlatform("facebook")}
                className="cursor-pointer text-xl font-bold hover:text-blue-700"
              >
                <FaFacebook className="mr-2" />
              </button>
              <button
                onClick={() => handleShareOnPlatform("linkedin")}
               className="cursor-pointer text-xl font-bold hover:text-blue-700"
              >
                <FaLinkedin className="mr-2" />
              </button>
            </div>
          <button
            onClick={handlePlayAgain}
            className={`p-2 cursor-pointer border-2 border-green-700 text-green-700 font-bold 
                rounded-lg shadow-md transition duration-300 flex items-center justify-center 
                min-w-[160px] outline-none hover:bg-green-700 hover:text-white`}
          >
            <ArrowPathIcon className="h-5 w-5 mr-2" /> Play Again
          </button>
        </div>
      </div>
  );
};

export default QuizResult;
