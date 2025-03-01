const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  try {
    const topScorers = await User.find().sort({ highestScore: -1 }).limit(10);
    const leaderboard = topScorers.map(user => ({
      username: user.username,
      score: user.highestScore,
    }));
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard data' });
  }
};