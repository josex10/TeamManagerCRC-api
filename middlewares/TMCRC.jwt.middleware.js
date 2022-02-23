const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Player = require('../models/TMCRC.player.model');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWTSECRETORPRIVATEKEY );

        // leer el jugador que corresponde al uid
        const player = await Player.findById( uid );

        if( !player ) {
            return res.status(401).json({
                msg: 'Token no válido - Jugador no existe DB.'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !player.active ) {
            return res.status(401).json({
                msg: 'Token no válido - El jugador esta desactivado.'
            })
        }
        
        
        req.player = player;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}




module.exports = {
    validarJWT
}