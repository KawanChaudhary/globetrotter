import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';

const UserCard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return null;
  }

  const lastThreeScores = user.attempts.slice(-3).map((attempt, index) => (
    <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
      <span>{new Date(attempt.date).toLocaleDateString()}</span>
      <span className="text-blue-500 font-bold">{attempt.score}</span>
    </li>
  ));

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">User Details</h2>
      <div className="mb-4">
        <p className="text-lg font-bold">Username: {user.username}</p>
        <p className="text-lg">Attempts: {user.numberOfAttempts}</p>
        <p className="text-lg">Highest Score: {user.highestScore}</p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Last Three Scores</h3>
        <ul className="space-y-2">{lastThreeScores}</ul>
      </div>
    </div>
  );
};

export default UserCard;