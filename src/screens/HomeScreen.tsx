import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../constants';
import moment from 'moment';
import WeatherCurrent from '../components/WeatherCurrent';
import WeatherCoordinates from '../components/WeatherCoordinates';

const HomeScreen = () => {
    const now = moment(new Date())

    return (
        <LinearGradient
            colors={[Colors.LIGHT_GRAY, Colors.DARKER_GRAY]}
            testID='home-screen'
            style={styles.mainContainer}
        >
            <View style={styles.title}>
                <Text style={styles.date}>{now.format('MMM DD, YYYY')}</Text>
                <Text style={styles.day}>{now.format('dddd')}</Text>
            </View>
            <WeatherCurrent />
            <Text style={styles.divider} testID='home-screen-divider'>
                Or
            </Text>
            <WeatherCoordinates />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 40,
        alignContent: 'space-between',
        justifyContent: 'space-evenly'
    },
    title: {
        justifyContent: 'flex-end'
    },
    date: {
        color: Colors.GRAY,
        fontSize: 13
    },
    day: {
        color: Colors.WHITE,
        fontSize: 21
    },
    divider: {
        color: Colors.WHITE,
        textAlign: 'center'
    }
})

export default HomeScreen