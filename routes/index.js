const router = require("express").Router();
const apiRoutes = require("./API");
const path = require("path");

// const restaurantRoutes = require('./restaurants');
// API Routes
// router.use("/api", apiRoutes);
// router.use('/api/restaurants', restaurantRoutes);
router.use("/api", apiRoutes);

// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

module.exports = router;
