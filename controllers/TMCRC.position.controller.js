const { response, request } = require('express');
const Position = require('../models/TMCRC.position.model');


const positionGET = async (req = request, res = response)=>{
    const query = {active:true};

    const [total, positions] = await Promise.all([
        Position.countDocuments(query),
        Position.find(query)]);

    res.json({total, positions});
}

const positionPOST = async (req, res = response)=>{

    const {name, shortname, active} = req.body;
    const position = new Position({name, shortname, active});

    //GUARDAR EN DB
    await position.save();

    res.json({position});
}

const positionPUT = async (req = request, res = response)=>{

    const { id } = req.params;
    const { _id, ...rest } = req.body;

    const position = await Position.findByIdAndUpdate(id, rest)

    res.json({
        position
    });
}

const positionDELETE = async (req, res = response)=>{

    const { id } = req.params;

    //BORRAR CON INTEGRACION
    const position = await Position.findByIdAndUpdate( id, { active: false});


    res.json({
        position
    });
}


module.exports = {
    positionGET, positionPOST, positionPUT, positionDELETE
}