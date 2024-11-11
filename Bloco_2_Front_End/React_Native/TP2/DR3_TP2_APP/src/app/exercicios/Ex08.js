import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex8PaginaNovoItem() {
  return(
    <View style={styles.container}>
      <Text>Página: Novo Item</Text>
      <StatusBar style="auto" />
    </View>
  );
}