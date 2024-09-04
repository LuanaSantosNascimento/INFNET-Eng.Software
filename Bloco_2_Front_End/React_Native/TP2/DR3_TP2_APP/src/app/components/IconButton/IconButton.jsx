import React from "react";
import { IconButton } from 'react-native-paper';

export default function IconButtonComponent({...props}) {

    return (
        <IconButton
            icon={props.icon}
            iconColor={props.iconColor}
            size={props.size}
            onPress={props.onPress}
            containerColor={props.containerColor}
        />
      );
}
