import React from "react";
import { View ,Text} from "react-native";
import { styles } from "../Profile/style";
import { Avatar } from "../Avatar";
import { useAuth } from "../../hooks/auth";
  export function Profile() {
    const {user} = useAuth();
    const frase = ['Hoje e dia de vitora!', "Juntos somos vai fortes", 'Vamos juntos ao Alem']

    // console.log(user);    
    return(
    <View style={styles.container}>
        <Avatar urlImag ={user.avatar}/>

        <View >
            <View style={styles.user}>
                <Text style={styles.greeting}>
                    Olá!
                </Text>
                <Text style={styles.username}>
                    {user.firstName}
                </Text>
            </View>
            <Text style={styles.message}>
               {/* fazer vetor com frase para ficar mundando frase automaticamente */}
                Hoje e dia de Vitoria!
                 {/* {frase} */}
            </Text>
        </View>
    </View>
    );
    
}