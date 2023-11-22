const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/ValidatorMiddleware');
const { validateJWT } = require('../middlewares/ValidateJWT');
const { updateProducts, createProducts, deleteProducts, uploadProductsImage } = require('../controllers/products');
const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();

const router = Router();


router.post('/', [
    check('description', 'Por favor verifica la descripción').not().isEmpty(),
    check('name', 'Por favor verifica el nombre').not().isEmpty(),
    check('businessId', 'Por favor verifica el identificador del negocio').not().isEmpty().isInt(),
    validateFields],
    secureAsync(createProducts));

router.delete('/:id', [
    check('id', 'Envía el identificador del negocio').not().isEmpty(),
    validateFields],
    secureAsync(deleteProducts));
router.patch('/:id', [
    check('id', 'Envía el identificador del negocio').not().isEmpty(),
    check('name', 'Envía el nombre del producto').not().isEmpty(),
    check('description', 'Envía la descripción del producto').not().isEmpty(),
    validateFields],
    secureAsync(updateProducts));
router.post('/image/:id', [
    check('id', 'Envía el identificador del negocio').not().isEmpty(),
    validateFields],
    secureAsync(uploadProductsImage));

module.exports = router;
