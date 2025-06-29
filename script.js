let startTime = 0;
let elapsedTime = 0;
let interval;
let isRunning = false;

const timeDisplay = document.getElementById("time-display");
const lapList = document.getElementById("lap-list");

document.getElementById("start").addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 100);
    isRunning = true;
  }
});

document.getElementById("pause").addEventListener("click", () => {
  if (isRunning) {
    clearInterval(interval);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(interval);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00";
  lapList.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
  if (isRunning) {
    const lapTime = formatTime(Date.now() - startTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
    lapList.appendChild(li);
  }
});

function updateTime() {
  const currentTime = Date.now() - startTime;
  timeDisplay.textContent = formatTime(currentTime);
}

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  let seconds = String(totalSeconds % 60).padStart(2, "0");
  let hundredths = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${hundredths}`;
}
