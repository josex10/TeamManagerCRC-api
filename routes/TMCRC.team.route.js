const { Router }                        = require('express');
const { check }                         = require('express-validator');

const { teamGET, 
        teamPOST, 
        teamPUT, 
        teamDELETE }                  = require('../controllers/TMCRC.team.controller');

const { checkIfTheplayerExistById, 
        checkIfTheTeamExistById }     = require('../helpers/db-validators.helpers');

const { validarJWT, 
        validarCampos }               = require('../middlewares');

        

const router = Router();

router.get('/', validarJWT, teamGET);

router.post('/', [
    validarJWT, 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('manager', 'No es un ID valido').isMongoId(),
    check('manager').custom(checkIfTheplayerExistById),
    validarCampos
] ,teamPOST);

 //TODO

router.put('/:id',[
    validarJWT, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(checkIfTheTeamExistById),
    validarCampos
], teamPUT);

router.delete('/:id',[
    validarJWT, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(checkIfTheTeamExistById),
    validarCampos
], teamDELETE);

module.exports = router;