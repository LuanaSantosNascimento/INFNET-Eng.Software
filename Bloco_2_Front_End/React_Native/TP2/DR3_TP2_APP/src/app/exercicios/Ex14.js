import React, { useState } from "react";
import SnackBarComponent from "../components/SnackBar/SnackBar";
import styles from "./styles";
import { View } from "react-native";
import { Button } from "react-native-paper";

export default function Ex14SnackBarComponent() {
  const [visivel, setVisivel] = useState(false);
  let textoBotao = visivel ? "Esconder SnackBar" : "Mostrar SnackBar";
  
  const buttonHandle = () => {
    setVisivel(!visivel);
    textoBotao = visivel ? "Esconder SnackBar" : "Mostrar SnackBar";
};

  const onDismissAction = () => {
    setVisivel(false);
    textoBotao = "Esconder SnackBar";
  };

  const props = {
    visible: visivel,
    label: "Sair",
    onDismiss: onDismissAction,
    action: onDismissAction,
    onPress: buttonHandle,
    texto: "Este é um componente SnackBar",
  };

  return (
    <View style={styles.container}>
      <Button onPress={buttonHandle}>{textoBotao}</Button>

      <SnackBarComponent {...props} />
    </View>
  );
}
