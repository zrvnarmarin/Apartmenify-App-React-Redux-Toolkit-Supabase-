import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';
import { v4 } from 'uuid';

const APARTMENTS_GET_URL = 'https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json'
const APARTMENTS_POST_URL = 'https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments.json'

export const fetchApartments = createAsyncThunk('apartments/fetchApartments', async () => {
    try {
        const response = await axios.get(APARTMENTS_GET_URL)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const addApartment = createAsyncThunk('apartments/addApartment', async (newApartment) => {
    try {
        const response = await axios.post(APARTMENTS_POST_URL, newApartment)
        return response.data
    } catch (error) {
        return error.message
    }
})

export const deleteApartment = createAsyncThunk('apartments/deleteApartment', async (id) => {
    try {
        const response = await axios.delete(`https://apartments-app-6a66f-default-rtdb.firebaseio.com/apartments/${id}.json`)  
        return id
        
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
    sortOptions: [
        { label: 'Id', value: 'id'},
        { label: 'Price', value: 'price'},
        { label: 'Rooms', value: 'rooms'}
    ],
    filter: '',
    filterQuery: '',
    filterOptions: [
        { label: 'All', value: 'all'},
        { label: 'City', value: 'city'},
        { label: 'Address', value: 'address'},
        { label: 'Title', value: 'title'},
    ],
    newFacility: '',
    facilityGroups: []
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
        setFacilityGroups: (state, action) => {
            const newFacilities = action.payload

            // Calculate the facility groups from the existing apartments
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

            // Concatinating new facilities to an existing ones
            state.facilityGroups = facilityGroups.concat(newFacilities)
            console.log(state.facilityGroups)
        },
        deleteFacilityGroup: (state, action) => {
            const filteredFacilityGroups = state.facilityGroups.filter(group => group.id !== action.payload)
            state.facilityGroups = filteredFacilityGroups
            console.log(state.facilityGroups)
        }
          
    },
    extraReducers(builder) {
        builder
        .addCase(fetchApartments.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchApartments.fulfilled, (state, action) => {
            state.status = 'successed';

            let min = 1;
            let loadedApartments = []

            for (let key in action.payload) {
                loadedApartments.push({
                    address: action.payload[key].address,
                    description: action.payload[key].description,
                    distanceFromTheSea: action.payload[key].distanceFromTheSea,
                    doubleBeds: action.payload[key].doubleBeds,
                    singleBeds: action.payload[key].singleBeds,
                    id: key,
                    status: action.payload[key].status,
                    title: action.payload[key].title,
                    city: action.payload[key].city,
                    rooms: action.payload[key].rooms,
                    price: action.payload[key].price,
                    facilities: action.payload[key].facilities,
                    date: sub(new Date(), { minutes: min++ }).toISOString()
                })
            }

            state.apartments = loadedApartments;
        })
        .addCase(fetchApartments.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addApartment.fulfilled, (state, action) => {
            state.apartments.push(action.payload)
            state.status = 'idle'
            state.error = null
        })
        .addCase(deleteApartment.fulfilled, (state, action) => {
            state.apartments = state.apartments.filter(apartment => apartment.id !== action.payload)
            
            console.log(action.payload)
            console.log(state.apartments.length)
        })
    }
})


// Exports 
export const selectAllApartments = (state) => state.apartments.apartments
export const getApartmentsStatus = (state) => state.apartments.status
export const getApartmentsError = (state) => state.apartments.error

export const getSort = (state) => state.apartments.sort
export const getSortOptions = (state) => state.apartments.sortOptions
export const getSortOrder = (state) => state.apartments.sortOrder

export const getFilter = (state) => state.apartments.filter
export const getFilterOptions = (state) => state.apartments.filterOptions
export const getFilterQuery = (state) => state.apartments.filterQuery

export const getNewFacility = (state) => state.apartments.newFacility
export const getFacilityGroups = (state) => state.apartments.facilityGroups


export const { setSort, setSortOrder, setFilter, setFilterQuery, setNewFacility, setFacilityGroups, deleteFacilityGroup } = apartmentsSlice.actions

  

export default apartmentsSlice.reducer