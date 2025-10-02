export const intervals = [1, 2, 3, 4, 7, 14, 30];

export function getNextReviewDay(currentDay, success) {
  if (!success) return { currentDay: 0, nextDay: 1 };
  if (currentDay >= intervals.length - 1) {
    return { currentDay, nextDay: 30 };
  }
  return {
    currentDay: currentDay + 1,
    nextDay: intervals[currentDay + 1]
  };
}

export function getTodayISO() {
  return new Date().toISOString().split("T")[0];
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split("T")[0];
}