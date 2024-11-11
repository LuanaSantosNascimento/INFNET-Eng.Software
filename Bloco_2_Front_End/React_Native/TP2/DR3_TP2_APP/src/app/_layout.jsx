import { Stack } from "expo-router";

export default function Layout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title: "Desenvolvimento Mobile Com React Native - DR4 - TP2"}}/>
            <Stack.Screen name="exercicios/Ex01" options={{title: "Exercício 01"}}/>
            <Stack.Screen name="exercicios/Ex02" options={{title: "Exercício 02"}}/>
            <Stack.Screen name="exercicios/Ex03" options={{title: "Exercício 03"}}/>
            <Stack.Screen name="exercicios/Ex04" options={{title: "Exercício 04"}}/>
            <Stack.Screen name="exercicios/Ex05" options={{title: "Exercício 05"}}/>
            <Stack.Screen name="exercicios/Ex06" options={{title: "Exercício 06"}}/>
            <Stack.Screen name="exercicios/Ex07" options={{title: "Exercício 07"}}/>
            <Stack.Screen name="exercicios/Ex08" options={{title: "Exercício 08"}}/>
            <Stack.Screen name="exercicios/Ex09" options={{title: "Exercício 09"}}/>
            <Stack.Screen name="exercicios/Ex10" options={{title: "Exercício 10"}}/>
            <Stack.Screen name="exercicios/Ex11" options={{title: "Exercício 11"}}/>
            <Stack.Screen name="exercicios/Ex12" options={{title: "Exercício 12"}}/>
            <Stack.Screen name="exercicios/Ex13" options={{title: "Exercício 13"}}/>
            <Stack.Screen name="exercicios/Ex14" options={{title: "Exercício 14"}}/>
            <Stack.Screen name="exercicios/Ex15" options={{title: "Exercício 15"}}/>
            <Stack.Screen name="exercicios/Ex16" options={{title: "Exercício 16"}}/>
        </Stack>
    );
}