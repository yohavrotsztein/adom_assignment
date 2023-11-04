import React, { useEffect, useState } from 'react'
// state management
import { useAppDispatch } from '../redux/hooks';
import { addCurrentLocation } from '../redux/city';

// ----------------------------------------------------------------------

const useGeolocation = () => {

  const dispatch = useAppDispatch();

  const onSuccess = (location) => {
   dispatch(addCurrentLocation(`${location.coords.latitude},${location.coords.longitude}`))
  }

  const onError = (error) => {
    console.log(error)
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

}

export default useGeolocation