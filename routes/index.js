const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// Root | index
router.get('/', (req, res) => {
  res.render('index');
});

// Rutas funcionalidad con metodo POST
router.post('/entry', parkingController.registerEntry);
router.post('/exit', parkingController.registerExit);
router.post('/report', parkingController.generateReport);

module.exports = router;
