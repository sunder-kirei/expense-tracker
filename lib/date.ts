export function normalizeDate(date: Date) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

export function getDate(date: Date) {
  return date.toUTCString();
}
