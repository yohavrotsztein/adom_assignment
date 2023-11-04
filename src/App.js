import React, { useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';
// components
import Header from './components/Header';
import Content from './components/Content'
// state management
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { getCityWeather } from './redux/city';
// hooks
import useGeolocation from './hooks/useGeolocation';

// ----------------------------------------------------------------------

const App = () => {

  const dispatch = useAppDispatch();
  useGeolocation();

  const currentLocation = useAppSelector((state) => state.city.currentLocation);

  const getCurrentWeather = async (location) => {
    try {
      const response = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_ACCUWEATHER_KEY}&q=${location}`)
      dispatch(getCityWeather({
        locationKey: response.data.Key,
        cityName: response.data.LocalizedName,
        countryName: response.data.Country.LocalizedName,
      }))
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (currentLocation) {
      getCurrentWeather(currentLocation)
    }
  }, [currentLocation])

  return (
      <Container sx={{ p: 2, maxWidth: 'none !important' }}>
        <Header />
        <Content />
      </Container>
  );
}

export default App;
