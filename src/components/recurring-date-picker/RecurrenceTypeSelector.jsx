import React from "react";
import {useRecurringDate } from "../../context/RecurringDateContext";

const RecurrenceTypeSelector = () => {
  const { recurrenceType, setRecurrenceType } = useRecurringDate();

  const options = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Recurrence Type</label>
      <select
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RecurrenceTypeSelector;