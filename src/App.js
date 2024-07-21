import { useEffect, useState } from "react";
import "./App.css";
import DayMealContainer from "./components/DayMealContainer";
import { mealData } from "./data";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./PDF";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

  const [dietDetails, setDietDetails] = useState(mealData);
  const [actions, setActions] = useState("");
  useEffect(() => {
    if (dietDetails) {
      setDietDetails(dietDetails);
    }
  }, [dietDetails]);

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
      <div className="container mx-auto">
        <div className="grid h-[10vh] grid-cols-8 place-items-center">
          <div></div>
          {days?.map((day, index) => (
            <h3
              className="rounded-lg border border-gray-500 bg-white px-3 py-1 text-gray-800 shadow-lg"
              key={`${day}~~${index}`}
            >
              {day}
              <span
                style={{ marginLeft: 10, cursor: "pointer" }}
                onClick={() => setActions(index)}
              >
                &#8942;
              </span>
              {actions === index && (
                <ul>
                  <li style={{ cursor: "pointer" }}>Copy</li>
                  <li style={{ cursor: "pointer" }}>Reset</li>
                </ul>
              )}
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
