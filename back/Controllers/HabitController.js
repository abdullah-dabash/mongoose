const Habit = require('../model/Habit'); // Ensure this path is correct

// Get all habits
exports.getAllHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching habits', error });
  }
};

// Create a new habit
exports.createHabit = async (req, res) => {
  const { name, description, category, tags, frequency, completed } = req.body;

  try {
    const newHabit = new Habit({
      name,
      description,
      category,
      tags,
      frequency,
      completed
    });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (error) {
    res.status(500).json({ message: 'Error creating habit', error });
  }
};

// Update a habit
exports.updateHabit = async (req, res) => {
  const { id } = req.params;
  const { name, description, category, tags, frequency, completed } = req.body;

  try {
    const updatedHabit = await Habit.findByIdAndUpdate(id, {
      name,
      description,
      category,
      tags,
      frequency,
      completed
    }, { new: true });

    if (!updatedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json(updatedHabit);
  } catch (error) {
    res.status(500).json({ message: 'Error updating habit', error });
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedHabit = await Habit.findByIdAndDelete(id);

    if (!deletedHabit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting habit', error });
  }
};
