import React from "react";
import { RadioButton } from "react-native-paper";

export default function RadioButtonComponent({ ...props }) {
  return <RadioButton 
  value={props.value} 
  status={props.status}
  onPress={props.onPress}
  uncheckedColor={props.uncheckedColor}
  color={props.color} />;
}
