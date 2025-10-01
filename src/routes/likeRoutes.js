const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');

router.get('/news/:newsId/likes',likeController.getLikesForNews);
router.post('/news/:newsId/likes/new', likeController.likeNews);
router.delete('/news/:newsId/likes', likeController.unlikeNews);

router.get('/news/:newsId/comments/:commentNumber/likes', likeController.getLikesForComment);
router.post('/news/:newsId/comments/:commentNumber/likes/new', likeController.likeComment);
router.delete('/news/:newsId/comments/:commentNumber/likes',likeController.unlikeComment);



module.exports = router;