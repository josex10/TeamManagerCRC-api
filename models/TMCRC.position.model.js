
const { Schema, model } = require('mongoose');

const PositionSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    shortname: {
        type: String,
        required: [true, 'The short shortname is required.']
    }, 
    active : {
        type: Boolean, 
        default: true
    }
});

module.exports = model('Position', PositionSchema);