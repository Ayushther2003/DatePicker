// utils/dateUtils.js

const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const findNextWeeklyOccurrence = (fromDate, days, intervalWeeks) => {
  const dayIndices = days.map(day => weekdays.indexOf(day));
  let current = new Date(fromDate);
  for (let i = 0; i < 7 * intervalWeeks; i++) {
    if (dayIndices.includes(current.getDay())) return current;
    current.setDate(current.getDate() + 1);
  }
  return null;
};

export const findNextMonthlyWeekdayOccurrence = (fromDate, occurrence) => {
  const targetWeekday = fromDate.getDay();
  const targetMonth = fromDate.getMonth();
  const targetYear = fromDate.getFullYear();
  const firstDay = new Date(targetYear, targetMonth, 1);
  const firstWeekday = firstDay.getDay();
  let targetDate;

  if (occurrence === 5) {
    const lastDay = new Date(targetYear, targetMonth + 1, 0);
    targetDate = new Date(lastDay);
    while (targetDate.getDay() !== targetWeekday) {
      targetDate.setDate(targetDate.getDate() - 1);
    }
  } else {
    const offset = (targetWeekday - firstWeekday + 7) % 7;
    targetDate = new Date(targetYear, targetMonth, 1 + offset + (occurrence - 1) * 7);
  }

  return targetDate;
};

export const generateRecurringDates = ({
  recurrenceType,
  interval,
  selectedDays,
  startDate,
  endDate,
  monthlyPattern,
  weekdayOccurrence,
}) => {
  const dates = [];
  const start = new Date(startDate);
  const endLimit = endDate || new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
  let current = new Date(start);

  while (current <= endLimit && dates.length < 50) {
    switch (recurrenceType) {
      case 'daily':
        dates.push(new Date(current));
        current.setDate(current.getDate() + interval);
        break;
      case 'weekly': {
        if (selectedDays.length === 0) {
          dates.push(new Date(current));
          current.setDate(current.getDate() + 7 * interval);
        } else {
          const next = findNextWeeklyOccurrence(current, selectedDays, interval);
          if (next && next <= endLimit) {
            dates.push(new Date(next));
            current = new Date(next);
            current.setDate(current.getDate() + 1);
          } else {
            current = new Date(endLimit.getTime() + 1);
          }
        }
        break;
      }
      case 'monthly': {
        if (monthlyPattern === 'date') {
          dates.push(new Date(current));
          current.setMonth(current.getMonth() + interval);
        } else {
          const next = findNextMonthlyWeekdayOccurrence(current, weekdayOccurrence);
          if (next && next <= endLimit) {
            dates.push(new Date(next));
            current = new Date(next);
            current.setMonth(current.getMonth() + 1);
          } else {
            current = new Date(endLimit.getTime() + 1);
          }
        }
        break;
      }
      case 'yearly':
        dates.push(new Date(current));
        current.setFullYear(current.getFullYear() + interval);
        break;
      default:
        break;
    }
  }

  return dates;
};
