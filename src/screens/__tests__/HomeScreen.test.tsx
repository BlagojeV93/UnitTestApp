import React from "react";
import { render } from '@testing-library/react-native'
import HomeScreen from "../HomeScreen";
import WeatherCurrent from "../../components/WeatherCurrent";
import { View } from "react-native";
import WeatherCoordinates from "../../components/WeatherCoordinates";

jest.mock('../../components/WeatherCurrent.tsx', () => jest.fn().mockReturnValue(null))
jest.mock('../../components/WeatherCoordinates.tsx', () => jest.fn().mockReturnValue(null))

describe('Should render correctly', () => {
    test('HomeScreen', () => {
        const wrapper = render(<HomeScreen />)
        wrapper.getByTestId('home-screen')
    })
})

describe('Title section', () => {
    beforeEach(() => {
        jest.useFakeTimers()
        jest.setSystemTime(946684800000) // Saturday, 01 January 2000 00:00 UTC
    })

    afterEach(() => {
        jest.useRealTimers()
    })

    test('Should contain real date', () => {
        const wrapper = render(<HomeScreen />)
        wrapper.getByText('Jan 01, 2000')
    })

    test('Should contain current day', () => {
        const wrapper = render(<HomeScreen />)
        wrapper.getByText('Saturday')
    })

    test('Should contain a section to get current weather', () => {
        (WeatherCurrent as jest.Mock).mockReturnValue(<View testID='mock-weather-current' />)
        const wrapper = render(<HomeScreen />)
        wrapper.getByTestId('mock-weather-current')
    })

    test('Should contain a divider', () => {
        const wrapper = render(<HomeScreen />)
        wrapper.getByTestId('home-screen-divider')
    })

    test('Should contain a section to get weather at given latitude and longitude', () => {
        (WeatherCoordinates as jest.Mock).mockReturnValue(<View testID='mock-weather-coordinates' />)
        const wrapper = render(<HomeScreen />)
        wrapper.getByTestId('mock-weather-coordinates')
    })
})