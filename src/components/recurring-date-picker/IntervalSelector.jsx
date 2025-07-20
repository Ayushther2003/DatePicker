import React from "react";
import {useRecurringDate } from "../../context/RecurringDateContext";

const IntervalSelector = () => {
  const { interval, setInterval, recurrenceType } = useRecurringDate();

  const getIntervalLabel = () => {
    switch (recurrenceType) {
      case 'daily': return 'day(s)';
      case 'weekly': return 'week(s)';
      case 'monthly': return 'month(s)';
      case 'yearly': return 'year(s)';
      default: return 'interval(s)';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Every</label>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          min="1"
          max="365"
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
          className="w-20 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="text-sm text-gray-600">{getIntervalLabel()}</span>
      </div>
    </div>
  );
};
export default IntervalSelector;