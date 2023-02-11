import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: '0', name: 'Marin Zrvnar' },
    { id: '1', name: 'Ivan Ivankovic' },
    { id: '2', name: 'Zoran Krletic' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export const selectAllUsers = (state) => state.users
export default usersSlice.reducer