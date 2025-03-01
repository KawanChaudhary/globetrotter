import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { UserIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/20/solid';

const UserCard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return null;
  }

  const lastThreeScores = user.attempts.slice(-3).map((attempt, index) => (
    <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
      <span className="flex items-center">
        <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
        {new Date(attempt.date).toLocaleDateString()}
      </span>
      <span className="text-blue-500 font-bold">{attempt.score}</span>
    </li>
  ));

  return (
    <div className="bg-gradient-to-r from-rose-500 to-red-600 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
      <div className="flex justify-center mb-4">
        <UserIcon className="h-16 w-16 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-4">{user.username}</h2>
      <div className="mb-4">
        <p className="text-lg flex items-center">
          <ChartBarIcon className="h-5 w-5 text-white mr-2" />
          Attempts: {user.numberOfAttempts}
        </p>
        <p className="text-lg flex items-center">
          <ChartBarIcon className="h-5 w-5 text-white mr-2" />
          Highest Score: {user.highestScore}
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-2">Last Three Scores</h3>
        <ul className="space-y-2">{lastThreeScores}</ul>
      </div>
    </div>
  );
};

export default UserCard;