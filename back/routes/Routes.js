const express = require('express');
const router = express.Router();
const Habit = require('../model/Habit');
const habitController = require('../Controllers/HabitController');

// Route to get all habits
router.get('/', habitController.getAllHabits);

// Route to create a new habit
router.post('/', habitController.createHabit);

// Route to update a habit (general updates)
router.put('/:id', habitController.updateHabit);

// Route to delete a habit
router.delete('/:id', habitController.deleteHabit);

module.exports = router;
