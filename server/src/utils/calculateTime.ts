export default (startTime, endTime) => {
  const start = new Date("1970-01-01 " + startTime);
  const end = new Date("1970-01-01 " + endTime);

  const T = 60000;

  const rawStart = new Date(start).getTime() + 3600000;
  const rawEnd = new Date(end).getTime() + 3600000;

  if (start > end) return false;

  const break1S = rawStart + 180 * T;
  const break1E = break1S + 15 * T;
  const break2S = break1E + 120 * T;
  const break2E = break2S + 15 * T;

  const b1S = new Date(break1S);
  const b1E = new Date(break1E);
  const b2S = new Date(break2S);
  const b2E = new Date(break2E);

  const b1SHour = b1S.getHours() - 1;
  const b1SMinutes = b1S.getMinutes();
  const b1EHour = b1E.getHours() - 1;
  const b1EMinutes = b1E.getMinutes();

  const b2SHour = b2S.getHours() - 1;
  const b2SMinutes = b2S.getMinutes();
  const b2EHour = b2E.getHours() - 1;
  const b2EMinutes = b2E.getMinutes();

  const resB1 = {
    start: convert(b1SHour, b1SMinutes),
    end: convert(b1EHour, b1EMinutes),
  };
  const resB2 = {
    start: convert(b2SHour, b2SMinutes),
    end: convert(b2EHour, b2EMinutes),
  };

  return { b1: resB1, b2: resB2 };
};

function convert(hour, minutes) {
  const res =
    (hour < 10 ? "0" : "") +
    hour +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":00";

  return res;
}
