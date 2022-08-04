import { createSlice } from '@reduxjs/toolkit';

export const measurementsSlice = createSlice({
  name: 'measurements',
  initialState: {
    chosenMetrics: [],
    metricMeasurements: {
      oilTemp: [],
      waterTemp: [],
      casingPressure: [],
      tubingPressure: [],
      flareTemp: [],
      injValveOpen: [],
    },
  },
  reducers: {
    setChosenMetrics: (state, action) => {
      state.chosenMetrics = action.payload.metric;
    },
    setMetricMeasurements: (state, action) => {
      for (let i = 0; i < action.payload.measurements.length; i += 1) {
        const { metric, measurements } = action.payload.measurements[i];
        state.metricMeasurements[metric] = measurements;
      }
    },
  },

});

export const { setChosenMetrics, setMetricMeasurements } = measurementsSlice.actions;

export const selectChosenMetrics = (state) => state.measurements.chosenMetrics;
export const selectMetricMeasurements = (state) => state.measurements.metricMeasurements;

export default measurementsSlice.reducer;
