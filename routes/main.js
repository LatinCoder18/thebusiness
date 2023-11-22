const { Router } = require('express');
const { login, register, register_mobile, login_mobile } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/ValidatorMiddleware');
const { validateJWT } = require('../middlewares/ValidateJWT');
const { secureAsync } = require('../middlewares/ErrorValidator').getErrorInstance();

const router = Router();
router.get('/dashboard', (req, res) => {
    res.json({
        "promoted_content": [
            {
                "id": 1,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 2,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 3,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            }
        ],
        "popular_content": [
            {
                "id": 1,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 2,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 3,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 4,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 5,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            }
        ],
        "recent_content": [
            {
                "id": 1,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 2,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 3,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            },
            {
                "id": 4,
                "title": "Panetelas Felices",
                "image": "http://www.panetelasfelices.com/wp-content/uploads/2014/03/panetelas-felices-logo.png"
            }
        ]
    });
});

module.exports = router;
