import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: ''
}

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        setCurrentTime: (state, action) => {
            console.log(action.payload)
            state.currentTime = action.payload
        }
    }
})

// States
export const selectCurrentTime = (state) => state.time.currentTime

// Reducers
export const {
    setCurrentTime
} = timeSlice.actions

// Slice
export default timeSlice.reducer