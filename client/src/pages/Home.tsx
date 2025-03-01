import { useSelector } from 'react-redux';
import Auth from '@/components/Auth';
import Leaderboard from '@/components/LeaderBoard';
import UserCard from '@/components/UserCard';
import { RootState } from '../store/reducers';
import PlayQuiz from '@/components/PlayQuiz';
import { useState } from 'react';

const Home = () => {
  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleStartQuiz = () => setStartQuiz(true);
  
  return (
    <div className="flex flex-col text-center gap-5 items-center justify-center min-h-screen">
      <div className="m-2 p-6 md:min-w-8/12">
        <h1 className="text-6xl font-bold">Know your world</h1>
        <div className="flex flex-col md:flex-row items-stretch justify-around mt-12">
          {user ? <UserCard /> : <Auth />}
          <Leaderboard />
        </div>
        <div className='mt-6 flex flex-col items-center justify-center'>

        {user && !startQuiz ? <PlayQuiz handleStartQuiz={handleStartQuiz} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
