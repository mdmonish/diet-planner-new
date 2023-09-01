import React, { useEffect, useState } from "react";
import MealPopup from "./MealPopup";
import MealsList from "./MealsList";

const MealContainer = ({
  copy,
  setCopy,
  day,
  dayId,
  id,
  dietDetails,
  setDietDetails,
}) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    if (day) setMealsList(day.items);
  }, [day]);

  useEffect(() => {
    const copy = [...dietDetails];
    copy[id].Days[dayId] = { ...copy[id].Days[dayId], items: mealsList };
    setDietDetails(copy);
  }, [mealsList]);

  const findIndex = (mealData, selected) => {
    return mealData.Days.findIndex(day => day.dayId === selected.dayId);
  };

  const handleCopy = obj => {
    if (!copy) {
      setCopy({ id: id, detail: obj });
    } else {
      let updateCop = [...dietDetails];
      let dayCop = [...updateCop[id].Days];
      const findCurrentIndexDay = findIndex(updateCop[id], obj);
      dayCop[findCurrentIndexDay] = {
        ...dayCop[findCurrentIndexDay],
        items: copy.detail.items,
      };

      updateCop[id] = { ...updateCop[id], Days: dayCop };

      const findCopiedIndexDay = findIndex(updateCop[copy.id], copy.detail);
      let dayObj = [...updateCop[copy.id].Days];
      dayObj[findCopiedIndexDay] = {
        ...dayObj[findCopiedIndexDay],
        items: obj.items,
      };
      updateCop[copy.id] = { ...updateCop[copy.id], Days: dayObj };

      setDietDetails(updateCop);
      setCopy("");
    }
  };
  console.log(copy, day);

  return (
    <div className="relative">
      <div
        className={`${
          togglePopup
            ? "backdrop-blur-md overflow-hidden"
            : copy?.detail?.dayId === day?.dayId
            ? "border-2 border-red-500"
            : ""
        } p-3 border`}
      >
        <MealsList meals={mealsList} setMeals={setMealsList} />

        <div className="text-center">
          <button
            className="bg-blue-500 text-white px-2.5 py-1 rounded-full"
            onClick={() => setTogglePopup(true)}
          >
            +
          </button>{" "}
          <button onClick={() => handleCopy(day)}>🔃</button>
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
  );
};

export default MealContainer;
