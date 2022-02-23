const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Player = require('../models/TMCRC.player.model');

const { generarJWT } = require('../helpers/generators.helpers');


const login = async(req, res = response) => {

    const { mail, password } = req.body;

    try {
      
        // Verificar si el email existe
        const player = await Player.findOne({ mail });
        if ( !player ) {
            return res.status(400).json({
                msg: 'El Jugador / Password no son correctos - correo'
            });
        }

        // SI el jugador está activo
        if ( !player.active ) {
            return res.status(400).json({
                msg: 'El jugador / Password no son correctos - desactivado'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, player.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'El jugador / Password no son correctos - password'
            });
        }

        console.log(player)
        // Generar el JWT
        const token = await generarJWT( player.id );

        res.json({
            player,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error en el sistema favor contactar al administrador del sistema.'
        });
    }   

}



module.exports = {
    login
}
