import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import {
  UserIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/20/solid";
import Loader from "@/components/Loader";
import { cloneDeep } from "lodash";

const UserCard = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [attempts, setAttempts] = useState([]);
  const sortAttempts = () => {
    const sorted = [...user.attempts].sort((a, b) => b.score - a.score);
    setAttempts(sorted);
  };

  useEffect(() => {
    sortAttempts();
  }, []);

  const lastThreeScores = attempts.slice(-3).map((attempt, index) => (
    <li
      key={index}
      className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
    >
      <span className="flex items-center text-red-400">
        <CalendarIcon className="h-5 w-5 text-red-400 mr-2" />
        {new Date(attempt.date).toLocaleDateString()}
      </span>
      <span className="text-red-400 font-bold">{attempt.score}</span>
    </li>
  ));

  return (
    <Loader isLoading={loading}>
      <div className="bg-gradient-to-r from-rose-500 to-red-600 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <div className="flex justify-center mb-4">
          <UserIcon className="h-16 w-16 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-4">{user.username}</h2>
        <div className="mb-4">
          <p className="text-lg flex items-center">
            <ChartBarIcon className="h-5 w-5 text-white mr-2" />
            Attempts: {user.attempts.length}
          </p>
          <p className="text-lg flex items-center">
            <ChartBarIcon className="h-5 w-5 text-white mr-2" />
            Highest Score: {user.highestScore}
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2 font-mono">
            Top Three Scores
          </h3>
          <ul className="space-y-2">{lastThreeScores}</ul>
        </div>
      </div>
    </Loader>
  );
};

export default UserCard;
