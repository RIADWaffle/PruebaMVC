const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/entry', parkingController.registerEntry);
router.post('/exit', parkingController.registerExit);
router.post('/report', parkingController.generateReport);

module.exports = router;
