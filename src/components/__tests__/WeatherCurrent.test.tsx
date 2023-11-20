import React from "react";
import { act, fireEvent, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react-native'
import WeatherCurrent from "../WeatherCurrent";
import { useNavigation } from "@react-navigation/native";
import LocationService from "../../service/LocationService";
import { Colors } from "../../constants";

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual<object>('@react-navigation/native'),
        useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() })
    }
})

describe('Should render correctly', () => {
    test('HomeScreen', () => {
        const wrapper = render(<WeatherCurrent />)
        wrapper.getByTestId('weather-current')
    })

    test('Should render label', () => {
        const wrapper = render(<WeatherCurrent />)
        wrapper.getByText('Weather at my position')
    })

    test('Should navigate to screen with location', async () => {
        const mockNavigate = jest.fn();
        (useNavigation as jest.Mock).mockReturnValueOnce({ navigate: mockNavigate })

        const wrapper = render(<WeatherCurrent />);
        const button = wrapper.getByTestId('weather-current');

        fireEvent.press(button);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('Weather', {
                latitude: 0,
                longitude: 0
            })
        })
    })

    describe('Loader', () => {
        test('Should being rendered while position is fetched', async () => {
            let mockResolve: (position: { latitude: number, longitude: number }) => void

            jest.spyOn(LocationService, 'getCurrentPosition').mockImplementationOnce(
                () => new Promise((resolve) => mockResolve = resolve)
            );

            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            await expect(wrapper.findByTestId('button-loader')).resolves.toBeDefined();
            await act(async () => {
                await mockResolve({ latitude: 0, longitude: 0 })
            });
        })

        test('Should not be rendered when position is fetched', () => {
            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            return waitForElementToBeRemoved(() => wrapper.getByTestId('button-loader'));
        })

        test('Should not be rendered when fetch position fails', () => {
            jest.spyOn(LocationService, 'getCurrentPosition')
                .mockRejectedValueOnce(new Error(''));

            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            return waitForElementToBeRemoved(() => wrapper.getByTestId('button-loader'));
        })
    })

    describe('Error', () => {
        test('Shoud present error style when fetch position fails', async () => {
            jest.spyOn(LocationService, 'getCurrentPosition')
                .mockRejectedValueOnce(new Error(''));

            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            await waitFor(() => {
                expect(button).toHaveStyle({ borderColor: Colors.ERROR })
            })
        })

        test('Shoud remove error style when fetch position is triggered again', async () => {
            jest.spyOn(LocationService, 'getCurrentPosition')
                .mockRejectedValueOnce(new Error(''));

            const wrapper = render(<WeatherCurrent />);
            const button = wrapper.getByTestId('weather-current');
            fireEvent.press(button);

            await waitFor(() => {
                fireEvent.press(button);
                expect(button).not.toHaveStyle({ borderColor: Colors.ERROR })
            })
        })
    })
})