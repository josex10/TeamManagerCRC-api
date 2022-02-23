const { Router }                        = require('express');
const { check }                         = require('express-validator');
const { playerGET, 
        playerPOST, 
        playerPUT, 
        playerDELETE }                  = require('../controllers/TMCRC.player.controller');

const { checkIfEmailPlayerExist, 
        checkIfPositionExistById, 
        checkIfTheplayerExistById }     = require('../helpers/db-validators.helpers');

const { validarJWT, 
        validarCampos }                 = require('../middlewares');

        

const router = Router();

router.get('/', validarJWT, playerGET);

router.post('/', [
    validarJWT, 
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(checkIfEmailPlayerExist),
    check('password', 'El password es obligatorio y debe de tener al menos 6 caracteres.').isLength({ min:6}),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('dateOfBirth', 'La fecha de nacimiento es obligatoria').not().isEmpty(),
    check('position', 'La posicion no es valida').isMongoId(),
    check('position').custom(checkIfPositionExistById),
    check('nationality', 'La nacionalidad es requerida.').not().isEmpty(),
    validarCampos
] ,playerPOST);

router.put('/:id',[
    validarJWT, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(checkIfTheplayerExistById),
    validarCampos
], playerPUT);

router.delete('/:id',[
    validarJWT, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(checkIfTheplayerExistById),
    validarCampos
], playerDELETE);

module.exports = router;