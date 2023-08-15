import React, { useState } from "react";

const MealPopup = ({ setTogglePopup, setMealsList }) => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const [editingMealIndex, setEditingMealIndex] = useState(null);

  const handleAddMeal = () => {
    if (newMeal.trim() !== "") {
      setMeals([...meals, newMeal]);
      setNewMeal("");
    }
  };

  const handleEditMeal = (index) => {
    setEditingMealIndex(index);
    setNewMeal(meals[index]);
  };

  const handleUpdateMeal = () => {
    if (newMeal.trim() !== "") {
      const updatedMeals = [...meals];
      updatedMeals[editingMealIndex] = newMeal;
      setMeals(updatedMeals);
      setNewMeal("");
      setEditingMealIndex(null);
    }
  };

  const handleDeleteMeal = (index) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(index, 1);
    setMeals(updatedMeals);
  };

  return (
    <div className="bg-gray-100 p-4">
      <h2 className="text-xl font-semibold mb-4">Add meal</h2>
      <input
        type="text"
        className="w-full border border-gray-300 rounded p-2 mb-2"
        placeholder="Enter a new meal"
        value={newMeal}
        onChange={(e) => setNewMeal(e.target.value)}
      />
      {editingMealIndex !== null ? (
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleUpdateMeal}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => setEditingMealIndex(null)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={handleAddMeal}
        >
          Add Meal
        </button>
      )}
      <ul className="mt-4">
        {meals.map((meal, index) => (
          <li
            key={index}
            className="bg-white p-2 flex justify-between items-center mb-2"
          >
            <span>{meal}</span>
            <div className="space-x-2">
              <button
                className="text-blue-500"
                onClick={() => handleEditMeal(index)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteMeal(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={`bg-blue-500 text-white px-3 py-1 rounded ${
          meals.length === 0 ? "cursor-not-allowed" : ""
        }`}
        disabled={meals.length === 0}
        onClick={() => {
          setTogglePopup(false);
          setMealsList(meals);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default MealPopup;
