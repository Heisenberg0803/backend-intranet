const express = require('express');
const router = express.Router();
const registrationController = require('../controller/registrationController');

router.get('/events/:eventId/registration',registrationController.getAll);
router.get('/events/:eventId/registration/:registrationId', registrationController.getById);
router.post('/events/:eventId/registration/new', registrationController.createRegistration);
router.delete('/events/:eventId/registration/:registrationId', registrationController.deleteRegistration);

module.exports = router;