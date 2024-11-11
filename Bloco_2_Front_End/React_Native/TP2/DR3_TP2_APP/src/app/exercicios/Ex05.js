import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex5PaginaPerfil() {
  return(
    <View style={styles.container}>
      <Text>Página: Perfil</Text>
      <StatusBar style="auto" />
    </View>
  );
}
