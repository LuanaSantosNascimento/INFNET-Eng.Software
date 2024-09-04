import React from "react";
import IconButtonComponent from "../components/IconButton/IconButton";
import styles from './styles';
import { View } from 'react-native';


export default function Ex9CardComponent() {
  const buttonHandle = () => {
    console.log("O botão foi pressionado.");
  };

  const props = {
    containerColor: "#ff9671",
    iconColor: "#4b4453",
    size: 30,
    icon: "coffee",
    onPress: buttonHandle,
  };

  return(
    <View style={styles.container}>
      <IconButtonComponent {...props} />
    </View>
  );
}
