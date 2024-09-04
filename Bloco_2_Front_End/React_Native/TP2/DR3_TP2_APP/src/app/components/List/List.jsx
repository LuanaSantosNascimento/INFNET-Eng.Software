import React from "react";
import { List } from "react-native-paper";

export default function ListComponent({ ...props }) {
  return (
    <List.Section title={props.title}>
      <List.Accordion
        title={props.accordionTitle}
        left={p => <List.Icon {...p} icon={props.icon} />}>
      
        <List.Item title={props.item1Title} />
        <List.Item title={props.item2Title} />
      </List.Accordion>
    </List.Section>
  );
}
