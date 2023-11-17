import React from 'react';
import { View, StyleSheet } from 'react-native';

interface WeatherScreenProps {
}

const WeatherScreen = (props: WeatherScreenProps) => {

    return (
        <View
            testID='weather-screen'
            style={styles.mainContainer}
        >
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    }
})

export default WeatherScreen