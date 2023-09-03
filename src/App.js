import { useEffect, useState } from "react";
import "./App.css";
import DayMealContainer from "./components/DayMealContainer";
import { mealData } from "./data";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";

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
      <PDFDownloadLink document={<PDF mealData={mealData} />} fileName="md.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <div className="container mx-auto">
        <div className="grid h-[10vh] grid-cols-8 place-items-center">
          <div></div>
          {days.map((day, index) => (
            <h3
              className="rounded-lg border border-gray-500 bg-yellow-100 px-3 py-1 text-gray-800 shadow-lg"
              key={`${day}~~${index}`}
            >
              {day}
            </h3>
          ))}
        </div>
      </div>
      <DayMealContainer
        dietDetails={dietDetails}
        setDietDetails={setDietDetails}
      />
    </div>
  );
}

export default App;
