const { response, request } = require('express');
const Team = require('../models/TMCRC.team.model');
const { generateTeamCode } = require('../helpers/generators.helpers');


const teamGET = async (req = request, res = response)=>{
    const query = {active:true};

    const [total, teams] = await Promise.all([
        Team.countDocuments(query),
        Team.find(query)]);

    res.json({total, teams});
}

const teamPOST = async (req, res = response)=>{

    const { name, logo, manager } = req.body;
    const team = new Team({name, logo, manager});

    team.code = await generateTeamCode();

    await team.save();

    res.json({team});
}

const teamPUT = async (req = request, res = response)=>{

    const { id } = req.params;
    const { code, manager, ...rest } = req.body;
    const team = await Team.findByIdAndUpdate(id, rest);

    res.json({
        team
    });
}

const teamDELETE = async (req, res = response)=>{

    const { id } = req.params;

    //BORRAR CON INTEGRACION
    const team = await Team.findByIdAndUpdate( id, { active: false});


    res.json({
        team
    });
}


module.exports = {
    teamGET, teamPOST, teamPUT, teamDELETE
}