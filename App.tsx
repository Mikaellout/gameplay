import React from "react";
import {useFonts} from 'expo-font';
import { Routes} from "./src/routes";
import { StatusBar,LogBox } from 'react-native';
import AppLoading from "expo-app-loading";
import { AuthProvider } from "./src/hooks/auth";
import {Background}from './src/components/Backgroud';
import {Inter_400Regular,Inter_500Medium} from '@expo-google-fonts/inter';
import {Rajdhani_500Medium,Rajdhani_700Bold} from '@expo-google-fonts/rajdhani';

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine. As a result']);

export default function App(){

    const [fontsLoad] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  });

  if(!fontsLoad){
    return(
      <AppLoading/>
    )

  }

  return (
    <Background>
    <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"  
        translucent
    />
    <AuthProvider>
    <Routes/>
    </AuthProvider>
    </Background>
  );



}