import React from "react";
import { render } from '@testing-library/react-native'
import WeatherCoordinates from "../WeatherCoordinates"

describe('Should render correctly', () => {
    test('HomeScreen', () => {
        const wrapper = render(<WeatherCoordinates />)
        wrapper.getByTestId('weather-coordinates')
    })
})