const express = require('express');
const router = express.Router();

//accessing home controller
var homeController = require('../controllers/home_controller');

//routes
router.get('/',homeController.home);
router.get('/add-habit',homeController.addHabit);
router.post('/save-habit',homeController.saveHabit);
router.get('/changeStatus',homeController.changeStatus);
router.get('/week-view',homeController.weekView);
router.get('/day-status',homeController.dayStatus);
router.get('/delete',homeController.delete);
module.exports = router;