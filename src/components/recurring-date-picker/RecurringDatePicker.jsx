import React from "react";
import { useEffect } from "react";
import { Calendar, X } from 'lucide-react';
import { useRecurringDate } from "../../context/RecurringDateContext";
import RecurrenceTypeSelector from "./RecurrenceTypeSelector";
import IntervalSelector from "./IntervalSelector";
import DaysOfWeekSelector from "./DaysOfWeekSelector";
import MonthlyPatternSelector from "./MonthlyPatternSelector";
import DateInput from "./DateInput";
import MiniCalendarPreview from "./MiniCalendarPreview";

const RecurringDatePicker = ({ onDateChange }) => {
  const { startDate, setStartDate, endDate, setEndDate, generatedDates } = useRecurringDate();

  useEffect(() => {
    if (onDateChange) {
      onDateChange(generatedDates);
    }
  }, [generatedDates, onDateChange]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold text-gray-800">Recurring Date Picker</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column - Settings */}
        <div className="space-y-4">
          <RecurrenceTypeSelector />
          <IntervalSelector />
          <DaysOfWeekSelector />
          <MonthlyPatternSelector />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <DateInput
              value={startDate}
              onChange={setStartDate}
              placeholder="Select start date"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
            <div className="flex items-center space-x-2">
              <DateInput
                value={endDate}
                onChange={setEndDate}
                placeholder="Select end date"
              />
              {endDate && (
                <button
                  onClick={() => setEndDate(null)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Preview */}
        <div>
          <MiniCalendarPreview />
        </div>
      </div>
    </div>
  );
};
export default RecurringDatePicker;