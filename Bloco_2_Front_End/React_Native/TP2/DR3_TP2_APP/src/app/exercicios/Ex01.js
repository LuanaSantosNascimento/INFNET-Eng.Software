import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex1PaginaLogin() {
  return(
    <View style={styles.container}>
      <Text>Página: Login</Text>
      <StatusBar style="auto" />
    </View>
  );
}


