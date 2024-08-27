const express = require('express');
const router = express.Router();
const Habit = require('../model/Habit');
const habitController = require('../Controllers/HabitController');

router.get('/', habitController.getAllHabits);
router.post('/', habitController.createHabit);
router.put('/:id', habitController.updateHabit);
router.delete('/:id', habitController.deleteHabit);

router.put('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },  // Update the completed status
      { new: true }
    );
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
