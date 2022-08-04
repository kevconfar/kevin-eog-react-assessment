import { configureStore } from '@reduxjs/toolkit';

import measurementsReducer from '../Features/measurementsSlice';

const store = configureStore({
  reducer: {
    measurements: measurementsReducer,
  },
});

export default store;
