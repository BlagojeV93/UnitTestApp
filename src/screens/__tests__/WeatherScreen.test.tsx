import React = require("react")
import WeatherScreen from "../WeatherScreen"
import { act, fireEvent, waitFor } from "@testing-library/react-native"
import { useNavigation } from "@react-navigation/native"
import { mockStore, render } from "../../utils/test.utils"
import { fetchWeather, fetchWeatherFailure, fetchWeatherSuccess } from "../../store/weather/actions"
import { nullWeather } from "../../types/Weather"

jest.mock('@react-navigation/native', () => {
    return {
        ...jest.requireActual<object>('@react-navigation/native'),
        useNavigation: jest.fn().mockReturnValue({ goBack: jest.fn() }),
        useRoute: jest.fn().mockReturnValue({ params: { latitude: 0, longitude: 0 } })
    }
})

describe('Should render correctly', () => {
    test('HomeScreen', () => {
        const wrapper = render(<WeatherScreen />)
        wrapper.getByTestId('weather-screen')
    })

    test('Should return to home when home button is pressed', () => {
        const mockGoBack = jest.fn();
        (useNavigation as jest.Mock).mockReturnValueOnce({ goBack: mockGoBack })

        const wrapper = render(<WeatherScreen />);
        const button = wrapper.getByText('Home');

        fireEvent.press(button);
        expect(mockGoBack).toHaveBeenCalled()
    })

    test('Should fetch weather', async () => {
        const interceptor = jest.fn();
        const store = mockStore(interceptor);

        render(<WeatherScreen />, { store });
        await waitFor(() => {
            expect(interceptor).toHaveBeenCalledWith(fetchWeather(0, 0))
        })
    })

    test('Should display loading spinner while fetching weather data', () => {
        const wrapper = render(<WeatherScreen />)
        wrapper.getByTestId('weather-loading-spinner')
    })

    test('Shoud display error message on fetch weather fail', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherFailure('mock-error'))
        })

        wrapper.getByText('mock-error')
    })

    test('Should render weather icon when data fetched', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess({ ...nullWeather, icon: 'mock-icon' }))
        })

        const image = wrapper.getByTestId('weather-icon')
        expect(image).toHaveProp('source', { uri: 'mock-icon' })
    })

    test('Should not render weather icon when icon is missing', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess(nullWeather))
        })

        expect(() => wrapper.getByTestId('weather-icon')).toThrow()
    })

    test('Should display description from the weather data', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess({ ...nullWeather, description: 'mock-description' }))
        })

        wrapper.getByText('mock-description')
    })

    test('Should not render weather description when it is missing from the api', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess(nullWeather))
        })

        expect(() => wrapper.getByTestId('weather-description')).toThrow()
    })

    test('Should display city from the weather data', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess({ ...nullWeather, city: 'mock-city' }))
        })

        wrapper.getByText('mock-city')
    })

    test('Should display formatted temperature from the weather data', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess({ ...nullWeather, temperature: 10.8 }))
        })

        const container = wrapper.getByTestId('weather-temperature-container')
        const title = wrapper.getByText('temperature')
        const temperature = wrapper.getByText('11°C')

        expect(container).toContainElement(title)
        expect(container).toContainElement(temperature)
    })

    test('Should display windspeed from the weather data', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess({ ...nullWeather, windSpeed: 20 }))
        })

        const container = wrapper.getByTestId('weather-windspeed-container')
        const title = wrapper.getByText('wind')
        const widnspeed = wrapper.getByText('20m/s')

        expect(container).toContainElement(title)
        expect(container).toContainElement(widnspeed)
    })

    test('Should display humidity from the weather data', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess({ ...nullWeather, humidity: 10 }))
        })

        const container = wrapper.getByTestId('weather-humidity-container')
        const title = wrapper.getByText('humidity')
        const humidity = wrapper.getByText('10%')

        expect(container).toContainElement(title)
        expect(container).toContainElement(humidity)
    })

    test('Should display pressure from the weather data', () => {
        const store = mockStore();
        const wrapper = render(<WeatherScreen />, { store });

        act(() => {
            store.dispatch(fetchWeatherSuccess({ ...nullWeather, pressure: 1000 }))
        })

        const container = wrapper.getByTestId('weather-pressure-container')
        const title = wrapper.getByText('pressure')
        const pressure = wrapper.getByText('1000 hPa')

        expect(container).toContainElement(title)
        expect(container).toContainElement(pressure)
    })
})