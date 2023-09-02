import React, { useState } from "react";

const MealsList = ({ meals, setMeals }) => {
  const [editingMealIndex, setEditingMealIndex] = useState(null);
  const [inputMeal, setInputMeal] = useState("");

  const handleDeleteMeal = (index) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(index, 1);
    setMeals(updatedMeals);
  };

  const handleUpdateMeal = () => {
    if (inputMeal.trim() !== "") {
      const updatedMeals = [...meals];
      updatedMeals[editingMealIndex] = inputMeal;
      setMeals(updatedMeals);
      setInputMeal("");
      setEditingMealIndex(null);
    }
  };

  const handleEditMeal = (index) => {
    setEditingMealIndex(index);
    setInputMeal(meals[index]);
  };

  return (
    <div>
      <ul className="h-[20vh] overflow-y-auto py-1">
        {meals.map((meal, index) => (
          <>
            <li
              key={index}
              className="mb-2 flex items-center justify-between bg-white text-xs"
            >
              {editingMealIndex === index ? (
                <input
                  type="text"
                  value={inputMeal}
                  onChange={(e) => setInputMeal(e.target.value)}
                  autoFocus
                />
              ) : (
                <span>{meal}</span>
              )}
              {editingMealIndex === index ? (
                <div className="space-x-2">
                  {/* <button className="text-blue-500" onClick={handleUpdateMeal}>
                  Update
                </button> */}
                  <button
                    className="text-red-500"
                    onClick={() => {
                      setInputMeal("");
                      setEditingMealIndex(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  {/* <button
                  className="text-blue-500"
                  onClick={() => handleEditMeal(index)}
                >
                  ✏
                </button> */}
                  <button
                    className="text-red-500"
                    onClick={() => handleDeleteMeal(index)}
                  >
                    ❌
                  </button>
                </div>
              )}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};

export default MealsList;
