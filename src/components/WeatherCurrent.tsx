import React from 'react';
import { View, StyleSheet } from 'react-native';

interface WeatherCurrentProps {
}

const WeatherCurrent = (props: WeatherCurrentProps) => {

    return (
        <View testID='weather-current' style={styles.mainContainer}>
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
       
    }
})

export default WeatherCurrent