/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

import { gql, useLazyQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import {
  setChosenMetrics, setMetricMeasurements,
} from '../Features/measurementsSlice';

const metricsList = [
  'waterTemp',
  'casingPressure',
  'tubingPressure',
  'injValveOpen',
  'oilTemp',
  'flareTemp',
];

const searchStyle = {
  width: '30%', marginLeft: 'auto', marginRight: '10px', marginTop: '10px',
};

const GET_MEASUREMENTS = gql`
    query($metrics: [MeasurementQuery]){
      getMultipleMeasurements(input: $metrics) {
        metric
        measurements {
          at
          value
          unit
        }
      }
    }
  `;

export default function MetricSelector() {
  const dispatch = useDispatch();

  const [getMeasurements, { loading, error, data }] = useLazyQuery(GET_MEASUREMENTS);

  if (error) return <Typography color="error">{error}</Typography>;

  const handleChange = (metric) => {
    dispatch(setChosenMetrics({ metric }));
    const before = new Date().valueOf();
    const after = before - 1800000;
    const metrics = metric.map((metricName) => ({ metricName, before, after }));
    getMeasurements({ variables: { metrics } });
  };

  useEffect(() => {
    if (data) {
      const { getMultipleMeasurements } = data;

      if (getMultipleMeasurements !== undefined) {
        dispatch(setMetricMeasurements({ getMultipleMeasurements }));
      }
    }
  }, [loading]);

  return (
    <Autocomplete
      multiple
      style={searchStyle}
      filterSelectedOptions
      id="tags-standard"
      options={metricsList}
      onChange={(e, value) => handleChange(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          placeholder='Select...'
        />
      )}
    />
  );
}
