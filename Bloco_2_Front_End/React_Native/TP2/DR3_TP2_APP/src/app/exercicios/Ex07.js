import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';

export default function Ex7PaginaEsqueciSenha() {
  return(
    <View style={styles.container}>
      <Text>Página: Esqueci minha senha</Text>
      <StatusBar style="auto" />
    </View>
  );
}
