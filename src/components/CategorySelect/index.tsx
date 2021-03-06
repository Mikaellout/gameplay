import React from "react";
import { ScrollView } from 'react-native';
import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { categories } from '../../ultils/categories';
import { Category } from "../category";

type Props = {
    categorySelected:string;
    setCategory:(categoryId:string) => void;
    hasCkeckBox ?:boolean;
}

export function CategorySelect({
    categorySelected,
    setCategory,
    hasCkeckBox=false,
}:Props) {

    return (
        <ScrollView
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 40 }}
        >
          { 
          categories.map(category=>(
            <Category
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id=== categorySelected} 
            onPress={()=>setCategory(category.id)}
            hasCkeckBox={hasCkeckBox}
            />
          ))
          }  
        </ScrollView>
    );
}