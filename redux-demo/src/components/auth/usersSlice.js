import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
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

export const getAllWishlists = createAsyncThunk('users/getAllWishlists', async () => {
    const { data: { user: { id: userId } } } = await supabase.auth.getUser()

    let { data: wishlists, error } = await supabase
      .from('wishlists')
      .select('*')
      .eq('userId', userId)
  
    return wishlists
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

export const getAllSavedApartments = createAsyncThunk('users/getAllSavedApartments', async ()  => {
  let { data: { user: { id: userId } } } = await supabase.auth.getUser()

  let { data: savedApartments, error } = await supabase
  .from('savedApartments')
  .select("*")
  .eq('userId', userId)

    // console.log('saved apartments', savedApartments)

    return savedApartments
})

export const addSavedApartment = createAsyncThunk('users/addSavedApartment', async savedApartment  => {
  let { data: { user: { id: userId } } } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from('savedApartments')
    .insert([
        {
            apartmentId: savedApartment.apartmentId,
            wishlistId: savedApartment.wishlistId,
            userId: userId
        }
    ])
    .single()

    return savedApartment
})

export const deleteSavedApartment = createAsyncThunk('users/deleteSavedApartment', async savedApartment => {
  let { data: { user: { id: userId } } } = await supabase.auth.getUser()

    const { data, error } = await supabase
    .from('savedApartments')
    .delete()
    .eq('wishlistId', savedApartment.wishlistId)
    .eq('apartmentId', savedApartment.apartmentId)
    .eq('userId', userId)

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
    savedApartments: [],
    savedApartment: {},
    isApartmentSaved: false
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
        })
        .addCase(getAllWishlistsByUserId.fulfilled, (state, action) => {
            state.wishlists = action.payload
            state.status = 'successed'
            state.isLoading = false
        })
        .addCase(getAllSavedApartments.fulfilled, (state, action) => {
            state.savedApartments = action.payload
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
export const selectIsApartmentSaved = (state) => state.users.isApartmentSaved

// Reducers exports
export const { setWishlist, resetWishlist } = usersSlice.actions

// Memoized selectors
export const numberOfSavedApartmentsInEachWishlist = createSelector(
    [selectAllWishlists, selectAllSavedApartments], 
    (allWishlists, allSavedApartments) => {
        
        const apartmentsByWishlist = allWishlists.reduce((result, wishlist) => {
            // Find all saved apartments for this wishlist
            const savedApartmentsForWishlist = allSavedApartments.filter(
              apartment => apartment.wishlistId === wishlist.id
            );
          
            // Count the number of saved apartments for this wishlist
            const numApartmentsForWishlist = savedApartmentsForWishlist.length;
          
            // Add the count to the result object, keyed by wishlist id
            result[wishlist.name] = numApartmentsForWishlist;
          
            return result;
        }, {});

        return apartmentsByWishlist
    }
)

// Slice export
export default usersSlice.reducer