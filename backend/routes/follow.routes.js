const router = require('express').Router();
const controller = require('../controllers/follow.controller');

router.post('/follow', controller.followUser);
router.post('/unfollow', controller.unfollowUser);
router.get('/following', controller.getFollowing);
router.get('/followers', controller.getFollowers);

module.exports = router;
