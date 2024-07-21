import React, { useState } from "react";
import MealContainer from "./MealContainer";
import MealType from "./MealType";
import MealsList from "./MealsList";
import MealPopup from "./MealPopup";
import { PlusCircle, Swap } from "@phosphor-icons/react";

const DayMealContainer2 = ({ dietDetails, setDietDetails }) => {
  const [copy, setCopy] = useState("");
  const [togglePopup, setTogglePopup] = useState(false);
  const [mealsList, setMealsList] = useState([]);

  console.log("daya", dietDetails);
  return (
    <>
      {dietDetails?.mealDetails?.map((item) => (
        <div className="relative">
          <div
            className={`mb-2 mr-2 rounded-lg border border border-gray-500 bg-violet-400 p-3 shadow-xl`}
          >
            {item?.mealType}
            <MealsList meals={item?.items} />

            <div className="flex justify-center text-center">
              <PlusCircle
                className="cursor-pointer"
                size={32}
                color="blue"
                onClick={() => setTogglePopup(true)}
              />
              <Swap
                className="cursor-pointer"
                // onClick={() => handleCopy(day)}
                color="green"
                size={32}
              />
            </div>
          </div>
          {togglePopup && (
            <div className="absolute">
              <MealPopup
                mealsList={mealsList}
                setMealsList={setMealsList}
                setTogglePopup={setTogglePopup}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default DayMealContainer2;
