import React from "react";
import { Text, View } from 'react-native';
import ProgressBarComponent from "../components/ProgressBar/ProgressBar"

export default function Ex12ProgressBarComponent() {

    const props1 = {
        progress: 0.25,
        color: "#c34a36"
      };
    
      const props2 = {
        progress: 0.55,
        color: "#4ffbdf"
      };  

      const props3 = {
        progress: 0.75,
        color: "#296073"
      }; 
        
      const props4 = {
        progress: 1,
        color: "#f9f871"
      };

  return(
    <View >
      <ProgressBarComponent {...props1} />
      <ProgressBarComponent {...props2} />
      <ProgressBarComponent {...props3} />
      <ProgressBarComponent {...props4} />
    </View>
  );
}


