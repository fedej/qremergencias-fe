export function correctDate(date) {
  if (date && date instanceof Date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date;
  }
  return null;
}

export function correctDateToUTC(date) {
  if (date && date instanceof Date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date;
  }
  return null;
}
