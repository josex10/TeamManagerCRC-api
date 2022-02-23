
const { Schema, model } = require('mongoose');
const Player = require('../models/TMCRC.player.model');

const TeamSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    logo: {
        type: String,
    },
    code: {
        type: Number
    },
    manager: { 
        type: Schema.ObjectId, ref: "Player",
        required: [true, 'The manager is required.']
    },
    active: {
        type: Boolean,
        default: true,
    }
});

module.exports = model('Team', TeamSchema);