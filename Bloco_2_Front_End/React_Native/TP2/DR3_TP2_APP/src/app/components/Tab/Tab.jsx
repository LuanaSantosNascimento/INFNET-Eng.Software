import React from "react";
import { FAB } from "react-native-paper";

export default function FABComponent({ ...props }) {
  return (
    <FAB
      icon={props.icon}
      style={props.style}
      onPress={props.onPress}
      label={props.label}
      color={props.color}
      rippleColor={props.rippleColor}
      loading={props.loading}
    />
  );
}
