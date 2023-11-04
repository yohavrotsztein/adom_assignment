import React from 'react';
// @mui
import { Box, Grid, Typography } from '@mui/material'
// state management
import { useAppSelector } from '../redux/hooks';
// components
import CityCard from './CityCard';
// assets
import emptySpace from '../assets/icons/empty_space.png';

// ----------------------------------------------------------------------

const Content = () => {

  const citiesSelection = useAppSelector((state) => state.city.citiesSelection);

  return (
    <Box>
      <Grid container rowSpacing={8} columnSpacing={2}>
        {
          citiesSelection.length === 0 ?
            <Box sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              <img src={emptySpace} alt="react logo" style={{
                height: '210px',
                width: '210px',
                opacity: '0.7',
              }} />
              <Typography variant="body2" component="div" sx={{ color: '#A19FBC', textAlign: 'center' }}>
                No cities selected
              </Typography>
            </Box>
            :
            citiesSelection.map((data, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CityCard data={data} />
              </Grid>
            ))
        }
      </Grid>
    </Box>
  );
}

export default Content;