const express = require('express');
const router = express.Router();
const newsController = require('../routes/userRoutes');
const userController = require('../controller/userController');


router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/new', userController.creatUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/login', userController.login);
module.exports = router;