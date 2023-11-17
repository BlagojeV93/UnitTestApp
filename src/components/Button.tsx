import React from 'react';
import { Text, StyleSheet, ViewProps, TouchableOpacity, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants';

type ButtonProps = {
    label: string;
    onPress: () => void;
    loading?: boolean
} & ViewProps

const Button = (props: ButtonProps) => {
    const { label, onPress, loading, style, ...others } = props

    return (
        <TouchableOpacity onPress={props.onPress} testID='button'>
            <LinearGradient {...others} colors={[Colors.LIGHTER_GRAY, Colors.DARK_GRAY]} style={[styles.mainContainer, style]}>
                {loading ? (
                    <ActivityIndicator size={24} color={Colors.WHITE} testID='button-loader' />
                ) : (
                    <Text style={styles.label}>{props.label}</Text>
                )}
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
       borderRadius: 10,
       paddingHorizontal: 15,
       paddingVertical: 8,
       alignItems: 'center',
       justifyContent: 'center'
    },
    label: {
        fontSize: 19,
        color: Colors.WHITE
    }
})

export default Button