import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  useQuery,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { selectChosenMetrics, setMetricMeasurements } from './measurementsSlice';

const client = new ApolloClient({
  uri: 'https://react-assessment.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

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

const Measurements = () => {
  const selectedMetrics = useSelector(selectChosenMetrics);
  const metrics = selectedMetrics.map((x) => ({ metricName: x }));

  const dispatch = useDispatch();
  const { loading, error, data } = useQuery(GET_MEASUREMENTS, {
    variables: { metrics },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;
  const { getMultipleMeasurements } = data;

  if (getMultipleMeasurements) {
    dispatch(setMetricMeasurements({ measurements: getMultipleMeasurements }));
  }

  return (
    <div style={{ color: 'black' }} />
  );
};

export default () => (
  <ApolloProvider client={client}>
    <Measurements />
  </ApolloProvider>
);
