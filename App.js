import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import GraphWithLabel from './src/GraphWithLabels';

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <View contentContainerStyle={styles.container}>
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
