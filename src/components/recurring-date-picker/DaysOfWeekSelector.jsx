import React from "react";
import { useRecurringDate } from "../../context/RecurringDateContext";

const DaysOfWeekSelector = () => {
  const { selectedDays, setSelectedDays, recurrenceType } = useRecurringDate();

  if (recurrenceType !== 'weekly') return null;

  const days = [
    { value: 'sun', label: 'S' },
    { value: 'mon', label: 'M' },
    { value: 'tue', label: 'T' },
    { value: 'wed', label: 'W' },
    { value: 'thu', label: 'T' },
    { value: 'fri', label: 'F' },
    { value: 'sat', label: 'S' }
  ];

  const toggleDay = (day) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Days of Week</label>
      <div className="flex space-x-1">
        {days.map(day => (
          <button
            key={day.value}
            onClick={() => toggleDay(day.value)}
            className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
              selectedDays.includes(day.value)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};
export default DaysOfWeekSelector;