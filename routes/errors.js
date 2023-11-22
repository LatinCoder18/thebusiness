
const { Router } = require('express');
const { body } = require('express-validator');
const { reportError } = require('../controllers/errors');
const { validateFields } = require('../helpers/ValidatorMiddleware');
const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();

router.post('/', secureAsync(reportError));


module.exports = router; 