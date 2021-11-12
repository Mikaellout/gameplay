import React , {useContext} from "react";
import {View ,
 Text,
 Image,
 Alert,
 ActivityIndicator
} from 'react-native';
import {styles}from './styles';
import { useAuth } from "../../hooks/auth";
import { theme } from "../../@global/styles/theme";
import {Background}from '../../components/Backgroud';
import { ButtonIcon } from "../../components/Buttomicon";
import IllustrationImg from '../../assets/illustration.png';


export function SignIn (){    
const {loading , signIn}= useAuth();


async function handlerSignIn(){
    try {
        await signIn();
    } catch (error) {
      Alert.alert(error) ;
      console.log(error);
    }
 } 

return (
    <Background>
        <View style = {styles.container}>
            
            
        <Image source={IllustrationImg}
            style={styles.image}
            resizeMode="stretch"
            
            />
            <View style={styles.content}>
                <Text  style={styles.title} >
                Conecte-se {`\n`}
                e organize suas{`\n`}
                Jogatinas

                </Text>
                <Text style={styles.subtitle} >
                Crie grupos para jogar seus games{`\n`}
                favoritos com seus amigos!{`\n`}  

                </Text>
                {
                loading ? <ActivityIndicator color={theme.colors.primary}/>:
                
                <ButtonIcon 
                    title="Enter com o Discord"
                    onPress={handlerSignIn}
                />
                }
            </View>  
        </View>
    </Background>
);

}