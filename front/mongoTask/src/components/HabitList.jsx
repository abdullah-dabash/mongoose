import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HabitItem from './HabitItem';
import HabitForm from './HabitForm';

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('');

  // Fetch habits from the server
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/habits');
        setHabits(response.data);
        setFilteredHabits(response.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // Apply filters to the habit list
  useEffect(() => {
    let filtered = habits;

    if (categoryFilter) {
      filtered = filtered.filter(habit => habit.category === categoryFilter);
    }

    if (frequencyFilter) {
      filtered = filtered.filter(habit => habit.frequency === frequencyFilter);
    }

    setFilteredHabits(filtered);
  }, [categoryFilter, frequencyFilter, habits]);

  // Delete a habit
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/habits/${id}`);
      setHabits(habits.filter(habit => habit._id !== id));
      setFilteredHabits(filteredHabits.filter(habit => habit._id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  // Update a habit
  const handleUpdate = async (updatedHabit) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/habits/${updatedHabit._id}`, updatedHabit);
      setHabits(habits.map(habit => habit._id === updatedHabit._id ? response.data : habit));
      setFilteredHabits(filteredHabits.map(habit => habit._id === updatedHabit._id ? response.data : habit));
    } catch (error) {
      console.error('Error updating habit:', error);
    }
  };

  // Add a new habit
  const handleAdd = async (newHabit) => {
    try {
      const response = await axios.post('http://localhost:3000/api/habits', newHabit);
      setHabits([...habits, response.data]);
      setFilteredHabits([...filteredHabits, response.data]);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Habit List</h2>

        <HabitForm onAdd={handleAdd} />

        <div className="mb-6">
          <div className="flex gap-4 mb-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700">Category:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option value="">All Categories</option>
                <option value="health">Health</option>
                <option value="productivity">Productivity</option>
                <option value="mindfulness">Mindfulness</option>
              </select>
            </div>
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700">Frequency:</label>
              <select
                value={frequencyFilter}
                onChange={(e) => setFrequencyFilter(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option value="">All Frequencies</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        <ul className="space-y-4">
          {filteredHabits.length > 0 ? (
            filteredHabits.map(habit => (
              <HabitItem
                key={habit._id}
                habit={habit}
                onDelete={() => handleDelete(habit._id)}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <li className="text-center text-gray-600">No habits found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HabitList;
