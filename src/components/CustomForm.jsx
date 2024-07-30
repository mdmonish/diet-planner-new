import React, { useState } from "react";
import { useFirebase } from "../Firebase";
import { useNavigate } from "react-router-dom";

const CustomForm = ({ user }) => {
  const { saveFormResponse, markFormAsSubmitted, uploadFile } = useFirebase();
  const [formData, setFormData] = useState({
    shortAnswer: "",
    longAnswer: "",
    radioOption: "",
    date: "",
    file: null,
  });
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
    try {
      let fileUrl = "";
      if (formData.file) {
        fileUrl = await uploadFile(formData.file);
      }

      const formResponse = {
        ...formData,
        file: fileUrl,
      };

      // Save response to Firestore
      await saveFormResponse(user.uid, formResponse);
      await markFormAsSubmitted(user.uid);

      // Redirect to success page
      navigate("/form-success");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Email ✱
        </label>
        <input
          type="text"
          name="Email"
          value={formData.shortAnswer}
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
          name="Name"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Age ✱</label>
        <input
          type="text"
          name="Age"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Gender ✱
        </label>
        <div className="mt-1 flex flex-col">
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Male"
              checked={formData.radioOption === "Male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Female"
              checked={formData.radioOption === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Weight (exact) ✱
        </label>
        <input
          type="text"
          name="Weight"
          value={formData.shortAnswer}
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
          type="text"
          name="Height"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Physical Activity ✱
        </label>
        <div className="mt-1 flex flex-col">
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Bedridden"
              checked={formData.radioOption === "Bedridden"}
              onChange={handleChange}
              required
            />
            Bedridden
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Light"
              checked={formData.radioOption === "Light"}
              onChange={handleChange}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Medium"
              checked={formData.radioOption === "Medium"}
              onChange={handleChange}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Heavy"
              checked={formData.radioOption === "Heavy"}
              onChange={handleChange}
            />
            Heavy
          </label>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Economic Status ✱
        </label>
        <div className="mt-1 flex flex-col">
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Low income group"
              checked={formData.radioOption === "Low income group"}
              onChange={handleChange}
              required
            />
            Low income group
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Middle income group"
              checked={formData.radioOption === "Middle income group"}
              onChange={handleChange}
            />
            Middle income group
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="High income group"
              checked={formData.radioOption === "High income group"}
              onChange={handleChange}
            />
            High income group
          </label>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Food Choice ✱
        </label>
        <div className="mt-1 flex flex-col">
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Non vegetarian"
              checked={formData.radioOption === "Non vegetarian"}
              onChange={handleChange}
              required
            />
            Non vegetarian
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Vegetarian (with egg)"
              checked={formData.radioOption === "Vegetarian (with egg)"}
              onChange={handleChange}
            />
            Vegetarian (with egg)
          </label>
          <label>
            <input
              type="radio"
              name="radioOption"
              value="Vegetarian (without egg)"
              checked={formData.radioOption === "Vegetarian (without egg)"}
              onChange={handleChange}
            />
            Vegetarian (without egg)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Specify your requirements (if suffering from a disease, kindly
          mention) ✱
        </label>
        <textarea
          name="Requirements"
          value={formData.longAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Symptoms (if any)
        </label>
        <textarea
          name="Symptoms"
          value={formData.longAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          If any surgical history, kindly mention
        </label>
        <textarea
          name="Surgical History"
          value={formData.longAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Attach medical reports (if any)
        </label>
        <input
          type="file"
          name="Medical Reports"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Are you allergic to any food? If yes, kindly mention those foods
        </label>
        <textarea
          name="Allergic to Food"
          value={formData.longAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Food you like
        </label>
        <input
          type="text"
          name="Like Food"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Food you don't like
        </label>
        <input
          type="text"
          name="Dislike Food"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Drinking or smoking habit? Please specify ✱
        </label>
        <input
          type="text"
          name="Drinking/Smoking Habit"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Have you lost weight in the last 1 year, if yes how much? ✱
        </label>
        <input
          type="text"
          name="Lost Weight in 1 year"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          What you eat in a day and at what time? ✱
        </label>
        <textarea
          name="Eat Foods in a day with time"
          value={formData.longAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Wake up and sleep time ✱
        </label>
        <input
          type="text"
          name="Wake up and sleep time"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Medicine or supplements if taking
        </label>
        <input
          type="text"
          name="Medicine/Supplements"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          How many times you eat outside food in a week? ✱
        </label>
        <input
          type="text"
          name="How many times you eat outside food in a week?"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Digestive issues if any
        </label>
        <input
          type="text"
          name="Digestive issues"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Recent straight body picture ✱
        </label>
        <input
          type="file"
          name="Recent straight body picture"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Water intake ✱
        </label>
        <input
          type="text"
          name="Water intake"
          value={formData.shortAnswer}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Diet start date ✱
        </label>
        <input
          type="date"
          name="Diet start date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          UPI ID- rahnumazarrin7@oksbi Payment screenshot ✱
        </label>
        <input
          type="file"
          name="Payment screenshot"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm"
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Anything else you want to mention
        </label>
        <textarea
          name="Additional Information"
          value={formData.longAnswer}
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
  );
};

export default CustomForm;
