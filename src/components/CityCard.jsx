import React from 'react';
// libraries
import PropTypes from 'prop-types';
// @mui
import { Card, Stack, Typography, Box } from "@mui/material";

// ----------------------------------------------------------------------

const OverflowStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

const CardStyle = {
  background: 'linear-gradient(90deg, #5936B4 0%, #362A84 103.55%)',
  clipPath: "polygon(0% 0%, 100% 40%, 100% 100%, 0% 100%)",
  padding: '20px',
  paddingTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: 'white',
};

// ----------------------------------------------------------------------

const CityCard = ({ data }) => {

  const imageSource = require(`../assets/icons/${data.weatherData[0].WeatherIcon}.png`);

  if (data) {
    return (
      <div style={{ backgroundColor: 'none', padding: '10px', position: 'relative', height: '150px' }}>
        <Box style={{ position: 'absolute', bottom: '5px', right: '-10px', zIndex: 3, }}>
          <img src={imageSource} alt="logo" style={{ height: '210px', width: '210px' }} />
        </Box>
        <div style={{ filter: "url('#flt_tag')" }}>
          <Card sx={CardStyle}>
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2}>
                <Typography sx={{ fontWeight: '500', fontSize: '64px', }}>
                  {Math.trunc(data.weatherData[0].ApparentTemperature.Metric.Value)}°
                </Typography>
                <Stack direction="row" spacing={2} style={{ color: '#AEA3D8' }}>
                  <Typography variant="caption">
                    H: {Math.trunc(data.weatherData[0].TemperatureSummary.Past6HourRange.Maximum.Metric.Value)}°
                  </Typography>
                  <Typography variant="caption">
                    L: {Math.trunc(data.weatherData[0].TemperatureSummary.Past6HourRange.Minimum.Metric.Value)}°
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
              <Typography sx={{ ...OverflowStyle, fontSize: '18px' }}>
                {data.cityName}, {data.countryName}
              </Typography>
              <Typography sx={{ ...OverflowStyle, fontSize: '13px' }}>
                {data.weatherData[0].WeatherText}
              </Typography>
            </Stack>
          </Card>
          <svg xmlns="http://www.w3.org/2000/svg" style={{
            visibility: "hidden",
            position: "absolute",
            width: "0px",
            height: "0px"
          }}>
            <defs>
              <filter id="flt_tag">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="flt_tag" />
                <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
}

CityCard.propTypes = {
  data: PropTypes.object,
};

export default CityCard;