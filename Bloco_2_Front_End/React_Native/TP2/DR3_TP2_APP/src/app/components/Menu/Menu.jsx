import React from "react";
import { Button, Menu, Divider } from "react-native-paper";

export default function MenuComponent({ ...props }) {
  return (
    <Menu
      visible={props.visible}
      onDismiss={props.onDismiss}
      anchor={<Button onPress={props.onPressButton}>{props.buttonText}</Button>}
    >
      <Menu.Item onPress={props.menuItemOnpress} title={props.menuItem1} />
      <Divider />
      <Menu.Item onPress={props.menuItemOnpress} title={props.menuItem2} />
      <Divider />
      <Menu.Item onPress={props.menuItemOnpress} title={props.menuItem3} />
    </Menu>
  );
}
