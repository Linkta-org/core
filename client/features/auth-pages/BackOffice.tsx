import React, { useState, useEffect, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import DatePicker from 'react-datepicker';
import style from '@styles/BackOffice.module.css';
import axiosClient from '@config/axios';
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

  const differenceDays = useMemo(() => {
    const startDateMs = startDate.getTime();
    const endDateMs = endDate.getTime();
    const differenceMs = Math.abs(endDateMs - startDateMs);
    return Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate >= endDate) {
      alert('Start date must be before end date');
    }
    if (differenceDays > 30) {
      alert('Date range must be less than 30 days');
    }
  }, [startDate, endDate, differenceDays]);

  const downloadLogs = async () => {
    if (differenceDays > 10) {
      alert('Date range must be less than 30 days');
      return;
    }

    const shortDateString = (date: Date) => {
      return date.toISOString().split('T')[0].slice(2).split('-').join('');
    };

    try {
      const response = await axiosClient.post(
        '/v1/logs',
        { startDate, endDate },
        { responseType: 'blob' },
      );

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `linkta-logs_${shortDateString(startDate)}_${shortDateString(endDate)}.zip`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h1>Back Office</h1>
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

      <h4>Days: {differenceDays} (max: 10)</h4>

      <Button
        variant='contained'
        color='secondary'
        onClick={() => downloadLogs()}
        disabled={differenceDays > 10}
      >
        Download Logs
      </Button>
    </Box>
  );
};

export default BackOffice;
