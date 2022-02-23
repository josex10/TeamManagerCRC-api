const jwt = require('jsonwebtoken');
const Team = require('../models/TMCRC.team.model');

const generarJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWTSECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

const generateTeamCode = async (_id ='')=>{

    let exit = false;
    let code = '';

    do {
        const randomChars = '0123456789';
        
        for ( var i = 0; i < 6; i++ ) {
            code += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }

        const team = await Team.findOne({code});
        if(!team){
            exit = true;
        }
        
    } while (!exit);

    return code;
}

module.exports = {
    generarJWT, 
    generateTeamCode
}
