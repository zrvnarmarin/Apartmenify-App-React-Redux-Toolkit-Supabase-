import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    truth: false,
    counter: 0
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {state.counter += 1},
        decrement: (state) => {state.counter -= 1},
        toggleTruth: (state) => {state.truth = true},
        toggleUntruth: (state) => {state.truth = false},
        addByAmount: (state, action) => {state.counter += action.payload}
    }
})

export const { increment, decrement, toggleTruth, toggleUntruth, addByAmount } = counterSlice.actions
export default counterSlice.reducer