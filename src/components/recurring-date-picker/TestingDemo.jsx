import React, { useState } from 'react';

import RecurringDatePicker from './RecurringDatePicker';
import { RecurringDateProvider } from '../../context/RecurringDateContext';


const TestingDemo = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <div className="space-y-6">
      <RecurringDateProvider>
        <RecurringDatePicker onDateChange={setSelectedDates} />
      </RecurringDateProvider>
      

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Test Results:</h3>
        <p className="text-sm text-gray-600">
          Generated {selectedDates.length} recurring dates
        </p>
      </div>
    </div>
  );
};

export default TestingDemo;
