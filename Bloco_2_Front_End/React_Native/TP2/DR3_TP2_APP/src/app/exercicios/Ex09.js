import React from "react";
import CardComponent from "../components/Card/Card";
import styles from "./styles";
import { View } from "react-native";

export default function Ex9CardComponent() {
  const buttonHandle = () => {
    console.log("O botão foi pressionado.");
  };

  const loremIpsum =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," + 
    " when an unknown printer took a galley of type and scrambled it to make a type specimen book." +
    " It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." +
    " It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const props = {
    uri: "https://picsum.photos/750",
    titulo: "Título do Card...",
    subtitulo: "Subtítulo do Card...",
    conteudo: loremIpsum,
    textoBotao: "Texto do botão",
    size: 25,
    icon: "star",
    onPress: buttonHandle,
  };

  return (
    <View style={styles.container}>
      <CardComponent {...props} />
    </View>
  );
}
