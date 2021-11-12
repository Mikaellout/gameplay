import React, { useState, useEffect } from "react";
import { styles } from './styles';
import {
    ImageBackground
    , Text
    , View,
    Alert,
    FlatList
}
    from "react-native";
import { api } from "../../services/api";
import BannerImg from '../../assets/banner.png';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { Member, MemberProps } from "../../components/Member";
import { Header } from '../../components/Header';
import { theme } from "../../@global/styles/theme";
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';

import { ButtonIcon } from '../../components/Buttomicon';
import { Background } from '../../components/Backgroud';
import { BorderlessButton } from 'react-native-gesture-handler';
import { AppointmentProps } from "../../components/Appointment";
import { Load } from '../../components/Load';

type Params = {
    guildSelected: AppointmentProps;
}
type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
   
}


export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const Route = useRoute()
    const { guildSelected } = Route.params as Params;

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);

        } catch (error) {
            Alert.alert("Verifique as Conexoes do Servidor, verificar se o widget esta habilitado?");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header
                title='Detalhes'
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}

                        />

                    </BorderlessButton>


                }
            />
            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {guildSelected.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>
            {
                <>
                    loading ? <Load />  :


                    <ListHeader
                        title='Jogadores'
                        subtitle={`Total ${widget.members.length}`}
                    />
                    <FlatList
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Member data={item} />
                        )}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        style={styles.member}
                    />
               </>
            }
            <View style={styles.footer}>
                < ButtonIcon
                    title='Entrar na Partida '
                />
            </View>
        </Background>

    );

}