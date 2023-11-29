import { WeatherType } from "../../types/Weather"
import nock from 'nock'
import { CurrentWeatherRawResponseDto, nullCurrentWeatherRawResponse } from "../dto/weather-service.dto"
import WeatherService from "../WeatherService"

describe('WeatherService', () => {
    const mockResponse: CurrentWeatherRawResponseDto = {
        ...nullCurrentWeatherRawResponse,
        main: {
            ...nullCurrentWeatherRawResponse.main,
            temp: 10,
            humidity: 100,
            pressure: 1000
        },
        wind: {
            ...nullCurrentWeatherRawResponse.wind,
            speed: 10
        },
        weather: [
            { description: 'mock-description', main: '', id: 0, icon: 'mock-icon'}
        ],
        name: 'mock-city'
    }

    test('Should return formatted current weather data from API', async () => {
        const expectedWeather: WeatherType = {
            temperature: 10,
            humidity: 100,
            pressure: 1000,
            windSpeed: 10,
            icon: 'http://opemweathermap.org/img/wn/mock-icon@4x.ong',
            description: 'mock-description',
            city: 'mock-city'
        }

        nock('https://api.openweathermap.org').get('/data/2.5/weather').query(true).reply(200, mockResponse)

        const weather = await WeatherService.fetchCurrentWeather(0, 0)
        expect(weather).toEqual(expectedWeather)
    })

    test('Shoud return formatted current weather with empty weather', async () => {
        const mockEmptyWeather: CurrentWeatherRawResponseDto = {
            ...nullCurrentWeatherRawResponse,
            weather: []
        }

        nock('https://api.openweathermap.org').get('/data/2.5/weather').query(true).reply(200, mockEmptyWeather)
        const { icon, description } = await WeatherService.fetchCurrentWeather(0, 0)
        expect(icon).toBeNull()
        expect(description).toBeNull()
    })
})