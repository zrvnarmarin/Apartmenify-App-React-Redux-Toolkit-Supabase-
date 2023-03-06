import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../supabaseClient';

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
    try {
        const { data, error } = await supabase
        .rpc('get_users')

        return data
    }
    catch (error) {
        return error.message
    }
})

const initialState = {
    users: [],
    status: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.users = action.payload;
            state.status = 'successed';
        }
    )} 
})

export const selectAllUsers = (state) => state.users.users

export default usersSlice.reducer