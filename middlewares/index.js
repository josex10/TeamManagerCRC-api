const middlewareJWT             = require('../middlewares/TMCRC.jwt.middleware');
const middlewareCheckFields     = require('./validar-campos.middleware');

module.exports = {
    ...middlewareJWT,
    ...middlewareCheckFields
}