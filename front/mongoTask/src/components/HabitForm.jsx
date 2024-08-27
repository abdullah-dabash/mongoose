import React, { useState } from 'react';
import axios from 'axios';

const HabitForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [frequency, setFrequency] = useState('');
  const [status, setStatus] = useState(false); // Changed from completed to status
  const [alert, setAlert] = useState({ message: '', type: '' }); // State for alerts

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/habits', {
        name,
        description,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        frequency,
        status // Include status field
      });
      // Clear form and set success alert
      setName('');
      setDescription('');
      setCategory('');
      setTags('');
      setFrequency('');
      setStatus(false); // Reset status
      setAlert({ message: 'Habit added successfully!', type: 'success' });
      onAdd(response.data); // Notify parent of new habit
    } catch (error) {
      console.error('Error adding habit', error);
      setAlert({ message: 'Error adding habit. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Add a New Habit</h2>
      
      {/* Alert */}
      {alert.message && (
        <div
          className={`p-4 mb-4 rounded-md ${alert.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
        >
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            placeholder="Enter habit name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            placeholder="Enter habit description"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          >
            <option value="">Select Category</option>
            <option value="health">Health</option>
            <option value="productivity">Productivity</option>
            <option value="mindfulness">Mindfulness</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma-separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            placeholder="Enter tags"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          >
            <option value="">Select Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
