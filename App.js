import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import GraphWithLabel from './src/GraphWithLabels';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GraphWithLabel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
