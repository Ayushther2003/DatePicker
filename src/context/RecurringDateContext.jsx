import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateRecurringDates } from '../utils/dateGenerators';

const RecurringDateContext = createContext();

export const useRecurringDate = () => {
  const context = useContext(RecurringDateContext);
  if (!context) throw new Error('Must be used within RecurringDateProvider');
  return context;
};

export const RecurringDateProvider = ({ children }) => {
  const [recurrenceType, setRecurrenceType] = useState('daily');
  const [interval, setInterval] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [monthlyPattern, setMonthlyPattern] = useState('date');
  const [weekdayOccurrence, setWeekdayOccurrence] = useState(1);
  const [generatedDates, setGeneratedDates] = useState([]);

  useEffect(() => {
    const dates = generateRecurringDates({
      recurrenceType,
      interval,
      selectedDays,
      startDate,
      endDate,
      monthlyPattern,
      weekdayOccurrence,
    });
    setGeneratedDates(dates);
  }, [
    recurrenceType,
    interval,
    selectedDays,
    startDate,
    endDate,
    monthlyPattern,
    weekdayOccurrence,
  ]);

  return (
    <RecurringDateContext.Provider
      value={{
        recurrenceType,
        setRecurrenceType,
        interval,
        setInterval,
        selectedDays,
        setSelectedDays,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        monthlyPattern,
        setMonthlyPattern,
        weekdayOccurrence,
        setWeekdayOccurrence,
        generatedDates,
      }}
    >
      {children}
    </RecurringDateContext.Provider>
  );
};

export default RecurringDateContext;
