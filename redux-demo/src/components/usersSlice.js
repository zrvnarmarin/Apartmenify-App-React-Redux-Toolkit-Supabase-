import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    password: ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export default usersSlice.reducer