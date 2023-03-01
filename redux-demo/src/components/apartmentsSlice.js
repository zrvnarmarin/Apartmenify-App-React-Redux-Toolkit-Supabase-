import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 } from 'uuid';
import supabase from '../supabaseClient';

//Supabase 
export const getAllApartments = createAsyncThunk('apartments/getAllApartments', async () => {
    try {
    const { data, error } = await supabase
    .from('apartments')
    .select()

    return data
    } catch (error) {
        return error.message
    }
})

export const getApartment = createAsyncThunk('apartments/getApartment', async id => {
    try {
        const { data, error } = await supabase
        .from('apartments')
        .select()
        .eq('id', id)

        return data

    } 
    catch (error) { return error.message }
})

export const addApartment = createAsyncThunk('apartments/addApartment', async newApartment => {
    try {
        // console.log(newApartment, 'ovo je payload iz add new apartmana')
        const { data, error } = await supabase
            .from('apartments')
            .insert([
                { 
                    title: newApartment.title, 
                    description: newApartment.description, 
                    rooms: newApartment.rooms, 
                    facilities: newApartment.facilities,
                    city: newApartment.city,
                    address: newApartment.address,
                    singleBeds: newApartment.singleBeds,
                    doubleBeds: newApartment.doubleBeds,
                    distanceFromTheSea: newApartment.distanceFromTheSea,
                    price: newApartment.price
                }
            ])
            .single()

            return newApartment
    } 
    catch (error) { return error.message }
})

export const deleteTestApartment = createAsyncThunk('apartments/deleteApartment', async id => {
    try {
        const { data, error } = await supabase
        .from('apartments')
        .delete()
        .eq('id', id)

        return id
    } 
    catch (error) { return error.message }
})

export const getAllFacilities = createAsyncThunk('apartments/getAllFacilities', async () => {
    try {
        const { data, error } = await supabase
        .from('facilities')
        .select()

        const allFacilities = data.map(facility => ({ value: facility.name, label: facility.name }))
    
        return allFacilities
    } catch (error) {
        return error.message
    }
})

const initialState = {
    apartments: [],
    status: 'idle',
    error: null,
    filter: '',
    filterQuery: '',
    filterOptions: [
        { label: 'All', value: 'all'},
        { label: 'City', value: 'city'},
        { label: 'Address', value: 'address'},
        { label: 'Title', value: 'title'},
    ],
    newFacility: '',
    facilities: []
}

const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload
        },
        setNewFacility: (state, action) => {
            state.newFacility = action.payload
        },
    },
    extraReducers(builder) {
        builder
        // SUPABASE: 
        .addCase(getAllApartments.fulfilled, (state, action) => {
            state.apartments = action.payload;
            state.status = 'successed';
        })
        .addCase(getApartment.fulfilled, (state, action) => {
            console.log(action.payload)
        })
        .addCase(addApartment.fulfilled, (state, action) => {
            // console.log(action.payload)
            state.apartments.push(action.payload)
            state.status = 'idle'
            state.error = null
        })
        .addCase(deleteTestApartment.fulfilled, (state, action) => {
            state.apartments = state.apartments.filter(apartment => apartment.id !== action.payload)
        })
        .addCase(getAllFacilities.fulfilled, (state, action) => {
            state.facilities = action.payload
        })
    }
})


// Exports 
export const selectAllApartments = (state) => state.apartments.apartments
export const getApartmentsStatus = (state) => state.apartments.status
export const getApartmentsError = (state) => state.apartments.error

export const getFilter = (state) => state.apartments.filter
export const getFilterOptions = (state) => state.apartments.filterOptions
export const getFilterQuery = (state) => state.apartments.filterQuery

export const selectFacilities = (state) => state.apartments.facilities // povlači sa supabse-a

export const getNewFacility = (state) => state.apartments.newFacility

export const { setFilter, setFilterQuery, setNewFacility } = apartmentsSlice.actions


export default apartmentsSlice.reducer