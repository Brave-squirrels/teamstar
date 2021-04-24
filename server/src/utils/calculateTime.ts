export default (startTime, endTime) => {
  const start = new Date("1970-01-01 " + startTime);
  const end = new Date("1970-01-01 " + endTime);
  const result = new Date(Math.abs(end.getTime() - start.getTime()));
  const hour = result.getHours() - 1;
  const minutes = result.getMinutes();
  const time =
    (hour < 10 ? "0" : "") +
    hour +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":00";

  return time;
};
