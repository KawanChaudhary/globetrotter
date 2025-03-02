import { useDispatch, useSelector } from "react-redux";
import Auth from "@/components/Auth";
import Leaderboard from "@/components/LeaderBoard";
import UserCard from "@/components/UserCard";
import { RootState } from "../store/reducers";
import PlayQuiz from "@/components/PlayQuiz";
import { useState } from "react";
import ShowQuiz from "@/components/ShowQuiz";
import QuizResult from "@/components/QuizResult";
import { getRandomQuizRequest } from "@/store/reducers/quizReducer";
import { fetchUserRequest } from "@/store/reducers/authReducer";

const Home = () => {
  const [doneQuiz, setDoneQuiz] = useState<boolean>(false);
  const { user, activeQuiz } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleDoneQuiz = () => {
    setDoneQuiz(true);
    dispatch(fetchUserRequest());
  };

  const handlePlayAgain = () => {
    setDoneQuiz(false);
    dispatch(getRandomQuizRequest());
    dispatch(fetchUserRequest());
  };

  return (
    <div className="flex flex-col text-center gap-5 items-center justify-center min-h-screen">
      <div className="m-2 p-6 md:min-w-6/12">
        <h1 className="text-6xl font-bold">Know your world</h1>
        <div className="flex flex-col gap-5 md:flex-row items-stretch justify-around mt-12">
          {user ? <UserCard /> : <Auth />}
          <Leaderboard />
        </div>
        <div className="mt-6 flex flex-col items-center justify-center md:min-w-6/12">
          {user ? (
            activeQuiz ? (
              <ShowQuiz handleDoneQuiz={handleDoneQuiz} />
            ) : doneQuiz ? (
              <QuizResult handlePlayAgain={handlePlayAgain} />
            ) : (
              <PlayQuiz handleStartQuiz={handlePlayAgain} />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
