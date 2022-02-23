const { Router }                        = require('express');
const { check }                         = require('express-validator');

const { positionGET, 
        positionPOST, 
        positionPUT, 
        positionDELETE }                  = require('../controllers/TMCRC.position.controller');

const { checkIfEmailPlayerExist, 
        checkIfPositionExistById, 
        checkIfTheplayerExistById }     = require('../helpers/db-validators.helpers');

const { validarJWT, 
        validarCampos }                 = require('../middlewares');

        

const router = Router();

router.get('/', validarJWT, positionGET);

router.post('/', [
    validarJWT, 
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('shortname', 'El nombre corto es obligatorio').not().isEmpty(),
    validarCampos
] ,positionPOST);

router.put('/:id',[
    validarJWT, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(checkIfPositionExistById),
    validarCampos
], positionPUT);

router.delete('/:id',[
    validarJWT, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(checkIfPositionExistById),
    validarCampos
], positionDELETE);

module.exports = router;