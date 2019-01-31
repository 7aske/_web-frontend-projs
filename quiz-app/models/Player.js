const mongoose = require('mongoose');
const playerTemplate = new mongoose.Schema(
    {
        player: { type: String, required: true },
        length: { type: Number, required: true },
        points: { type: Number, required: true },
        time: { type: Number, required: true }
    },
    {
        collection: 'leaderboard'
    }
);

module.exports = mongoose.model('Player', playerTemplate);
