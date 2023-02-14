import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

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
    error: null
}

const apartmentsSlice = createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        
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


// Calculated derived values
export const selectFacilityOccurences = createSelector(
    (state => state.apartments.apartments),
    (apartments) => {
        const facilityGroupsObject = apartments
        .map(apartment => apartment.facilities)
        .reduce((acc, curr) => acc.concat(curr), [])
        .reduce((acc, curr) => {
            acc[curr.value] = (acc[curr.value] || 0) + 1;
            return acc;
        }, {})

        let facilityGroups = []

        for (let key in facilityGroupsObject) {
            facilityGroups.push({
                facility: key,
                occurredTimes: facilityGroupsObject[key]
            })
        }

        return facilityGroups;
    }
);

// Exports 
export const selectAllApartments = (state) => state.apartments.apartments
export const getApartmentsStatus = (state) => state.apartments.status
export const getApartmentsError = (state) => state.apartments.error



  

export default apartmentsSlice.reducer