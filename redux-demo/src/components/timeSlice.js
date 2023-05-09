import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTime: ''
}

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        setCurrentTime: (state, action) => {
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

// pogledaj ovo za prijenos statea https://stackoverflow.com/questions/72807148/how-to-access-state-of-one-slice-in-reducer-of-another-slice-using-redux-toolkit