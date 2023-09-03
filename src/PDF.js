import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

const PDF = ({ mealData }) => {
  const [printableData, setPrintableData] = useState([]);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "white",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  console.log("mealData", mealData);

  useEffect(() => {
    const days = [
      { dayName: "Day 1" },
      { dayName: "Day 2" },
      { dayName: "Day 3" },
      { dayName: "Day 4" },
      { dayName: "Day 5" },
      { dayName: "Day 6" },
      { dayName: "Day 7" },
    ];
    for (let i = 0; i < days.length; i++) {
      let temp = [];
      for (let j = 0; j < mealData.length; j++) {
        temp.push({
          mealDetails: { type: mealData[j].mealDetails.mealType },
          items: mealData[j].Days[i].items,
        });
      }

      days[i] = { ...days[i], meal: temp };
    }
    setPrintableData(days);
  }, [mealData]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {printableData?.map((meal) => (
          <>
            <View style={styles.section}>
              <Text>{meal?.dayName}</Text>
              {meal?.meal?.map((type) => (
                <View>
                  <Text>{type.mealDetails.type}</Text>
                </View>
              ))}
            </View>
          </>
        ))}
      </Page>
    </Document>
  );
};
export default PDF;
