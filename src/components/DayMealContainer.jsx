import React, { useState } from "react";
import MealContainer from "./MealContainer";
import MealType from "./MealType";
import { PlusCircle } from "@phosphor-icons/react";

const DayMealContainer = ({ dietDetails, setDietDetails }) => {
  const [copy, setCopy] = useState("");
  const newMeal = {
    mealId: 8,
    mealDetails: {
      mealType: "",
      time: "",
    },
    Days: [
      { dayId: dietDetails.length * 10 + 1, day: "Day 1", items: [] },
      { dayId: dietDetails.length * 10 + 2, day: "Day 2", items: [] },
      { dayId: dietDetails.length * 10 + 3, day: "Day 3", items: [] },
      { dayId: dietDetails.length * 10 + 4, day: "Day 4", items: [] },
      { dayId: dietDetails.length * 10 + 5, day: "Day 5", items: [] },
      { dayId: dietDetails.length * 10 + 6, day: "Day 6", items: [] },
      { dayId: dietDetails.length * 10 + 7, day: "Day 7", items: [] },
    ],
  };

  console.log("mealss", dietDetails);
  return (
    <div className="container mx-auto">
      <div className="border-red grid grid-cols-8">
        {dietDetails.map((meal, i) => (
          <>
            <div className="mb-2 mr-4 rounded-md border border-black bg-white p-4 shadow-xl">
              <MealType
                mealDetails={meal.mealDetails}
                id={i}
                setDietDetails={setDietDetails}
                dietDetails={dietDetails}
              />
            </div>
            {meal.Days.map((day, index) => (
              <div key={index}>
                <MealContainer
                  day={day}
                  id={i}
                  dayId={index}
                  setDietDetails={setDietDetails}
                  dietDetails={dietDetails}
                  setCopy={setCopy}
                  copy={copy}
                />
              </div>
            ))}
          </>
        ))}
      </div>
      <PlusCircle
        className="cursor-pointer"
        size={32}
        color="blue"
        onClick={() => setDietDetails([...dietDetails, newMeal])}
        // onClick={() => setTogglePopup(true)}
      />
    </div>
  );
};

export default DayMealContainer;
