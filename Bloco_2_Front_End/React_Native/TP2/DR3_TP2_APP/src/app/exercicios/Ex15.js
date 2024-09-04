import React, {useState} from "react";
import FABComponent from "../components/Tab/Tab";
import styles from "./styles";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Ex15FABComponent() {
  //Não existe um componente "TAB" no react native paper,
  //então criei um componente FAB

  const [textoComponente, setTextoComponente] = useState("Olá");


  const FABComponent1OnPress = () => setTextoComponente("Clicou no componente de loading!");
  const FABComponent2OnPress = () => setTextoComponente("Clicou no componente de lápis!");
  const FABComponent3OnPress = () => setTextoComponente("Clicou no componente de xicara de café!");
  
  const props = {
    icon: "plus",
    style: styles.fab,
    onPress: FABComponent1OnPress,
    label: "Loading...",
    color: "#845ec2",
    rippleColor: "#f9f871",
    loading: true,
  };

  const props2 = {
    icon: "pencil",
    style: styles.fab,
    onPress: FABComponent2OnPress,
    label: "Pencil Icon",
    color: "#4b4453",
    rippleColor: "#c34a36",
    loading: false,
  };

  const props3 = {
    icon: "coffee",
    onPress: FABComponent3OnPress,
    label: "Coffe Icon",
    color: "#4b4453",
    rippleColor: "#00c9a7",
    loading: false,
    style: styles.fab
  };

  return (
    <View style={styles.container}>
      <FABComponent {...props} />
      <FABComponent {...props2} />
      <FABComponent {...props3} />

      <Text>{textoComponente}</Text>
    </View>
  );
}
