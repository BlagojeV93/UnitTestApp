import React from "react";
import Button from "../Button";
import { fireEvent, render } from "@testing-library/react-native";

describe('Should render correctly', () => {
    test('Button', () => {
        const wrapper = render(<Button label='' onPress={jest.fn()} />)
        wrapper.getByTestId('button')
    })

    test('Should render loader when loading', () => {
        const wrapper = render(<Button label='' onPress={jest.fn()} loading />)
        wrapper.getByTestId('button-loader')
    })

    test('Should call onPress prop when clicked', () => {
        const mockOnPress = jest.fn()
        const wrapper = render(<Button label='' onPress={mockOnPress} />)
        const button = wrapper.getByTestId('button')

        fireEvent.press(button)
        expect(mockOnPress).toHaveBeenCalled()
    })

    test('Should render label', () => {
        const wrapper = render(<Button label='Mock label' onPress={jest.fn()} />)
        wrapper.getByText('Mock label')
    })

    test('Should recieve custom view props', () => {
        const wrapper = render(<Button label='' onPress={jest.fn()} testID='mock-button-test-id' />)
        wrapper.getByTestId('mock-button-test-id')
    })
})