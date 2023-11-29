import Status from "../../../types/Status"
import { WeatherType, nullWeather } from "../../../types/Weather"
import reducer from "../reducer"
import { fetchWeather, fetchWeatherFailure, fetchWeatherReset, fetchWeatherSuccess } from "../actions"

describe('Store/weather', () => {
    const initialState = {
        status: Status.START,
        error: '',
        weather: nullWeather
    }

    describe('reducer', () => {
        const mockWeather: WeatherType = {
            temperature: 10,
            windSpeed: 2,
            humidity: 100,
            city: 'mock-city',
            description: 'mock-description',
            pressure: 1000,
            icon: 'mock-icon'
        }
        test('Should return initial state', () => {
            const state = reducer(undefined, { type: '@@INIT' });
            expect(state).toEqual(initialState);
        })

        test('Should handle fetch weather action', () => {
            const state = reducer(undefined, fetchWeather(0, 0));
            expect(state).toEqual({ status: Status.LOADING, error: '', weather: nullWeather })
        })

        test('Should handle fetch weather success action', () => {
            const state = reducer(undefined, fetchWeatherSuccess(mockWeather));
            expect(state).toEqual({ status: Status.SUCCESS, error: '', weather: mockWeather })
        })

        test('Should handle fetch weather failure action', () => {
            const state = reducer(undefined, fetchWeatherFailure('mock-error'));
            expect(state).toEqual({ status: Status.ERROR, error: 'mock-error', weather: nullWeather })
        })

        test('Should handle fetch weather reset action', () => {
            const success = reducer(undefined, fetchWeatherSuccess(nullWeather));
            const state = reducer(success, fetchWeatherReset())
            expect(state).toEqual(initialState)
        })
    })
})