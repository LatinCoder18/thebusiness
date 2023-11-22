const { Router } = require('express');
const { login, register, register_mobile, login_mobile } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/ValidatorMiddleware');
const { validateJWT } = require('../middlewares/ValidateJWT');
const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();

const router = Router();
router.post('/login', [
    check('email', 'Por favor verifica el correo').isEmail(),
    check('password', 'You must provide an user password'),
    validateFields],
    secureAsync(login));
router.post('/login_mobile',
    [
        check('mobile_uuid', 'Por favor verifica el identificador del dispositivo'),
        validateFields
    ],
    secureAsync(login_mobile)
)
router.post('/register', [
    validateJWT,
    check('email', 'Por favor verifica el correo').isEmail(),
    check('password', 'You must provide an user password'),
    check('name', 'You must provide an user name').notEmpty(),
    validateFields], secureAsync(register));
router.post('/register_mobile', [
    check('mobile_uuid', 'Por favor verifica el identificador del dispositivo'),
    validateFields], secureAsync(register_mobile));
module.exports = router;
