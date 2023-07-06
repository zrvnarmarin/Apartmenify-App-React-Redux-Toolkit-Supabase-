import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import supabase from "../../../supabaseClient";

const initialState = {
    ratings: [],
    rating: 0,
    comments: [],
    comment: '',
    isLoading: false,
    error: null
}

const ratingsSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
        setRating: (state, action) => {
            state.rating = action.payload
        },
        setComment: (state, action) => {
            state.comment = action.payload
        }
    }
})

// States
export const selectRatings = (state) = state.ratings.ratings
export const selectRating = (state) = state.ratings.rating
export const selectComments = (state) = state.ratings.comments
export const selectComment = (state) = state.ratings.comment
export const selectIsLoading = (state) = state.ratings.isLoading
export const selectError = (state) = state.ratings.error

// Reducers
export const { setRating, setComment} = ratingsSlice.actions

// Slice
export default ratingsSlice.reducer