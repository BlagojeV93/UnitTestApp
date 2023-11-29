import { takeLatest, call, put } from "redux-saga/effects";
import { Actions, WEATHER_START_TYPE, fetchWeatherFailure, fetchWeatherSuccess } from "./actions";
import WeatherService from "../../service/WeatherService";
import { AxiosError } from "axios";
import { WeatherType } from "../../types/Weather";
import { SagaGeneratorType } from "../../types/Saga";

export default function* saga() {
    yield takeLatest(Actions.START, weatherStartWorker)
}

export function* weatherStartWorker(action: WEATHER_START_TYPE): SagaGeneratorType<WeatherType> {
    try {
        const weather = yield call(
            WeatherService.fetchCurrentWeather,
            action.payload.latitude,
            action.payload.longitude
        )
        yield put(fetchWeatherSuccess(weather))
    } catch (error) {
        const e = error as AxiosError
        yield put(fetchWeatherFailure(e.message))
    }
}