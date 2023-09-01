import React, { useEffect, useState } from "react";

const MealType = ({ mealDetails, setDietDetails, id, dietDetails }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(mealDetails.time);
  }, [mealDetails]);

  const handleOnChange = e => {
    setTime(e.target.value);
    const copy = [...dietDetails];
    copy[id].mealDetails = {
      ...copy[id - 1].mealDetails,
      time: e.target.value,
    };
    setDietDetails(copy);
  };

  return (
    <>
      <h3>{mealDetails.mealType}</h3>
      <p>at</p>
      <input type="time" value={time} onChange={handleOnChange} />
    </>
  );
};

export default MealType;
