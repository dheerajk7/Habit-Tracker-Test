const express = require('express');
const router = express.Router();

//accessing home controller
var homeController = require('../controllers/home_controller');

//routes
router.get('/',homeController.home);

//routes for adding add habit form view
router.get('/add-habit',homeController.addHabit);
//saving habit
router.post('/save-habit',homeController.saveHabit);
router.get('/changeStatus',homeController.changeStatus);
router.get('/week-view',homeController.weekView);
//getting curent day status
router.get('/day-status',homeController.dayStatus);
//deleting habit
router.get('/delete',homeController.delete);
module.exports = router;