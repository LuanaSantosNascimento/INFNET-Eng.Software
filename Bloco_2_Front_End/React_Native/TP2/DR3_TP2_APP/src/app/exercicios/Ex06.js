import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex6PaginaSettings() {
  return(
    <View style={styles.container}>
      <Text>Página: Settings</Text>
      <StatusBar style="auto" />
    </View>
  );
}
