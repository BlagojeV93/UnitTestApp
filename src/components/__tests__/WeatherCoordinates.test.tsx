import React from "react";
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import WeatherCoordinates from "../WeatherCoordinates"
import { useNavigation } from "@react-navigation/native";

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual<object>('@react-navigation/native'),
        useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() })
    }
})

describe('Should render correctly', () => {
    test('HomeScreen', () => {
        const wrapper = render(<WeatherCoordinates />)
        wrapper.getByTestId('weather-coordinates')
    })

    test('Should navigate to weather screen with given coordinates when valid form is submitted', async () => {
        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValueOnce({ navigate: mockNavigate });

        const wrapper = render(<WeatherCoordinates />)

        const fields = {
            latitude: wrapper.getByTestId('weather-coordinates-latitude'),
            longitude: wrapper.getByTestId('weather-coordinates-longitude'),
        }

        fireEvent.changeText(fields.latitude, '0')
        fireEvent.changeText(fields.longitude, '0')

        const button = wrapper.getByTestId('button');

        fireEvent.press(button);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('Weather', {
                latitude: 0,
                longitude: 0
            })
        })
    })

    describe('Latitude field', () => {
        test('Should not show error when the value is the lowest range value', () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-latitude')

            fireEvent.changeText(field, '-90')

            return expect(wrapper.findByText('Latitude must be a valid number')).rejects.toThrow()
        })

        test('Should not show error when the value is the highest range value', () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-latitude')

            fireEvent.changeText(field, '90')

            return expect(wrapper.findByText('Latitude must be a valid number')).rejects.toThrow()
        })

        test('Should show error when the value is bellow the lowest range value', async () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-latitude')

            fireEvent.changeText(field, '-91')

            await waitFor(() => {
                wrapper.getByText('Latitude must be a valid number')
            })
        })

        test('Should show error when the value is above the highest range value', async () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-latitude')

            fireEvent.changeText(field, '91')

            await waitFor(() => {
                wrapper.getByText('Latitude must be a valid number')
            })
        })

        test('Should show error when the value is not a number', async () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-latitude')

            fireEvent.changeText(field, 'a')

            await waitFor(() => {
                wrapper.getByText('Latitude must be a valid number')
            })
        })
    })

    describe('Longitude field', () => {
        test('Should not show error when the value is the lowest range value', () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-longitude')

            fireEvent.changeText(field, '-180')

            return expect(wrapper.findByText('Longitude must be a valid number')).rejects.toThrow()
        })

        test('Should not show error when the value is the highest range value', () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-longitude')

            fireEvent.changeText(field, '180')

            return expect(wrapper.findByText('Longitude must be a valid number')).rejects.toThrow()
        })

        test('Should show error when the value is bellow the lowest range value', async () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-longitude')

            fireEvent.changeText(field, '-181')

            await waitFor(() => {
                wrapper.getByText('Longitude must be a valid number')
            })
        })

        test('Should show error when the value is above the highest range value', async () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-longitude')

            fireEvent.changeText(field, '181')

            await waitFor(() => {
                wrapper.getByText('Longitude must be a valid number')
            })
        })

        test('Should show error when the value is not a number', async () => {
            const wrapper = render(<WeatherCoordinates />)
            const field = wrapper.getByTestId('weather-coordinates-longitude')

            fireEvent.changeText(field, 'a')

            await waitFor(() => {
                wrapper.getByText('Longitude must be a valid number')
            })
        })
    })
})