import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native';
import { Colors } from '../constants';
import { WeatherScreenRouteProp } from '.';
import { fetchWeather } from '../store/weather/actions';
import { connect } from 'react-redux';
import { StateType } from '../store/reducers';
import { WeatherType } from '../types/Weather';
import Status from '../types/Status';

type StateProps = {
    weather: WeatherType;
    status: Status;
    error: string;
}
type DispatchProps = {
    fetchWeather: typeof fetchWeather
}
type Props = StateProps & DispatchProps

const WeatherScreen = (props: Props) => {
    const { goBack } = useNavigation()
    const route = useRoute<WeatherScreenRouteProp>()
    const { latitude, longitude } = route.params
    const { weather, error, status, fetchWeather } = props
    const { icon, description, city, temperature, windSpeed, humidity, pressure } = weather

    useEffect(() => {
        fetchWeather(latitude, longitude)
    }, [])

    return (
        <View
            testID='weather-screen'
            style={styles.mainContainer}
        >
            <TouchableOpacity style={styles.back} onPress={goBack}>
                <Text style={styles.backText}>Home</Text>
            </TouchableOpacity>
            {status === Status.LOADING && (
                <ActivityIndicator size='large' color={Colors.DARK_GRAY} testID='weather-loading-spinner' />
            )}
            {status === Status.ERROR && (
                <Text style={styles.errorText}>{error}</Text>
            )}
            {status === Status.SUCCESS && (
                <>
                    <View style={styles.head}>
                        {icon && (
                            <Image testID='weather-icon' style={styles.image} source={{ uri: icon }} />
                        )}
                        <Text style={styles.city}>{city}</Text>
                        {description && (
                            <Text testID='weather-description' style={styles.desription}>{description}</Text>
                        )}
                    </View>
                    <View style={styles.stats}>
                        <Text style={styles.statsTitle}>Stats</Text>
                        <View
                            testID='weather-temperature-container'
                            style={[styles.card, styles.cardNegative]}>
                            <Text style={styles.cardTextNegative}>temperature</Text>
                            <Text style={styles.cardTextNegative}>
                                {Math.round(temperature)}°C
                            </Text>
                        </View>
                        <View
                            testID='weather-windspeed-container'
                            style={styles.card}>
                            <Text style={styles.cardText}>wind</Text>
                            <Text style={styles.cardText}>
                                {windSpeed}m/s
                            </Text>
                        </View>
                        <View
                            testID='weather-humidity-container'
                            style={[styles.card, styles.cardNegative]}>
                            <Text style={styles.cardTextNegative}>humidity</Text>
                            <Text style={styles.cardTextNegative}>
                                {humidity}%
                            </Text>
                        </View>
                        <View
                            testID='weather-pressure-container'
                            style={styles.card}>
                            <Text style={styles.cardText}>pressure</Text>
                            <Text style={styles.cardText}>
                                {pressure} hPa
                            </Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'space-evenly',
        backgroundColor: Colors.WHITE
    },
    back: {
        position: 'absolute',
        top: 70,
        left: 20
    },
    backText: {
        fontSize: 24
    },
    errorText: {
        color: Colors.ERROR,
        textAlign: 'center'
    },
    head: {
        alignItems: 'center'
    },
    image: {
        width: 200,
        aspectRatio: 1
    },
    desription: {
        fontSize: 24,
        textTransform: 'capitalize'
    },
    city: {
        fontSize: 48
    },
    stats: {
        paddingHorizontal: '10%'
    },
    statsTitle: {
        fontSize: 13,
        color: Colors.LIGHTER_GRAY,
        marginBottom: 10
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    cardNegative: {
        backgroundColor: Colors.BLUE
    },
    cardTextNegative: {
        color: Colors.WHITE,
        textTransform: 'capitalize'
    },
    cardText: {
        textTransform: 'capitalize',
        color: Colors.LIGHTER_GRAY
    }
})

export default connect<StateProps, DispatchProps, {}, StateType>((state) => ({
    status: state.weather.status,
    weather: state.weather.weather,
    error: state.weather.error
}), {
    fetchWeather
})(WeatherScreen)