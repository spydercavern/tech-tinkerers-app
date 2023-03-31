import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";

export default function GraphWithLabel() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000); // Poll data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSensorData = async () => {
    try {
      const response = await fetch(
        "https://tech-tinkerers-fv6bhxi-xelk3xqb6wogu.de-2.platformsh.site/api/sensorData"
      );
      const data = await response.json();
      setSensorData(data);
      checkThresholds(data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkThresholds = (data) => {
    const latestData = data[data.length - 1];
    if (latestData.temperate > 60) {
      Alert.alert("Temperature Alert", "Temperature is above 60");
    }
    if (latestData.humidity > 60) {
      Alert.alert("Humidity Alert", "Humidity is above 60");
    }
  };

  const convertTimestampToLabel = (timestamp, i) => {
    if (i % 3 == 0) {
      const formattedData = moment(timestamp).format("h:mm:ss a");
      return formattedData;
    }
    return "";
  };

  const labels = sensorData.map((item, i) =>
    convertTimestampToLabel(item.timeStamp, i)
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: sensorData.map((item) => item.temperate),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        label: "Temperature",
        strokeWidth: 2,
      },
      {
        data: sensorData.map((item) => item.humidity),
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        label: "Humidity",
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sensor Data</Text>
      <LineChart
        verticalLabelRotation={90}
        data={chartData}
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height / 2}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        xLabelsVertical={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  chart: {
    marginTop: 20,
    width: Dimensions.get("window").width - 20,
    height: 300,
  },
  chartLabel: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "red",
  },
  xLabel: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 12,
    transform: [{ rotate: "-90deg" }],
  },
});
