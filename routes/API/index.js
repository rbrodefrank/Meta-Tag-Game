const router = require("express").Router();
const images = require('./imageRoutes');
const tags = require('./tagRoutes');
const userTags = require('./userTagRoutes');

// API routes
router.use('/userTags', userTags);
router.use('/tags', tags);
router.use('/images', images);
module.exports = router;