import React, { useState } from "react";
import MealContainer from "./MealContainer";
import MealType from "./MealType";

const DayMealContainer = ({ dietDetails, setDietDetails }) => {
  const [copy, setCopy] = useState("");
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8">
        {dietDetails.map((meal, i) => (
          <>
            <div className="p-4 bg-green-100">
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
    </div>
  );
};

export default DayMealContainer;
