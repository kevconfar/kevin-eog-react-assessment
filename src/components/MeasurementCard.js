import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function MeasurementCard({ name, data }) {
  return (
    <Card style={{
      width: '150px', display: 'flex', justifyContent: 'center', margin: '5px',
    }}
    >
      <CardContent>
        <Typography style={{ marginLeft: 'auto', marginRight: 'auto' }} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          {data}
        </Typography>
      </CardContent>
    </Card>
  );
}
