const { response, request } = require('express');
const Usuario = require('../models/usuario.model');
const Player = require('../models/TMCRC.player.model');
const bcryptjs = require('bcryptjs');


const playerGET = async (req = request, res = response)=>{
    const query = {active:true};

    const [total, players] = await Promise.all([
        Player.countDocuments(query),
        Player.find(query)]);

    res.json({total, players});
}

const playerPOST = async (req, res = response)=>{

    const {email, password, name, lastname, tShirtNumber, dateOfBirth, photo, skills, weakFoot, weight, height, position, nationality, phoneNumber} = req.body;
    const player = new Player({email, password, name, lastname, tShirtNumber, dateOfBirth, photo, skills, weakFoot, weight, height, position, nationality, phoneNumber});
   
    //ENCRIPTAR LA CONTRASENA
    const salt = bcryptjs.genSaltSync();
    player.password = bcryptjs.hashSync(password, salt);

    //GUARDAR EN DB
    await player.save();

    res.json({player});
}

const playerPUT = async (req = request, res = response)=>{

    const { id } = req.params;
    const { _id, password, ...rest } = req.body;

    //TODO: VALIDAR VS DB

    if(password){
        //ENCRIPTAR LA CONTRASENA
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const player = await Player.findByIdAndUpdate(id, rest)

    res.json({
        player
    });
}

const playerDELETE = async (req, res = response)=>{

    const { id } = req.params;

    //BORRAR FISICAMENTE
    // const usuario = await Usuario.findByIdAndDelete( id );

    //BORRAR CON INTEGRACION
    const player = await Player.findByIdAndUpdate( id, { active: false});


    res.json({
        player
    });
}


module.exports = {
    playerGET, playerPOST, playerPUT, playerDELETE
}