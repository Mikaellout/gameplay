
import React, { useState ,useCallback} from "react";
import { styles } from "./style";
import { Load } from "../../components/Load";
import { View, FlatList, } from 'react-native';
import { Profile } from "../../components/Profile";
import { Background } from '../../components/Backgroud';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/buttonAdd';
import { useNavigation ,useFocusEffect} from "@react-navigation/native";
import { ListDivider } from '../../components/ListDivider';
import { CategorySelect } from '../../components/CategorySelect';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/batabase";


export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)

    }
    function handleAppointmentDetails(guildSelected : AppointmentProps) {
        navigation.navigate('AppointmentDetails',{guildSelected});

    }
    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');

    }
    async function LoadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
        if (category) {
            setAppointments(storage.filter(item => item.category === category));
        }
        else {
            setAppointments(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(()=>{
        LoadAppointments();
    },[category]));

    return (

        <Background>
            <View style={styles.hearder}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />
            {  loading ? <Load/> :
                <>


                    <ListHeader
                        title='Partidas Agendadas'
                        subtitle={`Total ${appointments.length}`}

                    />


                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={()=> handleAppointmentDetails(item )}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            }
        </Background>

    );
}