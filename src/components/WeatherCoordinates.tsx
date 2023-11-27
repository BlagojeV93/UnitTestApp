import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { HomeScreenNavigationProp } from '../screens';
import Button from './Button';
import { Colors } from '../constants';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

interface WeatherCoordinatesProps {
}

type FormValues = {
    latitude: string;
    longitude: string;
}

const WeatherCoordinates = (props: WeatherCoordinatesProps) => {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const form = useForm({
        resolver: yupResolver(validationScheme),
        defaultValues,
        mode: 'onChange'
    })

    const handleSubmit = form.handleSubmit((values) => {
        const coordinates = {
            latitude: parseInt(values.latitude),
            longitude: parseInt(values.longitude)
        }
        navigation.navigate('Weather', coordinates)
    })

    return (
        <View testID='weather-coordinates'>
            <View style={styles.inputs}>
                <Controller
                    control={form.control}
                    render={({ field, ...props }) => (
                        <TextInput
                            {...props}
                            testID='weather-coordinates-latitude'
                            placeholder='Latitude'
                            style={styles.input}
                            placeholderTextColor={Colors.GRAY}
                            onChangeText={field.onChange}
                        />
                    )}
                    name='latitude'
                />
                {form.formState.errors.latitude && (
                    <Text style={styles.error}>Latitude must be a valid number</Text>
                )}
                <Controller
                    control={form.control}
                    render={({ field, ...props }) => (
                        <TextInput
                            {...props}
                            testID='weather-coordinates-longitude'
                            placeholder='Longitude'
                            style={styles.input}
                            placeholderTextColor={Colors.GRAY}
                            onChangeText={field.onChange}
                        />
                    )}
                    name='longitude'
                />
                {form.formState.errors.longitude && (
                    <Text style={styles.error}>Longitude must be a valid number</Text>
                )}
            </View>
            <Button onPress={handleSubmit} label='Find' />
        </View>
    )
}

const defaultValues: FormValues = {
    latitude: '',
    longitude: ''
}

const validationScheme = Yup.object({
    latitude: Yup.number().min(-90).max(90).defined(),
    longitude: Yup.number().min(-180).max(180).defined()
})

const styles = StyleSheet.create({
    inputs: {
        marginBottom: 15
    },
    input: {
        backgroundColor: Colors.TRANSPARENT,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.GRAY,
        color: Colors.WHITE,
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    error: {
        marginHorizontal: 5,
        color: Colors.ERROR
    }
})

export default WeatherCoordinates