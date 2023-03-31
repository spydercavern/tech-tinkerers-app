import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Image, View, SafeAreaView } from 'react-native';
import GraphWithLabel from './src/GraphWithLabels';

export default function App() {
  const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64,
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <View contentContainerStyle={styles.container}>
          <StatusBar style="auto" />
          <GraphWithLabel />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
});
