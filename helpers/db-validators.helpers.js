
const Rol           = require('../models/rol.model');
const Usuario       = require('../models/usuario.model');

const Player        = require('../models/TMCRC.player.model');
const Position      = require('../models/TMCRC.position.model');
const Team          = require('../models/TMCRC.team.model');

const rolExiste = async (rol ='')=>{
    const existRol = await Rol.findOne({rol});
    if(!existRol) throw new Error(`El rol ${rol}, no esta registrado en la DB.`);
}

const correoExiste = async (correo ='')=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo) throw new Error(`El correo ${correo}, ya esta registrado en la DB.`);
}

const usuarioExistePorId = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) throw new Error(`El id ${id} no existe en la DB.`);
}

// TMCRC

const checkIfEmailPlayerExist = async (email ='')=>{
    const emailExist = await Player.findOne({email});
    if(emailExist) throw new Error(`El correo ${email}, ya esta registrado en la DB.`);
}

const checkIfPositionExistById = async (_id ='')=>{
    const positionExist = await Position.findOne({_id});
    if(!positionExist) throw new Error(`La posicion selecionada no existe.`);
}

const checkIfTheplayerExistById = async (_id ='')=>{
    const playerExist = await Player.findOne({_id});
    if(!playerExist) throw new Error(`El usuario seleccionado no existe.`);
}

const checkIfTheTeamExistById = async (_id ='')=>{
    const teamExist = await Team.findOne({_id});
    if(!teamExist) throw new Error(`El equipo seleccionado no existe.`);
}

module.exports = {
    rolExiste, 
    correoExiste,
    usuarioExistePorId,


    checkIfEmailPlayerExist, 
    checkIfPositionExistById, 
    checkIfTheplayerExistById, 
    checkIfTheTeamExistById
}