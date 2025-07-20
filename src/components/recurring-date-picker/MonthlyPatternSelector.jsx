import React from "react";
import { useRecurringDate } from "../../context/RecurringDateContext";

const MonthlyPatternSelector = () => {
  const { monthlyPattern, setMonthlyPattern, weekdayOccurrence, setWeekdayOccurrence, recurrenceType, startDate } = useRecurringDate();

  if (recurrenceType !== 'monthly') return null;

  const occurrences = [
    { value: 1, label: '1st' },
    { value: 2, label: '2nd' },
    { value: 3, label: '3rd' },
    { value: 4, label: '4th' },
    { value: 5, label: 'Last' }
  ];

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Monthly Pattern</label>
      
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="date"
            checked={monthlyPattern === 'date'}
            onChange={(e) => setMonthlyPattern(e.target.value)}
            className="text-blue-500"
          />
          <span className="text-sm">On day {startDate.getDate()}</span>
        </label>
        
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="weekday"
            checked={monthlyPattern === 'weekday'}
            onChange={(e) => setMonthlyPattern(e.target.value)}
            className="text-blue-500"
          />
          <span className="text-sm">On the</span>
        </label>
      </div>

      {monthlyPattern === 'weekday' && (
        <div className="ml-6 flex items-center space-x-2">
          <select
            value={weekdayOccurrence}
            onChange={(e) => setWeekdayOccurrence(parseInt(e.target.value))}
            className="p-1 border border-gray-300 rounded text-sm"
          >
            {occurrences.map(occ => (
              <option key={occ.value} value={occ.value}>
                {occ.label}
              </option>
            ))}
          </select>
          <span className="text-sm">{weekdays[startDate.getDay()]}</span>
        </div>
      )}
    </div>
  );
};
export default MonthlyPatternSelector;