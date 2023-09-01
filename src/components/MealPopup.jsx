import React, { useEffect, useState } from "react";
import { legacy } from "../data";

const MealPopup = ({ setTogglePopup, setMealsList, mealsList }) => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const [editingMealIndex, setEditingMealIndex] = useState(null);

  useEffect(() => {
    if (mealsList) {
      setMeals(mealsList);
    }
  }, []);

  const handleAddMeal = () => {
    const duplicate = legacy.find(
      item => item?.label?.toLowerCase() === newMeal?.toLowerCase()?.trim()
    );
    if (newMeal.trim() !== "" && !duplicate) {
      setMeals([...meals, newMeal]);

      setNewMeal("");
    }
  };

  const handleEditMeal = index => {
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

  const handleDeleteMeal = index => {
    const updatedMeals = [...meals];
    updatedMeals.splice(index, 1);
    setMeals(updatedMeals);
  };

  const handleOutside = e => {
    if (e.target.id === "con") setTogglePopup(false);
  };

  return (
    // <div className="bg-gray-100 p-4 z-50 w-full mx-auto backdrop-blur-md">
    <div
      className="z-50 fixed inset-0 bg-opacity-40 backdrop-blur-sm"
      id="con"
      onClick={handleOutside}
    >
      <div
        className="w-1/3 min-h-[50vh] mx-auto mt-28 border border-gray-400 bg-gray-100 p-4 rounded-md"
        id="inside"
      >
        <h2 className="text-xl font-semibold mb-4">Create Meals List</h2>
        <div className="flex">
          <div className="relative w-8/12">
            <input
              type="text"
              className=" border border-gray-300 rounded w-full px-2 py-1"
              placeholder="Enter a meal"
              value={newMeal}
              onChange={e => setNewMeal(e.target.value)}
            />
            {newMeal && (
              <div
                className="overflow-y-auto max-h-[20vh] absolute z-10 bg-white w-full overflow-x-hidden shadow-md py-2 cursor-pointer text-sm"
                onClick={e => {
                  setMeals([...meals, e.target.value]);
                  setNewMeal("");
                }}
              >
                {legacy
                  .filter(out =>
                    out.label
                      .toLowerCase()
                      .includes(newMeal.toLowerCase().trim())
                  )
                  .map(opt => (
                    <option className="hover:bg-gray-100 px-2" key={opt.value}>
                      {opt.label}
                    </option>
                  ))}
              </div>
            )}
          </div>
          {editingMealIndex !== null ? (
            <div className="flex w-4/12 justify-evenly">
              {/* <button
                className="bg-green-500 w-2/5 text-white rounded"
                onClick={handleUpdateMeal}
              >
                Update
              </button> */}
              <button
                className="bg-red-500 w-2/5 text-white px-3 py-1 rounded"
                onClick={() => setEditingMealIndex(null)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="bg-green-500 w-3/12 mx-auto text-white px-3 py-1 rounded"
              onClick={handleAddMeal}
            >
              Add Meal
            </button>
          )}
        </div>
        <ul className="mt-4 overflow-y-auto h-[30vh]">
          {meals?.map((meal, index) => (
            <li
              key={index}
              className="bg-white p-2 flex justify-between items-center text-md border border-b-1"
            >
              <span>{meal}</span>
              <div className="space-x-2">
                {/* <button
                  className="text-blue-500"
                  onClick={() => handleEditMeal(index)}
                >
                  Edit
                </button> */}
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
    </div>
  );
};

export default MealPopup;
