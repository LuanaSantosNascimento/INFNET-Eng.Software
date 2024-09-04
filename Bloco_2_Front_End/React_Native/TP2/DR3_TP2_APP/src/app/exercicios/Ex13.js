import React from "react";
import RadioButtonComponent from "../components/RadioButton/RadioButton";
import styles from './styles';
import { View } from 'react-native';


export default function Ex13RadioButtonComponent() {
  
    const buttonHandle = () => {
        console.log("O botão foi pressionado.");
        props.status = "checked";
      };

  const props = {
    value: "Radio Button",
    uncheckedColor: "##ff9671",
    status: "unchecked",
    color: "#f9f871",
    onPress: buttonHandle,
  };

  const props2 = {
    value: "Radio Button2",
    uncheckedColor: "#845ec2",
    status: "checked",
    color: "#ff6f91",
    onPress: buttonHandle,
  }; 


  return(
    <View style={styles.container}>
      <RadioButtonComponent {...props} />
      <RadioButtonComponent {...props2} />

    </View>
  );
}
