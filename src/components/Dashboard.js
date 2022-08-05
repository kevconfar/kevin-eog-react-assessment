import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { gql } from '@apollo/client';
import { useSubscription } from '@apollo/react-hooks';

import { Typography } from '@material-ui/core';
import {
  selectChosenMetrics,
  setNewMetricMeasurement,
} from '../Features/measurementsSlice';

import MeasurementCard from './MeasurementCard';

const MEASUREMENTS_SUBSCRIPTION = gql`
    subscription {
      newMeasurement {
        metric
        at
        value
        unit
      }
    }
  `;

export default function Dashboard() {
  const { data, error, loading } = useSubscription(MEASUREMENTS_SUBSCRIPTION);

  if (error) return <Typography color="error">{error}</Typography>;

  const selectedMetrics = useSelector(selectChosenMetrics);

  const [current, setCurrent] = useState({
    oilTemp: '',
    waterTemp: '',
    casingPressure: '',
    tubingPressure: '',
    flareTemp: '',
    injValveOpen: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (data !== undefined && selectedMetrics.length > 0) {
      if (selectedMetrics.includes(data.newMeasurement.metric)) {
        setCurrent(prevState => ({
          ...prevState,
          [data.newMeasurement.metric]: `${data.newMeasurement.value} ${data.newMeasurement.unit}`,
        }));
        dispatch(setNewMetricMeasurement({ measurement: data.newMeasurement }));
      }
    }
  }, [loading, data]);

  // eslint-disable-next-line max-len
  const cards = selectedMetrics.map((metric) => <MeasurementCard name={metric} data={current[metric]} />);

  return (
    <div>
      {cards}
    </div>
  );
}
