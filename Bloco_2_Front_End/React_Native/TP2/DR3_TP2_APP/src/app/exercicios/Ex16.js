import React, { useState } from "react";
import MenuComponent from "../components/Menu/Menu";
import styles from "./styles";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function Ex16MenuComponent() {
  const [visivel, setVisivel] = useState(false);

  const menuItemHandler = () => {
    console.log("Item do menu pressionado");
  };

  const onDismissAction = () => {
    setVisivel(false);
  };

  const mostrarMenu = () => {
    setVisivel(true);
  };

  const props = {
    visible: visivel,
    label: "Sair",
    onDismiss: onDismissAction,
    onPressButton: mostrarMenu,
    menuItemOnpress: menuItemHandler,
    buttonText: "Mostrar Menu",
    menuItem1: "Item 1",
    menuItem2: "Item 2",
    menuItem3: "Item 3",
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <MenuComponent {...props} />
      </View>
    </PaperProvider>
  );
}
