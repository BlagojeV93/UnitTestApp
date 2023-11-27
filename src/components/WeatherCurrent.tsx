import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import LocationService from '../service/LocationService';
import { HomeScreenNavigationProp } from '../screens';
import Button from './Button';
import { Colors } from '../constants';

interface WeatherCurrentProps {
}

const WeatherCurrent = (props: WeatherCurrentProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const navigation = useNavigation<HomeScreenNavigationProp>()

    const handleFetchPostion = useCallback(async () => {
        try {
            // setError(false)
            setLoading(true);
            const position = await LocationService.getCurrentPosition();
            navigation.navigate('Weather', position)
        } catch (e) {
            setError(true)
        }
        setLoading(false)
    }, [navigation])

    return (
        <Button
            onPress={handleFetchPostion}
            label='Weather at my position'
            testID='weather-current'
            loading={loading}
            style={error ? styles.error : {}}
        />
    )
}

const styles = StyleSheet.create({
    error: {
        borderColor: Colors.ERROR,
        borderWidth: 1,
        borderRadius: 10
    }
})

export default WeatherCurrent