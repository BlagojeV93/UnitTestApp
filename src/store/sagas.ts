import { fork, all, spawn } from 'redux-saga/effects'
import { saga as weatherSaga } from './weather'

export default function* () {
    yield fork(bootstrap)
}

function* bootstrap() {
    try {
        yield all([spawn(weatherSaga)])
    } catch (error) {

    }
}