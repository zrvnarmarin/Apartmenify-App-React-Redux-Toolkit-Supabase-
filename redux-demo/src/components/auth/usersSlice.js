import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../supabaseClient';
import { compareObjects } from '../../utils/utilityFunctions';

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
    .select('name, id')
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
    .eg('wishlistId', data.wishlistId)
    .eg('userId', data.userId)

    console.log(savedApartments)

    return savedApartments
})

export const addSavedApartment = createAsyncThunk('users/addSavedApartment', async savedApartment  => {
    const { data, error } = await supabase
    .from('savedApartments')
    .insert([
        {
            apartmentId: savedApartment.apartmentId,
            wishlistId: savedApartment.wishlistId,
            userId: savedApartment.userId
        }
    ])
    .single()

    return savedApartment
})

export const deleteSavedApartment = createAsyncThunk('users/deleteSavedApartment', async savedApartment => {
    const { data, error } = await supabase
    .from('savedApartments')
    .delete()
    .eq('wishlistId', savedApartment.wishlistId)
    .eq('apartmentId', savedApartment.apartmentId)
    .eq('userId', savedApartment.userId)

    return savedApartment
})

const initialState = {
    users: [],
    user: {},
    status: 'idle',
    isLoading: false,
    error: null,
    wishlists: [],
    wishlist: '',
    savedApartment: {},
    savedApartments: []
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

            // console.log(action.payload)
        })
        .addCase(getAllWishlistsByUserId.fulfilled, (state, action) => {
            state.wishlists = action.payload
            state.status = 'successed'
            state.isLoading = false

            // console.log(action.payload)
        })
        .addCase(getAllSavedApartments, (state, action) => {
            state.savedApartments = action.payload
            console.log('ad case saved apartments', action.payload)
        })
        .addCase(addSavedApartment.fulfilled, (state, action) => {
            state.savedApartments.push(action.payload)
            state.isLoading = false
        })
        .addCase(deleteSavedApartment.fulfilled, (state, action) => {
            const propsToCompare = ['apartmentId', 'wishlistId', 'userId']
            state.savedApartments = state.savedApartments.filter(apartment => {
              return propsToCompare.some(prop => apartment[prop] !== action.payload[prop])
            })
        }
    )} 
})

// State exports
export const selectAllUsers = (state) => state.users.users
export const selectUser = (state) => state.users.user
export const selectAllWishlists = (state) => state.users.wishlists
export const selectWishlist = (state) => state.users.wishlist
export const selectAllSavedApartments = (state) => state.users.savedApartments

// Reducers exports
export const { setWishlist, resetWishlist } = usersSlice.actions

// Slice export
export default usersSlice.reducer