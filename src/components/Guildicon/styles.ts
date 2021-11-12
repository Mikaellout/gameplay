import { StyleSheet } from 'react-native';
import { theme } from '../../@global/styles/theme';
// import { theme } from '../../@global/styles/theme';


export const styles = StyleSheet.create({
    container: {
        width: 62,
        height: 66,
        borderRadius: 8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:theme.colors.discord,
        overflow: 'hidden',
    },
    
    image: {
        width: 62,
        height: 66,

    },

});


