import { useEffect, useState } from "react";
import "./App.css";
import DayMealContainer from "./components/DayMealContainer";
import { mealData } from "./data";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DEFAULT_WEEK = { startDate: "", list: [] };
const DEFAULT_MEAL = {
  mealId: 1,
  mealDetails: {
    mealType: "",
    time: "",
  },
  Days: [
    { dayId: 1, day: "Day 1", items: [] },
    { dayId: 2, day: "Day 2", items: [] },
    { dayId: 3, day: "Day 3", items: [] },
    { dayId: 4, day: "Day 4", items: [] },
    { dayId: 5, day: "Day 5", items: [] },
    { dayId: 6, day: "Day 6", items: [] },
    { dayId: 7, day: "Day 7", items: [] },
  ],
};

function App() {
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  const [dietDetails, setDietDetails] = useState([]);
  const [actions, setActions] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [weeklyMeal, setWeeklyMeal] = useState("");
  const [selectedWeek, setSelectedWeek] = useState(DEFAULT_WEEK);
  const [isEnable, setIsEnable] = useState(false);
  // useEffect(() => {
  //   if (dietDetails) {
  //     setDietDetails(dietDetails);
  //   }
  // }, [dietDetails]);

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // PDF page width
      const pageHeight = 295; // PDF page height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    });
  };

  const handleDate = (val) => {
    setSelectedDate(val);
    setSelectedWeek((prev) => ({ ...prev, startDate: val }));
  };
  const handleAddMeal = () => {
    setIsEnable(true);
    setSelectedWeek((prev) => ({
      ...prev,
      list: [...prev.list, DEFAULT_MEAL],
    }));
    setDietDetails((prev) => [...prev, DEFAULT_MEAL]);
  };

  // const handleReset = () => {
  //   setSelectedWeek
  // }
  console.log("week", selectedWeek);
  return (
    <div className="App">
      <PDFDownloadLink document={<PDF mealData={mealData} />} fileName="md.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
      <div>
        <div id="pdf-content">
          {/* Your content goes here */}
          <h1>Hello, PDF!</h1>
          <p>This is a sample HTML content that will be converted to PDF.</p>
        </div>

        <button onClick={generatePDF}>Download PDF</button>
      </div>
      <div className="flex justify-between pl-4">
        {" "}
        <DatePicker
          showIcon
          selected={selectedDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => handleDate(date)}
          minDate={new Date()}
        />
        {!isEnable ? (
          <button onClick={handleAddMeal}>Add Meal Item</button>
        ) : (
          <>
            {" "}
            <button onClick={() => setIsEnable(!isEnable)}>
              Reset Meal Item
            </button>
            <button>Save</button>
          </>
        )}
      </div>
      {isEnable && (
        <div className="container mx-auto">
          <div className="grid h-[10vh] grid-cols-8 place-items-center">
            <div></div>
            {days?.map((day, index) => (
              <h3
                className="rounded-lg border border-gray-500 bg-white px-3 py-1 text-gray-800 shadow-lg"
                key={`${day}~~${index}`}
              >
                {day}
              </h3>
            ))}
          </div>
        </div>
      )}

      {isEnable && (
        <DayMealContainer
          dietDetails={dietDetails}
          setDietDetails={setDietDetails}
        />
      )}
      <div className="container mx-auto">
        <div className="grid h-[10vh] grid-cols-8 place-items-center">
          <div></div>
          {days.map((day, index) => (
            <h3
              className="rounded-lg border border-gray-500 bg-white px-3 py-1 text-gray-800 shadow-lg"
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
