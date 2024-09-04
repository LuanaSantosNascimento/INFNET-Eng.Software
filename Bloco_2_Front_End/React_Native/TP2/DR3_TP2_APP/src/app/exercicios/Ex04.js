import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex4PaginaDashboard() {
  return(
    <View style={styles.container}>
      <Text>Página: Dashboard</Text>
      <StatusBar style="auto" />
    </View>
  );
}