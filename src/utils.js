export const kelvin2Celcius = kelvin => kelvin - 273.15;

export const meterPerS2KmPerHour = mps => mps * 3.6;

export const to2Digits = floatingPointNumber =>
  Math.trunc(floatingPointNumber * 100) / 100;

export const toNoDigits = floatingPointNumber =>
  parseInt(floatingPointNumber, 10);

export const to12HourClock = time =>
  new Date(time * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

export const weekdayMonthDay = time =>
  new Date(time * 1000)
    .toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
    })
    .split(" ")
    .join("\u00A0");
