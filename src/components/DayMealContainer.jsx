import React, { useState } from "react";
import MealContainer from "./MealContainer";
import MealType from "./MealType";

const DayMealContainer = ({ dietDetails, setDietDetails }) => {
  const [copy, setCopy] = useState("");
  return (
    <div className="container mx-auto">
      <div className="border-red grid grid-cols-8">
        {dietDetails?.map((meal, i) => (
          <>
            <div className="mb-2 mr-4 rounded-md border border-black bg-white p-4 shadow-xl">
              <MealType
                mealDetails={meal.mealDetails}
                id={i}
                setDietDetails={setDietDetails}
                dietDetails={dietDetails}
              />
            </div>
            {meal?.Days?.map((day, index) => (
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
    </div>
  );
};

export default DayMealContainer;
