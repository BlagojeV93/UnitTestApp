import React, { useEffect } from "react";
import { View } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import AppNavigator, { HomeScreenNavigationProp } from "..";
import HomeScreen from "../HomeScreen";
import { useNavigation } from "@react-navigation/native";
import WeatherScreen from "../WeatherScreen";

jest.mock('../HomeScreen', () => jest.fn())
jest.mock('../WeatherScreen', () => jest.fn())

describe('AppNavigator', () => {
    test('Should render Home screen by default', async () => {
        (HomeScreen as jest.Mock).mockReturnValueOnce(<View testID='mock-home-screen'></View>);
        const wrapper = render(<AppNavigator />);

        await waitFor(() => {
            wrapper.getByTestId('mock-home-screen')
        });
    });

    test('Should render weather screen on "weather" route', async () => {
        (HomeScreen as jest.Mock).mockImplementationOnce(() => {
            const navigation = useNavigation<HomeScreenNavigationProp>()

            useEffect(() => {
                navigation.navigate('Weather', { latitude: 0, longitude: 0 })
            }, [navigation])

            return null
        });

        (WeatherScreen as jest.Mock).mockReturnValueOnce(
            <View testID='mock-weather-screen'></View>
        );
        const wrapper = render(<AppNavigator />);

        await waitFor(() => {
            wrapper.getByTestId('mock-weather-screen')
        });
    })
})