import React from 'react';
import { View, StyleSheet } from 'react-native';

interface WeatherCoordinatesProps {
}

const WeatherCoordinates = (props: WeatherCoordinatesProps) => {

    return (
        <View testID='weather-coordinates' style={styles.mainContainer}>
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
      
    }
})

export default WeatherCoordinates