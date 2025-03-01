import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './Loader';

interface LeaderboardEntry {
  username: string;
  score: number;
}

const Leaderboard = () => {
    const leaderboardData = [
        { username: "GlobeTrotterX", score: 250 },
        { username: "Explorer99", score: 230 },
        { username: "WanderlustTom", score: 210 },
        { username: "JetsetterJane", score: 195 },
        { username: "NomadNina", score: 180 },
        { username: "BackpackerBen", score: 160 },
        { username: "VoyagerVic", score: 140 },
      ];
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(leaderboardData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchLeaderboard = async () => {
//       try {
//         const response = await axios.get('/api/leaderboard');
//         setLeaderboard(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch leaderboard data');
//         setLoading(false);
//       }
//     };

//     fetchLeaderboard();
//   }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-light-blue-500">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-light-blue-500">
        {error}
      </div>
    );
  }

  return (
    
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Leaderboard</h2>
        <ul className="space-y-4">
          {leaderboard.map((entry, index) => (
            <li key={index} className="flex justify-between items-center p-0 bg-gray-100 rounded-lg">
              <span className="font-bold">{index + 1}. {entry.username}</span>
              <span className="text-zinc-400 font-bold">{entry.score}</span>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default Leaderboard;