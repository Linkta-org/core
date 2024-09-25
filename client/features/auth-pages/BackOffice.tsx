import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import style from '@styles/BackOffice.module.css';

import 'react-datepicker/dist/react-datepicker.css';

const BackOffice = () => {
  const today = new Date();
  const tomorrowMidnight = new Date(today);
  tomorrowMidnight.setDate(today.getDate() + 1);
  const [endDate, setEndDate] = useState(
    new Date(new Date(tomorrowMidnight).setHours(0, 0, 0, 0)),
  );
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );

  const startDateMs = startDate.getTime();
  const endDateMs = endDate.getTime();

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(endDateMs - startDateMs); // Use Math.abs to get a positive difference
  // Convert milliseconds to days
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceDays = Math.floor(differenceMs / millisecondsPerDay);

  useEffect(() => {
    if (startDate >= endDate) {
      alert('Start date must be before end date');
    }
    if (differenceDays > 30) {
      alert('Date range must be less than 30 days');
    }
  }, [startDate, endDate, differenceDays]);

  const shortDateString = (date: Date) => {
    return date.toISOString().split('T')[0].slice(2).split('-').join('');
  };

  const downloadLogs = async () => {
    if (differenceDays > 30) {
      alert('Date range must be less than 30 days');
      return;
    }
    await fetch('http://localhost:3000/v1/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate, endDate }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `linkta-logs_${shortDateString(startDate)}_${shortDateString(endDate)}.zip`,
        );
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      });
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1>Back Office</h1>
      {/* <h1>{startDate.toISOString()}</h1>
      <h1>{endDate.toISOString()}</h1> */}
      <label
        className={`${style.dateLabel}`}
        htmlFor='startDate'
      >
        Logs Start:
        <DatePicker
          className={`${style.datePicker}`}
          name='startDate'
          selected={startDate}
          onChange={(date) => date && setStartDate(date)}
        />
      </label>
      <label
        className={`${style.dateLabel}`}
        htmlFor='endDate'
      >
        Logs End:
        <DatePicker
          className={`${style.datePicker}`}
          name='endDate'
          selected={endDate}
          onChange={(date) => date && setEndDate(date)}
        />
      </label>

      <h4>Days: {differenceDays} (max: 30)</h4>

      <Button
        variant='contained'
        color='secondary'
        onClick={() => downloadLogs()}
      >
        Download Logs
      </Button>
    </Box>
  );
};

export default BackOffice;
