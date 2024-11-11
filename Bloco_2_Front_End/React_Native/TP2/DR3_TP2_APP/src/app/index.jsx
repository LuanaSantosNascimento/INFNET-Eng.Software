import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View style={styles.container}>
      <Link href={"/exercicios/Ex01"}>Ir para Exercício 01</Link>
      <Link href={"/exercicios/Ex02"}>Ir para Exercício 02</Link>
      <Link href={"/exercicios/Ex03"}>Ir para Exercício 03</Link>
      <Link href={"/exercicios/Ex04"}>Ir para Exercício 04</Link>
      <Link href={"/exercicios/Ex05"}>Ir para Exercício 05</Link>
      <Link href={"/exercicios/Ex06"}>Ir para Exercício 06</Link>
      <Link href={"/exercicios/Ex07"}>Ir para Exercício 07</Link>
      <Link href={"/exercicios/Ex08"}>Ir para Exercício 08</Link>
      <Link href={"/exercicios/Ex09"}>Ir para Exercício 09</Link>
      <Link href={"/exercicios/Ex10"}>Ir para Exercício 10</Link>
      <Link href={"/exercicios/Ex11"}>Ir para Exercício 11</Link>
      <Link href={"/exercicios/Ex12"}>Ir para Exercício 12</Link>
      <Link href={"/exercicios/Ex13"}>Ir para Exercício 13</Link>
      <Link href={"/exercicios/Ex14"}>Ir para Exercício 14</Link>
      <Link href={"/exercicios/Ex15"}>Ir para Exercício 15</Link>
      <Link href={"/exercicios/Ex16"}>Ir para Exercício 16</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f4f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
