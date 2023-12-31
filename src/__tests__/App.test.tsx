import React = require("react")
import AppNavigator from "../screens"
import { View } from "react-native"
import { render } from "@testing-library/react-native"
import App from "../App"
import { Provider } from "react-redux"
import store from '../store'

jest.mock('../screens', () => jest.fn())
jest.mock('react-redux', () => {
    return {
        ...jest.requireActual<object>('react-redux'),
        Provider: jest.fn()
    }
})

describe('App', () => {
    test('Should render routes', () => {
        (Provider as jest.Mock).mockImplementationOnce(({ children }) => children);

        (AppNavigator as jest.Mock).mockReturnValueOnce(<View testID="mock-routes" />)
        const wrapper = render(<App />)
        wrapper.getByTestId('mock-routes')
    })

    test('Should render provider', () => {
        let providerStore!: typeof store;
        (Provider as jest.Mock).mockImplementationOnce(({ store }) => {
            providerStore = store;
            return <View testID='mock-provider' />
        });

        const wrapper = render(<App />);
        wrapper.getByTestId('mock-provider');
        expect(providerStore).toBe(store);
    })
})