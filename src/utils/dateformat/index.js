
export function correctDate(date) {
  const fecha = new Date(date);
  return new Date(fecha.getTime() + (fecha.getTimezoneOffset() * 60000));
}

export function correctDateToUTC(date) {
  if (date && date instanceof Date) {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return new Date(date.getTime());
  }
  return null;
}
