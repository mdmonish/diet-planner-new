import React, { useState } from "react";
import { useFirebase } from "../Firebase";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const CustomForm = ({ user }) => {
  const { saveFormResponse, markFormAsSubmitted, uploadFile } = useFirebase();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    physicalActivity: "",
    economicStatus: "",
    foodChoice: "",
    requirements: "",
    symptoms: "",
    surgicalHistory: "",
    medicalReports: null,
    foodAllergies: "",
    foodLikes: "",
    foodDislikes: "",
    smokingDrinkingHabit: "",
    weightLoss: "",
    dailyDiet: "",
    sleepWakeTime: "",
    medications: "",
    outsideFoodFrequency: "",
    digestiveIssues: "",
    bodyPicture: null,
    waterIntake: "",
    dietStartDate: "",
    paymentScreenshot: null,
    additionalInfo: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedFiles = {};
      for (const key in formData) {
        if (formData[key] instanceof File) {
          uploadedFiles[key] = await uploadFile(formData[key]);
        }
      }

      const formResponse = {
        ...formData,
        ...uploadedFiles,
      };

      // Save response to Firestore
      await saveFormResponse(user.uid, formResponse);
      await markFormAsSubmitted(user.uid);

      // Save response to Google Sheets
      //   await submitToGoogleSheets(formResponse);

      // Redirect to success page
      navigate("/form-success");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  //   const submitToGoogleSheets = async (formResponse) => {
  //     const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

  //     await fetch(scriptURL, {
  //       method: "POST",
  //       body: JSON.stringify(formResponse),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 md:p-8 lg:w-2/3 lg:flex-col lg:items-center lg:justify-center"
        >
          <button
            type="button"
            onClick={() => navigate("/logout")} // Change to your logout functionality
            className="absolute right-4 top-4 text-red-500"
          >
            Logout
          </button>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Email ✱
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Name ✱
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Age ✱
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Gender ✱
            </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Weight ✱
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Height ✱
            </label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Physical activity ✱
            </label>
            <div className="flex flex-col">
              {["bedridden", "light", "medium", "heavy"].map((activity) => (
                <label key={activity} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="physicalActivity"
                    value={activity}
                    checked={formData.physicalActivity === activity}
                    onChange={handleChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">{activity}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Economic Status ✱
            </label>
            <div className="flex flex-col">
              {[
                "Low income group",
                "middle income group",
                "high income group",
              ].map((status) => (
                <label key={status} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="economicStatus"
                    value={status}
                    checked={formData.economicStatus === status}
                    onChange={handleChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">{status}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Food Choice ✱
            </label>
            <div className="flex flex-col">
              {[
                "non vegetarian",
                "vegetarian (with egg)",
                "vegetarian (without egg)",
              ].map((choice) => (
                <label key={choice} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="foodChoice"
                    value={choice}
                    checked={formData.foodChoice === choice}
                    onChange={handleChange}
                    className="form-radio"
                    required
                  />
                  <span className="ml-2">{choice}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Requirements (if suffering from a disease, kindly mention) ✱
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Symptoms
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Surgical History
            </label>
            <textarea
              name="surgicalHistory"
              value={formData.surgicalHistory}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Medical Reports
            </label>
            <input
              type="file"
              name="medicalReports"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Food Allergies
            </label>
            <textarea
              name="foodAllergies"
              value={formData.foodAllergies}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Food Likes
            </label>
            <textarea
              name="foodLikes"
              value={formData.foodLikes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Food Dislikes
            </label>
            <textarea
              name="foodDislikes"
              value={formData.foodDislikes}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Smoking/Drinking Habit ✱
            </label>
            <input
              type="text"
              name="smokingDrinkingHabit"
              value={formData.smokingDrinkingHabit}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Tried weight loss before? Y/N If yes, details. ✱
            </label>
            <input
              type="text"
              name="weightLoss"
              value={formData.weightLoss}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Describe your daily diet ✱
            </label>
            <textarea
              name="dailyDiet"
              value={formData.dailyDiet}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Sleep and Wake up time ✱
            </label>
            <input
              type="text"
              name="sleepWakeTime"
              value={formData.sleepWakeTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Any medication? Y/N If yes, details
            </label>
            <input
              type="text"
              name="medications"
              value={formData.medications}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              How many times do you eat outside food in a week? ✱
            </label>
            <input
              type="text"
              name="outsideFoodFrequency"
              value={formData.outsideFoodFrequency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Digestive issues
            </label>
            <input
              type="text"
              name="digestiveIssues"
              value={formData.digestiveIssues}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Straight Body Picture ✱
            </label>
            <input
              type="file"
              name="bodyPicture"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Water intake (in liters) ✱
            </label>
            <input
              type="text"
              name="waterIntake"
              value={formData.waterIntake}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              When do you want to start your diet plan? Mention the date. ✱
            </label>
            <input
              type="date"
              name="dietStartDate"
              value={formData.dietStartDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Screenshot of payment ✱
            </label>
            <input
              type="file"
              name="paymentScreenshot"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Additional information
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default CustomForm;
