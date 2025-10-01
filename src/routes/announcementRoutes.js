const express = require('express');
const router = express.Router();
const announcementController = require('../controller/announcementController');


router.post('/new', announcementController.createAnnouncement);
router.get('/', announcementController.getAll);
router.get('/:id', announcementController.getById);
router.put('/:id', announcementController.updateAnnouncement);
router.delete("/:id", announcementController.deleteAnnouncement);

module.exports = router;