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

export const getAllWishlists = createAsyncThunk('users/getAllWishlists', async userId => {
    const { data, error } = await supabase
    .from('wishlists')
    .select()
    .eq('userId', userId)

    return data
})

export const getAllWishlistsByUserId = createAsyncThunk('users/getAllWishlistsByName', async userId => {
    const { data, error } = await supabase
    .from('wishlists')
    .select('name')
    .eq('userId', userId)

    return data
})

export const addWishlist = createAsyncThunk('users/addWishlist', async newWishlist => {
    const { data, error } = await supabase  
    .from('wishlists')
    .insert([
        {
            name: newWishlist.name,
            userId: newWishlist.userId
        }
    ])
    .single()

    return newWishlist
})

export const getAllSavedApartments = createAsyncThunk('users/getAllSavedApartments', async data  => {
    const { data: savedApartments, error} = await supabase
    .from('savedApartments')
    .select('apartmentId')
    .eg('wishlistId', data.name)
})

const initialState = {
    users: [],
    user: {},
    status: 'idle',
    isLoading: false,
    error: null,
    wishlists: [],
    wishlist: ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setWishlist: (state, action) => {
            state.wishlist = action.payload
        },
        resetWishlist: (state, action) => {
            state.wishlist = ''
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.status = 'successed';
            state.isLoading = false
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.status = 'successed';
            state.isLoading = false
        })
        .addCase(addWishlist.fulfilled, (state, action) => {
            state.wishlists.push(action.payload)
            state.status = 'successed'
            state.isLoading = false
        })
        .addCase(getAllWishlists.fulfilled, (state, action) => {
            state.wishlists = action.payload
            state.status = 'successed'
            state.isLoading = false

            console.log(action.payload)
        })
        .addCase(getAllWishlistsByUserId.fulfilled, (state, action) => {
            state.wishlists = action.payload
            state.status = 'successed'
            state.isLoading = false

            console.log(action.payload)
        }
    )} 
})

// State exports
export const selectAllUsers = (state) => state.users.users
export const selectUser = (state) => state.users.user
export const selectAllWishlists = (state) => state.users.wishlists
export const selectWishlist = (state) => state.users.wishlist

// Reducers exports
export const { setWishlist, resetWishlist } = usersSlice.actions

// Slice export
export default usersSlice.reducer