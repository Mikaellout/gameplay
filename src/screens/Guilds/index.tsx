import React ,{useState,useEffect} from "react";
import { styles } from "./styles";
import { api } from "../../services/api";
import { View, FlatList } from 'react-native';
import {Load}from'../../components/Load';
import { Guild ,GuildProps} from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";


type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}



export function Guilds({ handleGuildSelect }: Props) {
    const [guilds , setGuilds] = useState <GuildProps[]>([]);
    const [loading , setLoading]=  useState(true);

    async function fetchGuidls() {
        const response = await api.get('/users/@me/guilds');
         setGuilds(response.data);
         setLoading(false);
    } 
    useEffect(() => {
        fetchGuidls();
    }, [])

    return (

        <View style={styles.container}>
            {
              loading ?  <Load/>
                :
                 <FlatList
                 data={guilds}
                 keyExtractor={item => item.id}
                 renderItem={({ item }) => (
                     <Guild
                         data={item}
                         onPress={() => handleGuildSelect(item)}
                     />
                 )}
                 showsVerticalScrollIndicator={false}
                 ItemSeparatorComponent={() => <ListDivider isCentered />}
                 contentContainerStyle={{ paddingBottom: 68, paddingTop: 103 }}
                 ListHeaderComponent={() => <ListDivider isCentered />}
                 style={styles.guilds}
             />

            }
           
        </View>
    );
}