import { useContext, useEffect, useState } from "react";
import "./App.css";
import DayMealContainer from "./components/DayMealContainer";
import { mealData } from "./data";
import store from "./redux/store";
import axios from "axios";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 text-center h-[25vh]">
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
