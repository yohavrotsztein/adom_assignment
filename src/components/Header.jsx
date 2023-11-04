import React, { useEffect, useState } from 'react';
// state management
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getCity, getCityWeather } from '../redux/city';
// @mui
import { TextField, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// ----------------------------------------------------------------------

const SearchBarStyle = {
  width: '100%',
  borderRadius: '15px',
  marginBottom: '30px',
  boxShadow: '0px 4px 4px 0px #00000040 inset',
  border: 'none',
  "& fieldset": { border: 'none' },
  '&.MuiAutocomplete-root': {
    backgroundColor: '#262246',
  },
};

// ----------------------------------------------------------------------

const Header = () => {

  const results = useAppSelector((state) => state.city.results);
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const handleDebouncedInputChange = (newValue) => {
    setDebouncedValue(newValue);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (debouncedValue.length >= 2) {
        dispatch(getCity(debouncedValue));
      } else {
        dispatch(getCity(''));
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [debouncedValue]);

  const handleChange = (event, newValue) => {
    setInputValue(newValue);
    handleDebouncedInputChange(newValue);
  };

  const handleAddCities = (newValue) => {
    dispatch(getCityWeather({
      locationKey: results.find((option) => option.LocalizedName === newValue)?.Key,
      cityName: results.find((option) => option.LocalizedName === newValue)?.LocalizedName,
      countryName: results.find((option) => option.LocalizedName === newValue)?.Country.LocalizedName,
    }));
  };

  return (
    <Autocomplete
      variant="standard"
      freeSolo
      inputValue={inputValue}
      onInputChange={handleChange}
      options={results ? results.map((option) => option.LocalizedName) : []}
      onChange={(event, newValue) => handleAddCities(newValue)}
      renderInput={(params) =>
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: <SearchIcon sx={{ color: '#A19FBC' }} />,
          }}
          sx={{ input: { color: 'white' } }}
          placeholder="Search for a city or airport"
          InputLabelProps={{
            style: { color: '#A19FBC' },
          }} />}
      sx={SearchBarStyle}
    />
  )
}

export default Header;