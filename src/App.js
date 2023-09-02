import { useEffect, useState } from "react";
import "./App.css";
import DayMealContainer from "./components/DayMealContainer";
import { mealData } from "./data";

function App() {
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  const [dietDetails, setDietDetails] = useState(mealData);
  useEffect(() => {
    if (dietDetails) {
      setDietDetails(dietDetails);
    }
  }, [dietDetails]);

  return (
    <div className="App">
      <div className="grid h-[25vh] grid-cols-1 grid-cols-8 place-items-center">
        <div></div>
        {days.map((day, index) => (
          <h3 key={`${day}~~${index}`}>{day}</h3>
        ))}
      </div>
      <DayMealContainer
        dietDetails={dietDetails}
        setDietDetails={setDietDetails}
      />
    </div>
  );
}

export default App;
