import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import supabase from "../supabaseClient";

const initialState = {
    facility: '',
    facilities: []
}

const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState,
    reducers: {
        setFacility: (state, action) => {
            
        },
        deleteFacility: (state, action) => {

        }
    }
})

// State exports
export const selectFacility = (state) => state.facilities.facility
export const selectAllFacilities = (state) => state.facilities.facilities

// Reducer exports
export const { setFacility, deleteFacility } = facilitiesSlice.actions

// Slice export
export default facilitiesSlice.reducer