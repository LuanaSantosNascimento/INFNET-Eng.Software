import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex2PaginaRegistro() {
  return(
    <View style={styles.container}>
      <Text>Página: Registro</Text>
      <StatusBar style="auto" />
    </View>
  );
}
