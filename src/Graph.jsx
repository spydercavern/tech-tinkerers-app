import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import moment from 'moment';


const TEMPERATURE_THRESHOLD = 60;
const HUMIDITY_THRESHOLD = 60;
const POLL_INTERVAL = 10;

const Graph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://tech-tinkerers-fv6bhxi-xelk3xqb6wogu.de-2.platformsh.site/api/sensorData"
        );
        setData(response.data);

        // Check temperature and humidity values and show alert if they are above 60
        const latestData = response.data[response.data.length - 1];
        if (latestData.temperate > TEMPERATURE_THRESHOLD) {
          Alert.alert(
            `Temperature Alert", "The temperature is above ${TEMPERATURE_THRESHOLD}. Shelf is occupied ${
              latestData.is_shelf_occupied ? "Yes!" : "No occupied "
            }`
          );
        }
        if (latestData.humidity > HUMIDITY_THRESHOLD) {
          Alert.alert(
            `Humidity Alert", "The humidity is above ${HUMIDITY_THRESHOLD}. Shelf is occupied ${
              latestData.is_shelf_occupied ? "Yes!" : "No occupied "
            }`
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const temperatureData = {
    labels: data.map((item) => new Date(item.timeStamp)),
    datasets: [
      {
        data: data.map((item) => parseFloat(item.temperate)),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  };

  //   console.log("temperature data", temperatureData);

  const humidityData = {
    labels: data.map((item) => new Date(item.timeStamp)),
    datasets: [
      {
        data: data.map((item) => parseFloat(item.humidity)),
        color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
      },
    ],
  };
  //   console.log("humidity data", humidityData);

  return (
    <View>
      <Text>Temperature</Text>
      <LineChart
        data={temperatureData}
        width={400}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        }}
      />
      <Text>Humidity</Text>
      <LineChart
        data={humidityData}
        width={400}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
        }}
      />
    </View>
  );
};

export default Graph;
