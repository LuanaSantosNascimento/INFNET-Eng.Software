import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex3PaginaHome() {
  return(
    <View style={styles.container}>
      <Text>Página: Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}
