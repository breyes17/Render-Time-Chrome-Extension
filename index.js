const timeLimit = document.getElementById("timeLimit");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const displayTimeStart = document.getElementById("start");
const displayTimeEnd = document.getElementById("end");
const displayRemainingTime = document.getElementById("remaining");

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

  const remainingTime = new Date(estimatedTimeEnd);
  remainingTime.setHours(timeLimit.value - hours.value * 1);

  // display time
  displayTimeStart.innerText = displayTime(
    estimatedTimeStart.getHours(),
    estimatedTimeStart.getMinutes()
  );

  displayTimeEnd.innerText = displayTime(
    estimatedTimeEnd.getHours(),
    estimatedTimeEnd.getMinutes()
  );

  console.log(remainingTime.getHours());
  const isDisplayRemaningTime =
    remainingTime.getHours() === 0 ||
    remainingTime.getHours() < timeLimit.value;

  displayRemainingTime.innerText = isDisplayRemaningTime
    ? `${pad(remainingTime.getHours())}:${pad(remainingTime.getMinutes())}`
    : "Over time!";
};

const pad = (text, limit = 2) => {
  const displayText = text.toString();
  return displayText.length < limit
    ? pad(`0${displayText}`, limit)
    : displayText;
};

const displayTime = (hours, minutes) => {
  const isPM = hours >= 12;
  const moduloTwelve = hours % 12;
  const displayHour = moduloTwelve === 0 ? 12 : moduloTwelve;
  return `${pad(displayHour)}:${pad(minutes)} ${isPM ? "PM" : "AM"}`;
};

const timeElements = document.getElementsByClassName("time");

for (const element of timeElements) {
  element.addEventListener("change", triggerRenderedTime);
}
