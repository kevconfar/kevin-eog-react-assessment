import { createSlice } from '@reduxjs/toolkit';

export const measurementsSlice = createSlice({
  name: 'measurements',
  initialState: {
    chosenMetrics: [],
    unchosenMetrics: [],

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
      state.unchosenMetrics = ['oilTemp', 'waterTemp', 'casingPressure', 'tubingPressure', 'flareTemp', 'injValveOpen'].filter((x) => !state.chosenMetrics.includes(x));
      if (state.unchosenMetrics.length > 0) {
        for (let i = 0; i < state.unchosenMetrics.length; i += 1) {
          state.metricMeasurements[state.unchosenMetrics[i]] = [];
        }
      }
    },
    setMetricMeasurements: (state, action) => {
      action.payload.getMultipleMeasurements.forEach((x) => {
        const { metric, measurements } = x;
        state.metricMeasurements[metric] = measurements;
      });
    },
    setNewMetricMeasurement: (state, action) => {
      const { metric } = action.payload.measurement;
      state.metricMeasurements[metric].push(action.payload.measurement);
    },
  },

});

export const {
  setChosenMetrics,
  setMetricMeasurements,
  setNewMetricMeasurement,
} = measurementsSlice.actions;

export const selectChosenMetrics = (state) => state.measurements.chosenMetrics;
export const selectMetricMeasurements = (state) => state.measurements.metricMeasurements;

export default measurementsSlice.reducer;
