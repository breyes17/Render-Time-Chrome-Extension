const timeLimit = document.getElementById("timeLimit");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const displayTimeStart = document.getElementById("start");
const displayTimeEnd = document.getElementById("end");
const displayRemainingTime = document.getElementById("remaining");
const MINUTES_PER_HOUR = 60;
const ZERO = 0;
const TWELVE = 12;

const triggerRenderedTime = (e) => {
  const currentTime = new Date();
  const estimatedTimeStart = new Date(currentTime);

  estimatedTimeStart.setHours(estimatedTimeStart.getHours() - hours.value * 1);
  estimatedTimeStart.setMinutes(
    estimatedTimeStart.getMinutes() - minutes.value * 1
  );

  const estimatedTimeEnd = new Date(estimatedTimeStart);
  estimatedTimeEnd.setHours(
    estimatedTimeStart.getHours() + timeLimit.value * 1
  );

  // display time
  displayTimeStart.innerText = displayTime(
    estimatedTimeStart.getHours(),
    estimatedTimeStart.getMinutes()
  );

  displayTimeEnd.innerText = displayTime(
    estimatedTimeEnd.getHours(),
    estimatedTimeEnd.getMinutes()
  );

  const remainingTime = processRemainingTime();

  displayRemainingTime.innerText = remainingTime.message
    ? remainingTime.message
    : `${pad(remainingTime.hours)}:${pad(remainingTime.minutes)}`;
};

const pad = (text, limit = 2) => {
  const displayText = text.toString();
  return displayText.length < limit
    ? pad(`0${displayText}`, limit)
    : displayText;
};

const displayTime = (hours, minutes) => {
  const isPM = hours >= TWELVE;
  const moduloTwelve = hours % TWELVE;
  const displayHour = moduloTwelve === ZERO ? TWELVE : moduloTwelve;
  return `${pad(displayHour)}:${pad(minutes)} ${isPM ? "PM" : "AM"}`;
};

const timeElements = document.getElementsByClassName("time");

for (const element of timeElements) {
  element.addEventListener("change", triggerRenderedTime);
}

const convertHoursToMinutes = (hours, minutes = 0) => {
  const toMinutes = hours * MINUTES_PER_HOUR;
  return toMinutes + minutes;
};

const convertMinutesToHours = (minutes) => {
  return {
    hours: Math.trunc(minutes / MINUTES_PER_HOUR),
    minutes: minutes % MINUTES_PER_HOUR,
  };
};

const processRemainingTime = () => {
  const limit = convertHoursToMinutes(timeLimit.value * 1);
  const rendered = convertHoursToMinutes(hours.value * 1, minutes.value * 1);
  const timeRemaining = limit - rendered;

  let output = {
    message: null,
    hours: ZERO,
    minutes: ZERO,
  };

  if (timeRemaining === ZERO) {
    return { ...output, message: "Time End. Take a rest" };
  }

  if (timeRemaining < ZERO) {
    return { ...output, message: "Overtime!" };
  }

  return {
    ...output,
    hours: convertMinutesToHours(timeRemaining).hours,
    minutes: convertMinutesToHours(timeRemaining).minutes,
  };
};
