import React from "react";

const MealsList = ({ meals }) => {
  return (
    <div>
      {meals.map((meal, index) => (
        <li
          key={index}
          className="bg-white p-2 flex justify-between items-center mb-2"
        >
          <span>{meal}</span>
          <div className="space-x-2">
            <button
              className="text-blue-500"
              //   onClick={() => handleEditMeal(index)}
            >
              Edit
            </button>
            <button
              className="text-red-500"
              // onClick={() => handleDeleteMeal(index)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </div>
  );
};

export default MealsList;
