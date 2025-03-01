import { useSelector } from 'react-redux';
import Auth from '@/components/Auth';
import Leaderboard from '@/components/LeaderBoard';
import UserCard from '@/components/UserCard';
import { RootState } from '../store/reducers';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  console.log(user)
  
  return (
    <div className="flex flex-col text-center gap-5 items-center justify-center min-h-screen">
      <div className="m-2 p-6 md:min-w-8/12">
        <h1 className="text-6xl font-bold">Explore your world</h1>
        <div className="flex flex-col gap-5 md:flex-row items-stretch justify-around mt-12">
          {user ? <UserCard /> : <Auth />}
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
