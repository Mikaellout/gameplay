import React from "react";
import {LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { theme } from "../../@global/styles/theme";
import {styles}from "../Avatar/style";


type Props ={
    urlImag:string;

}

export function Avatar({urlImag}:Props) {
    const {secondary50,secondary70}=theme.colors;

    return(
        <LinearGradient
        style={styles.container}
        colors={[theme.colors.secondary50 , theme.colors.secondary70]}
        >
         <Image
          source={{uri:urlImag}}
          style={styles.avatar}
         
         />
        </LinearGradient>
    );
    
}