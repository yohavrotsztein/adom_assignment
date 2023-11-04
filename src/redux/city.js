import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ----------------------------------------------------------------------

const initialState = {
  citiesSelection: [],
  results: [],
  currentLocation: null,
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {

    // ADD CITIES
    addCities: (state, action) => {
      state.citiesSelection.push(action.payload);
    },

    // ADD CURRENT LOCATION
    addCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
      state.localisation = true;
    },

  },
  extraReducers: builder => {
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.results = action.payload;
    });
    builder.addCase(getCityWeather.fulfilled, (state, action) => {
      state.citiesSelection.push(action.payload);
    });
  },
});

// ----------------------------------------------------------------------

export default citySlice.reducer;

// Actions
export const { addCities, addCurrentLocation } = citySlice.actions;

export const getCity = createAsyncThunk('city/getCity', async search => {
  if (search.length >= 2) {
    const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&q=${search}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    return response.data;
  } else {
    return [];
  }
});

export const getCityWeather = createAsyncThunk('city/getCityWeather', async ({ locationKey, cityName, countryName }) => {
  const response = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&details=true`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const weatherData = response.data;
  return {
    countryName,
    cityName,
    weatherData,
  };
});