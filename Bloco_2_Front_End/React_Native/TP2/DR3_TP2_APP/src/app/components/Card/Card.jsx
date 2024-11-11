import React from "react";
import { Card, Paragraph, Button, Avatar } from "react-native-paper";

export default function CardComponent({...props}) {

    return (
        <Card type>
          <Card.Cover source={{ uri: props.uri }} />
          <Card.Title title={props.titulo} subtitle={props.subtitulo} />
          <Card.Content>
            <Paragraph>{props.conteudo}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={props.onPress}>{props.textoBotao}</Button>
            <Avatar.Icon size={props.size} icon={props.icon} />
          </Card.Actions>
        </Card>
      );
}
