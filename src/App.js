// import { useEffect, useState } from "react";
// import "./App.css";
// import DayMealContainer from "./components/DayMealContainer";
// import { mealData, DEFAULT_MEAL_DATA } from "./data";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import PDF from "./PDF";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { PlusCircle } from "@phosphor-icons/react";
// import { addDays } from "date-fns";

// const DEFAULT_WEEK = { startDate: "", endDate: "", list: [] };
// const DEFAULT_MEAL = {
//   mealId: "",
//   mealDetails: {
//     mealType: "",
//     time: "",
//   },
//   Days: [
//     { dayId: "", day: "Day 1", items: [] },
//     { dayId: "", day: "Day 2", items: [] },
//     { dayId: "", day: "Day 3", items: [] },
//     { dayId: "", day: "Day 4", items: [] },
//     { dayId: "", day: "Day 5", items: [] },
//     { dayId: "", day: "Day 6", items: [] },
//     { dayId: "", day: "Day 7", items: [] },
//   ],
// };

// function App() {
//   const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

//   const [dietDetails, setDietDetails] = useState(DEFAULT_MEAL_DATA);
//   const [actions, setActions] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [weeklyMeal, setWeeklyMeal] = useState("");
//   const [selectedWeek, setSelectedWeek] = useState(DEFAULT_WEEK);
//   const [isEnable, setIsEnable] = useState(false);
//   // useEffect(() => {
//   //   if (dietDetails) {
//   //     setDietDetails(dietDetails);
//   //   }
//   // }, [dietDetails]);
//   useEffect(() => {
//     if (dietDetails) {
//       setSelectedWeek((prev) => ({ ...prev, list: dietDetails }));
//     }
//   }, [dietDetails]);

//   const handleDate = (val) => {
//     setSelectedDate(val);
//     const futureDate = addDays(val, 6);
//     setEndDate(futureDate);

//     setSelectedWeek((prev) => ({
//       ...prev,
//       startDate: val,
//       endDate: futureDate,
//     }));
//   };
//   const handleAddMeal = () => {
//     console.log("DEFAULT_MEAL", DEFAULT_MEAL);
//     let DEFAULT_MEAL_NEW = { ...DEFAULT_MEAL };
//     DEFAULT_MEAL_NEW = { ...DEFAULT_MEAL_NEW, mealId: dietDetails?.length + 1 };
//     DEFAULT_MEAL_NEW.mealDetails = {
//       ...DEFAULT_MEAL_NEW.mealDetails,
//       mealType: `Meal ${dietDetails?.length + 1}`,
//     };
//     for (var i = 0; i < DEFAULT_MEAL_NEW.Days.length; i++) {
//       DEFAULT_MEAL_NEW.Days[i] = {
//         ...DEFAULT_MEAL_NEW.Days[i],
//         dayId: dietDetails?.length + `${i + 1}`,
//       };
//     }

//     setIsEnable(true);
//     setSelectedWeek((prev) => ({
//       ...prev,
//       list: [...prev.list, DEFAULT_MEAL_NEW],
//     }));
//     setDietDetails((prev) => [...prev, DEFAULT_MEAL_NEW]);
//   };

//   const handleReset = () => {
//     console.log(DEFAULT_WEEK, DEFAULT_MEAL_DATA);
//     setSelectedDate("");
//     setEndDate("");
//     setSelectedWeek(DEFAULT_WEEK);
//     setDietDetails(DEFAULT_MEAL_DATA);
//   };

//   return (
//     <div className="App">
//       <div className="flex justify-between pl-4">
//         <DatePicker
//           showIcon
//           selected={selectedDate}
//           dateFormat="dd/MM/yyyy"
//           onChange={(date) => handleDate(date)}
//           minDate={new Date()}
//           placeholderText="Select a start date"
//         />
//         <DatePicker
//           showIcon
//           selected={endDate}
//           dateFormat="dd/MM/yyyy"
//           disabled
//           minDate={new Date()}
//           placeholderText="Select a end date"
//         />
//         <>
//           {" "}
//           <button onClick={handleReset}>Reset Meal Item</button>
//           <button>Save</button>
//         </>
//       </div>

//       <div className="container mx-auto">
//         <div className="grid h-[10vh] grid-cols-8 place-items-center">
//           <div></div>
//           {days?.map((day, index) => (
//             <h3
//               className="rounded-lg border border-gray-500 bg-white px-3 py-1 text-gray-800 shadow-lg"
//               key={`${day}~~${index}`}
//             >
//               {day}
//             </h3>
//           ))}
//         </div>
//       </div>

//       <DayMealContainer
//         dietDetails={dietDetails}
//         setDietDetails={setDietDetails}
//       />
//       <PlusCircle
//         className="cursor-pointer"
//         size={32}
//         color="blue"
//         onClick={handleAddMeal}
//       />
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./Firebase";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </FirebaseProvider>
  );
};

export default App;
