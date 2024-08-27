const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['health', 'productivity', 'mindfulness'] },
  tags: [String],
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'] },
  status: Boolean // Ensure this field is present
});


module.exports = mongoose.model('Habit', habitSchema);
