const { request, reponse} = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req=request, res=reponse, next ) => {

    const errors = validationResult( req );
    if( !errors.isEmpty() ){
        return res.status( 400 ).json( errors )
    }

    next();

}

module.exports = { validarCampos };