import React from "react";
import { ProgressBar } from "react-native-paper";

export default function ProgressBarComponent({ ...props }) {
  return <ProgressBar progress={props.progress} color={props.color} />;
}
