import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // Import the ProgressBar component

const HabitItem = ({ habit, onDelete, onUpdate }) => {
  const { _id, name, description, category, tags, frequency, status } = habit;
  const [isEditing, setIsEditing] = useState(false);
  const [editHabit, setEditHabit] = useState({
    name, description, category, tags, frequency, status
  });
  const [completed, setCompleted] = useState(status);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditHabit(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'tags' ? value.split(',').map(tag => tag.trim()) : value)
    }));
  };

  const handleSave = () => {
    onUpdate({ _id, ...editHabit });
    setIsEditing(false);
  };

  const handleComplete = () => {
    setCompleted(true);
    onUpdate({ _id, ...editHabit, status: true });
  };

  return (
    <li className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editHabit.name}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
            placeholder="Habit Name"
          />
          <textarea
            name="description"
            value={editHabit.description}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
            placeholder="Description"
          />
          <input
            type="text"
            name="tags"
            value={editHabit.tags.join(', ')}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
            placeholder="Tags (comma-separated)"
          />
          <select
            name="category"
            value={editHabit.category}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
          >
            <option value="health">Health</option>
            <option value="productivity">Productivity</option>
            <option value="mindfulness">Mindfulness</option>
          </select>
          <select
            name="frequency"
            value={editHabit.frequency}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 mb-2"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="mt-1 text-gray-700">{description}</p>
          <p className="mt-1 text-gray-600">Category: {category}</p>
          <p className="mt-1 text-gray-600">Tags: {tags.join(', ')}</p>
          <p className="mt-1 text-gray-600">Frequency: {frequency}</p>

          <div className="mt-4">
            <ProgressBar progress={completed ? 100 : 0} />
            <p className="mt-2 text-gray-600">
              Status: {completed ? 'Completed' : 'Not Completed'}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleComplete}
              className={`px-4 py-2 rounded-md ${completed ? 'bg-green-500' : 'bg-green-400'} text-white`}
              disabled={completed}
            >
              Complete
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(_id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default HabitItem;
