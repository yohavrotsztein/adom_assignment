import { configureStore } from '@reduxjs/toolkit';
import cityReducer from './city';

const store = configureStore({
  reducer: {
    city: cityReducer,
  },
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState();
export default store;