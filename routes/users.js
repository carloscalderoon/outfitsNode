const router = require('express').Router();

const usersController = require('../controllers/usersController');

router.get('/new', usersController.new);
router.post('/', usersController.create);

module.exports = router;