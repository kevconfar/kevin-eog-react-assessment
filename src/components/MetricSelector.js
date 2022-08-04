import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { setChosenMetrics } from '../Features/measurementsSlice';

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

export default function MetricSelector() {
  const dispatch = useDispatch();
  const handleChange = (metric) => {
    dispatch(setChosenMetrics({ metric }));
  };

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
          /* eslint-disable */
          {...params}
          /* eslint-enable */
          variant="standard"
          placeholder='Select...'
        />
      )}
    />
  );
}
