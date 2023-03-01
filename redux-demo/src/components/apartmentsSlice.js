import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 } from 'uuid';
import supabase from '../supabaseClient';

export const addFacilityGroups = createAsyncThunk('apartments/addFacilityGroups', async (facilityGroups) => {
    try {
        const response = await axios.post('https://apartments-app-6a66f-default-rtdb.firebaseio.com/facilityGroups.json', facilityGroups)
        console.log(response.data, 'add facility thunk')
        return response.data
    } catch (error) {
        return error.message
    }
})

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
        console.log(newApartment, 'ovo je payload iz add new apartmana')
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
    sort: '',
    sortOrder: 'ascending',
    filter: '',
    filterQuery: '',
    filterOptions: [
        { label: 'All', value: 'all'},
        { label: 'City', value: 'city'},
        { label: 'Address', value: 'address'},
        { label: 'Title', value: 'title'},
    ],
    newFacility: '',
    existingFacilityGroups: [],
    facilities: []
}

const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        setSort: (state, action) => {
            state.sort = action.payload
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setFilterQuery: (state, action) => {
            state.filterQuery = action.payload
        },
        setNewFacility: (state, action) => {
            state.newFacility = action.payload
        },
        setExistingFacilityGroups: (state, action) => {
            const facilityGroupsObject = state.apartments
              .map(apartment => apartment.facilities)
              .reduce((acc, curr) => acc.concat(curr), [])
              .reduce((acc, curr) => {
                acc[curr.value] = (acc[curr.value] || 0) + 1;
                return acc;
              }, {});

            // Set up existing facilities object as an array
            const facilityGroups = Object.keys(facilityGroupsObject).map(key => {
              return {
                id: v4(),
                name: key,
                count: facilityGroupsObject[key]
              };
            });

            state.existingFacilityGroups = facilityGroups
        },
        updateExistingFacilitygroups: (state, action) => {
            const newFacilities = action.payload

            state.existingFacilityGroups = state.existingFacilityGroups.concat(newFacilities)
            console.log(state.existingFacilityGroups)
        }
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
            console.log(action.payload)
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

export const getSort = (state) => state.apartments.sort
export const getSortOrder = (state) => state.apartments.sortOrder

export const getFilter = (state) => state.apartments.filter
export const getFilterOptions = (state) => state.apartments.filterOptions
export const getFilterQuery = (state) => state.apartments.filterQuery

export const selectFacilities = (state) => state.apartments.facilities // povlači sa supabse-a

export const getNewFacility = (state) => state.apartments.newFacility

export const getExistingFacilityGroups = (state) => state.apartments.existingFacilityGroups

export const { setSort, setSortOrder, setFilter, setFilterQuery, setNewFacility, setExistingFacilityGroups, updateExistingFacilitygroups } = apartmentsSlice.actions


export default apartmentsSlice.reducer