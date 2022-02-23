
const { Schema, model } = require('mongoose');
const Position = require('../models/TMCRC.position.model');
const Team = require('../models/TMCRC.team.model');

const PlayerSchema = Schema({
    email: {
        type: String,
        required: [true, 'The email is required.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required.']
    },
    name: {
        type: String,
        required: [true, 'The name is required.']
    },
    lastname: {
        type: String,
        required: [true, 'The lastname is required.']
    },
    tShirtNumber: {
        type: Number
    },
    dateOfBirth: {
        type: Date, 
        required: [true, 'The date of birth is required.']
    },
    photo: {
        type: String
    },
    skills: {
        type: Number,
    },
    weakFoot: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    height: {
        type: Number,
    },
    position: { 
        type: Schema.ObjectId, ref: "Position",
        required: [true, 'The position is required.']
    },
    teams: [{ type: Schema.ObjectId, ref: 'Team' }],
    nationality: {
        type: String,
        required: [true, 'The nationality is required.']
    },
    phoneNumber: {
        type: String
    },
    active : {
        type: Boolean, 
        default: true
    }, 
    creationDate: {
        type: Date, 
        default: Date.now()
    },
    stats: {
        peace: {
            sprintSpeed: {
                type: Number
            },
            acceleration: {
                type: Number
            } 
        },
        passing: {
            vision: {
                type: Number
            }, 
            crossing: {
                type: Number
            },
            fKAccuracy: {
                type: Number
            },
            shortPassing: {
                type: Number
            },
            longPassing: {
                type: Number
            },
            curve: {
                type: Number
            },
        },
        dribbling: {
            agility: {
                type: Number
            },
            balance: {
                type: Number
            }, 
            reactions: {
                type: Number
            }, 
            ballControl: {
                type: Number
            }, 
            dribbling: {
                type: Number
            }, 
            composure: {
                type: Number
            },  
        },
        defending: {
            interceptions: {
                type: Number
            }, 
            headingAccuracy: {
                type: Number
            },
            awarenes: {
                type: Number
            },
            standingTackle: {
                type: Number
            },
            slidingTackle: {
                type: Number
            }
        },
        shooting: {
            positioning: {
                type: Number
            }, 
            finishing: {
                type: Number
            }, 
            shotPower: {
                type: Number
            }, 
            longShots: {
                type: Number
            }, 
            volleys: {
                type: Number
            }, 
            penalties: {
                type: Number
            }, 
        },
        physicality: {
            jumping: {
                type: Number
            }, 
            stamina: {
                type: Number
            }, 
            strength: {
                type: Number
            }, 
            aggression: {
                type: Number
            }
        }
    }
    
});

PlayerSchema.methods.toJSON = function() {
    const {  __v,_id, password, ...player} = this.toObject();
    player.uid = _id;
    return player;
}

 
module.exports = model('Player', PlayerSchema);