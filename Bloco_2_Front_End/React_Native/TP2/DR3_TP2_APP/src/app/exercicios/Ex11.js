import React from "react";
import styles from './styles';
import { View } from 'react-native';
import ListComponent from "../components/List/List"

export default function Ex11ListComponent() {

  const props1 = {
    title: "Título geral da lista - 1",
    accordionTitle: "Segundo título da lista",
    item1Title: "Item 1 - Da lista 1",
    item2Title: "Item 2 - Da lista 1",
    icon: "star",
  };

  const props2 = {
    title: "Título geral da lista 2",
    accordionTitle: "Segundo título da lista",
    item1Title: "Item 1 - Da lista 2",
    item2Title: "Item 2 - Da lista 2",
    icon: "folder",
  };

  return(
    <View style={styles.container}>
      <ListComponent {...props1} />
      <ListComponent {...props2} />
    </View>
  );
}
