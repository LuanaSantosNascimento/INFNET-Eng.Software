import React from "react";
import { Snackbar } from "react-native-paper";

export default function SnackBarComponent({ ...props }) {
  return (
    <Snackbar
      visible={props.visible}
      onDismiss={props.onDismiss}
      action={{ label: props.label, onPress: props.onPress }}
      duration={props.duration}
    >
      {props.texto}
    </Snackbar>
  );
}
