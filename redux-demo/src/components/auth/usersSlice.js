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

export const getUser = createAsyncThunk('users/getUser', async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
})

const initialState = {
    users: [],
    user: {},
    status: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers(builder) {
        builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'successed';
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'successed';
        }
    )} 
})

export const selectAllUsers = (state) => state.users.users
export const selectUser = (state) => state.users.user

export default usersSlice.reducer