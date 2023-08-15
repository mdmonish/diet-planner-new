import React, { useState } from "react";
import MealPopup from "./MealPopup";
import MealsList from "./MealsList";

const MealContainer = () => {
  //   const meals = ["Chicken", "Mutton", "Halwa", "Sabzi"];
  const [togglePopup, setTogglePopup] = useState(false);
  const [mealsList, setMealsList] = useState([]);

  return (
    <div>
      <MealsList meals={mealsList} />
      {togglePopup ? (
        <MealPopup
          setMealsList={setMealsList}
          setTogglePopup={setTogglePopup}
        />
      ) : (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setTogglePopup(true)}
        >
          Create
        </button>
      )}
    </div>
  );
};

export default MealContainer;
