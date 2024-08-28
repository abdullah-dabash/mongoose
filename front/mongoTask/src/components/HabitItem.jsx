import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // Import the ProgressBar component

const HabitItem = ({ habit, onDelete, onUpdate }) => {
  const { _id, name, description, category, tags, frequency, status } = habit;
  const [isEditing, setIsEditing] = useState(false);
  const [editHabit, setEditHabit] = useState({
    name, description, category, tags, frequency, status
  });

  // Progress as a percentage
  const progress = status ? 100 : 0;

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
    // Update status and progress
    onUpdate({ _id, ...editHabit, status: true });
  };

  return (
    <li className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
      {isEditing ? (
        <div>
          {/* Your existing editing form here */}
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
      ) : (
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="mt-1 text-gray-700">{description}</p>
          <p className="mt-1 text-gray-600">Category: {category}</p>
          <p className="mt-1 text-gray-600">Tags: {tags.join(', ')}</p>
          <p className="mt-1 text-gray-600">Frequency: {frequency}</p>

          <div className="mt-4">
            <ProgressBar progress={progress} />
            <p className="mt-2 text-gray-600">
              Status: {status ? 'Completed' : 'Not Completed'}
            </p>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleComplete()}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Complete
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
