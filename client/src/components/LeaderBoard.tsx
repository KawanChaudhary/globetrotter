import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "@/components/Loader";
import { UserIcon, StarIcon } from "@heroicons/react/20/solid";

interface LeaderboardEntry {
  username: string;
  score: number;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await api.get("/leaderboard/scores");
        setLeaderboard(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch leaderboard data");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <Loader isLoading={loading}>
        <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <ul className="space-y-4">
          {leaderboard.map((entry, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-1 bg-gray-100 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <UserIcon className="h-6 w-6 text-blue-500" />
                <span className="font-bold text-lg">{entry.username}</span>
              </div>
              <div className="flex items-center space-x-2">
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <span className="text-gray-700 font-bold text-lg">
                  {entry.score}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Loader>
    </div>
  );
};

export default Leaderboard;
