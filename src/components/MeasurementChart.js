/* eslint-disable */
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { selectChosenMetrics, selectMetricMeasurements } from '../Features/measurementsSlice';

export default function MeasurementChart() {
  const selectedMetrics = useSelector(selectChosenMetrics);
  const selectedMeasurements = useSelector(selectMetricMeasurements);

  const output = [];
  for (let i = 0; i < 1383; i += 1) {
    if (selectedMetrics.length > 0) {
      const obj = {};
      const x = selectedMeasurements[selectedMetrics[0]][i];
      for (const k in x) {
        obj.at = moment(x.at).format('LT');
        for (let n = 0; n < selectedMetrics.length; n += 1) {
          if (selectedMeasurements[selectedMetrics[n]][i]) {
            obj[selectedMetrics[n]] = selectedMeasurements[selectedMetrics[n]][i].value;
          }
        }
      }
      output.push(obj);
    }
  }

  const colors = ['#8884d8', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af'];
  const units = {
    waterTemp: 'F', oilTemp: 'F', flareTemp: 'F', casingPressure: 'psi', tubingPressure: 'psi', injValveOpen: '%',
  };

  const lines = selectedMetrics.map((m, i) => <Line yAxisId={units[m]} type="monotone" dataKey={`${m}`} key={`${m}`} strokeOpacity="1" stroke={colors[i]} activeDot={{ r: 8 }} />);

  return (
    <div style={{ marginLeft: '10%' }}>
      <ResponsiveContainer width="90%" height={400}>
        <LineChart data={output} width={500} height={300}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="at"
            padding={{ left: 30, right: 30 }}
            allowDataOverflow
          />
          <YAxis
            domain={[-50, 'auto']}
            yAxisId="F"
            orientation="left"
            tickCount={10}
            allowDataOverflow
            label={{
              value: '℉', angle: '-90', position: 'insideLeft', dy: '-30',
            }}
          />
          <YAxis label={{ value: 'PSI', angle: '90', position: 'outsideLeft' }} yAxisId="psi" orientation="right" domain={['auto', 'auto']} />
          <YAxis label={{ value: '%', angle: '90', position: 'outsideRight' }} yAxisId="%" orientation="right" domain={['auto', 'auto']} />

          <Tooltip />
          <Legend />
          {lines}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
/* eslint-enable */
