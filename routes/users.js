
const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers } = require('../controllers/users');

const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();
const router = Router();

router.get('/', secureAsync(getUsers));


module.exports = router; 