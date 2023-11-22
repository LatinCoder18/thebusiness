const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/ValidatorMiddleware');
const { validateJWT } = require('../middlewares/ValidateJWT');
const { createBusiness, getAllBusinesses, getBusinessById, getBusinessesByCategory, deleteBusiness, updateBusiness, setUnsetPromotedBusiness, uploadBusinessImage } = require('../controllers/business');
const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();

const router = Router();


router.post('/', [
    check('description', 'Por favor verifica la descripción').not().isEmpty(),
    check('name', 'Por favor verifica el nombre').not().isEmpty(),
    check('category', 'Por favor verifica la categoría').not().isEmpty(),
    validateFields],
    secureAsync(createBusiness));
router.get('/', secureAsync(getAllBusinesses));
router.get('/:id', [check('id', 'Envía el identificador del negocio').not().isEmpty(), validateFields], secureAsync(getBusinessById));
router.get('/category/:category', [check('category', 'Envía la categoría a consultar').not().isEmpty(), validateFields], secureAsync(getBusinessesByCategory));
router.patch('/:id', [
    check('id', 'Envía el identificador del negocio').not().isEmpty(),
    check('description', 'Por favor verifica la descripción').not().isEmpty(),
    check('name', 'Por favor verifica el nombre').not().isEmpty(),
    validateFields],
    secureAsync(updateBusiness));
router.delete('/:id', [check('id', 'Envía el identificador del negocio').not().isEmpty(), validateFields], secureAsync(deleteBusiness));
router.patch('/promote/:id', [
    check('id', 'Envía el identificador del negocio').not().isEmpty(),
    check('isPromoted', 'Envía el estado de promoción').not().isEmpty().isBoolean(),
    validateFields], secureAsync(setUnsetPromotedBusiness));
router.post('/image/:id', [
    check('id', 'Envía el identificador del negocio').not().isEmpty(),
    validateFields], secureAsync(uploadBusinessImage));

module.exports = router;
