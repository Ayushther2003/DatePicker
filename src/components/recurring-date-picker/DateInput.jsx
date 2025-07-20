import React from "react";
const DateInput = ({ value, onChange, placeholder }) => {
  const formatDate = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const dateStr = e.target.value;
    if (dateStr) {
      onChange(new Date(dateStr));
    } else {
      onChange(null);
    }
  };

  return (
    <input
      type="date"
      value={formatDate(value)}
      onChange={handleChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};
export default DateInput;