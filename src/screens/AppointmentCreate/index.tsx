import React, { useState } from "react";
import uuid from 'react-native-uuid';
import { styles } from './styles';
import {
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform
}
    from "react-native";
import { Guilds } from "../Guilds";
import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { Header } from '../../components/Header';
import { GuildIcon } from '../../components/Guildicon';
import { CategorySelect } from '../../components/CategorySelect'
import { RectButton } from "react-native-gesture-handler";
import { ModalView } from '../../components/ModalView';
import { theme } from "../../@global/styles/theme";
import { SmallInput } from "../../components/SmallInput";
import { TextArea } from "../../components/TextArea";
import { GuildProps } from "../../components/Guild";
import { Background } from "../../components/Backgroud";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/batabase";
import { useNavigation } from "@react-navigation/native";


export function AppointmentCreate() {
    const navigation = useNavigation();
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);
    const [day , setDay]=useState('');
    const [month , setMonth]=useState('');
    const [hour ,setHour]=useState('');
    const [minute,setMinute]=useState('');
    const [description ,setDescription]=useState('');
    function handleOpenGuilds() {
        setOpenGuildsModal(true)
    }
    function handleCloseGuilds() {
        setOpenGuildsModal(false)
    }

    function handleGuildSelect(guildSelect: GuildProps) {
        setGuild(guildSelect);
        setOpenGuildsModal(false)
    }
    function handleCategorySelect(categoryId: string){
     setCategory(categoryId);
    }
    async function handleSave() {
        const newAppointment={
            id:uuid.v4(),
            guild,
            category,
            date:`${day}/${month} as ${hour}:${minute}`,
            description
        };
     const storange = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS); 
     const appointments = storange? JSON.parse(storange):[];
     await AsyncStorage.setItem(
        COLLECTION_APPOINTMENTS ,
        JSON.stringify([...appointments , newAppointment] )
      );

      navigation.navigate('Home');
    }

    return (

        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Background>
                <ScrollView>

                    <Header
                        title='Agendar Partida'
                    />

                    <Text style={[styles.label,
                    { marginLeft: 24, marginTop: 36, marginBottom: 18 }

                    ]}>
                        Categoria
                    </Text>
                    <CategorySelect
                        hasCkeckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}

                    />
                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon ?
                                        <GuildIcon guildId={guild.id}iconId={guild.icon}/>
                                        : <View style={styles.image} />
                                }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ?
                                            guild.name : 'Selecione um Servidor'}
                                    </Text>
                                </View>
                                <Feather
                                    name='chevron-right'
                                    color={theme.colors.heading}
                                    size={18}

                                />
                            </View>
                        </RectButton>
                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e Mes
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput 
                                    onChangeText={setDay}
                                    maxLength={2} />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput 
                                    onChangeText={setMonth}
                                    maxLength={2} />
                                </View>

                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e Minutos
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput
                                    onChangeText={setHour}
                                    maxLength={2} />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                    onChangeText={setMinute}
                                    maxLength={2} />
                                </View>

                            </View>

                        </View>
                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descricao
                            </Text>
                            <Text style={styles.caracteresLimit}>
                                Max de 100 Caracteres
                            </Text>
                        </View>

                        <TextArea
                            onChangeText={setDescription}
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}

                        />

                        <View style={styles.footer}>
                            <Button
                            onPress={handleSave}
                            title='Agendar' />
                        </View>

                    </View>
                </ScrollView>
            </Background>
            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelect={handleGuildSelect} />
            </ModalView>
        </KeyboardAvoidingView>
    );

}