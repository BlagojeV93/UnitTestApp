import React from "react";
import { render } from '@testing-library/react-native'
import WeatherCurrent from "../WeatherCurrent";

describe('Should render correctly', () => {
    test('HomeScreen', () => {
        const wrapper = render(<WeatherCurrent />)
        wrapper.getByTestId('weather-current')
    })

    test('Should navigate to screen with location', () => {
        throw new Error('Test not implemented')
    })
})