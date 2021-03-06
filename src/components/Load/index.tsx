import React from 'react';
import { styles } from './styles';

import {View,ActivityIndicator} from 'react-native';
import { theme } from '../../@global/styles/theme';

export function Load() {
    return (
        <View style={styles.container} >

            <ActivityIndicator
                size='large'
                color={theme.colors.primary}
            />

        </View>
    );
}