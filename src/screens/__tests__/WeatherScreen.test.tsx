import React = require("react")
import WeatherScreen from "../WeatherScreen"
import { render } from "@testing-library/react-native"

describe('Should render correctly', () => {
    test('HomeScreen', () => {
        const wrapper = render(<WeatherScreen />)
        wrapper.getByTestId('weather-screen')
    })
})