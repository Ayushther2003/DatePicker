import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecurringDate } from "../../context/RecurringDateContext";

const MiniCalendarPreview = () => {
  const { generatedDates } = useRecurringDate();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isDateGenerated = (date) => {
    if (!date) return false;
    return generatedDates.some(genDate => 
      genDate.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(prev.getMonth() + direction);
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Preview</label>
      
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h3 className="text-lg font-semibold">
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`text-center p-2 text-sm ${
                day
                  ? isDateGenerated(day)
                    ? 'bg-blue-500 text-white rounded-full'
                    : 'hover:bg-gray-100 rounded'
                  : ''
              }`}
            >
              {day ? day.getDate() : ''}
            </div>
          ))}
        </div>

        {/* Generated dates list */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Next {Math.min(generatedDates.length, 5)} occurrences:
          </h4>
          <div className="space-y-1">
            {generatedDates.slice(0, 5).map((date, index) => (
              <div key={index} className="text-sm text-gray-600">
                {date.toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MiniCalendarPreview;