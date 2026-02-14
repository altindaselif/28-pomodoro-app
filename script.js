const modeButtons = document.querySelectorAll(".mode-button");
const progressBar = document.querySelector(".timer-circle-progress");
const timerDisplay = document.querySelector(".timer-display");
const timerButton = document.querySelector(".timer-button");
const settingsButton = document.querySelector(".settings-button");

const modalOverlay = document.querySelector(".modal-overlay");
const modalCloseButton = document.querySelector(".modal-close-button");
const modalForm = document.querySelector(".modal-form");

const pomodoroInput = document.getElementById("pomodoro-input");
const shortBreakInput = document.getElementById("short-break-input");
const longBreakInput = document.getElementById("long-break-input");
const arrowUpButtons = document.querySelectorAll(".arrow-up-button");
const arrowDownButtons = document.querySelectorAll(".arrow-down-button");
const fontInputs = document.querySelectorAll(".font-input");
const colorInputs = document.querySelectorAll(".color-input");

const alarmSound = new Audio("alarm.mp3");
const inputs = [pomodoroInput, shortBreakInput, longBreakInput];

const defaultSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  font: "kumbh",
  color: "red",
};

let currentSettings = { ...defaultSettings };

let timerState = {
  totalTime: currentSettings.pomodoro * 60,
  timeLeft: currentSettings.pomodoro * 60,
  activeMode: "pomodoro",
  isRunning: false,
  timerId: null,
};

let isPausedBySettings = false;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
};

const syncSettingsToForm = () => {
  pomodoroInput.value = currentSettings.pomodoro;
  shortBreakInput.value = currentSettings.shortBreak;
  longBreakInput.value = currentSettings.longBreak;

  fontInputs.forEach((input) => (input.checked = input.value === currentSettings.font));
  colorInputs.forEach((input) => (input.checked = input.value === currentSettings.color));
};

const setupArrowButton = (button, isUp) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const input = button.closest(".input-container").querySelector("input");
    isUp ? input.stepUp() : input.stepDown();
  });
};

const updateDisplay = () => {
  const formatedTime = formatTime(timerState.timeLeft);
  timerDisplay.textContent = formatedTime;
  document.title = `${formatedTime} - Pomodoro`;

  const totalLength = 880;
  const remainingPercentage = timerState.timeLeft / timerState.totalTime;
  const offset = totalLength - totalLength * remainingPercentage;

  progressBar.style.strokeDashoffset = offset;
};

const switchMode = (mode) => {
  timerState.isRunning = false;
  clearInterval(timerState.timerId);
  timerButton.textContent = "START";
  timerState.activeMode = mode;

  const settingsKey = mode.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const newTime = currentSettings[settingsKey];

  timerState.timeLeft = newTime * 60;
  timerState.totalTime = newTime * 60;

  updateDisplay();

  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.id === mode);
  });
};

const toggleTimer = () => {
  if (timerState.isRunning) {
    clearInterval(timerState.timerId);
    timerState.isRunning = false;
    timerButton.textContent = "START";

    alarmSound.pause();
    alarmSound.currentTime = 0;
  } else {
    if (timerState.timeLeft === 0) {
      timerState.timeLeft = timerState.totalTime;
      updateDisplay();
      alarmSound.pause();
      alarmSound.currentTime = 0;
    }

    timerState.isRunning = true;
    timerButton.textContent = "PAUSE";

    timerState.timerId = setInterval(() => {
      if (timerState.timeLeft > 0) {
        timerState.timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timerState.timerId);
        timerState.isRunning = false;
        timerButton.textContent = "RESTART";
        alarmSound.play();
      }
    }, 1000);
  }
};

const closeModal = () => {
  modalOverlay.classList.add("hidden");
  if (isPausedBySettings) {
    toggleTimer();
    isPausedBySettings = false;
  }
};

const applySettings = (e) => {
  e.preventDefault();

  currentSettings.pomodoro = parseInt(pomodoroInput.value);
  currentSettings.shortBreak = parseInt(shortBreakInput.value);
  currentSettings.longBreak = parseInt(longBreakInput.value);

  const selectedFont = Array.from(fontInputs).find((input) => input.checked)?.value;
  const selectedColor = Array.from(colorInputs).find((input) => input.checked)?.value;

  if (selectedFont) currentSettings.font = selectedFont;
  if (selectedColor) currentSettings.color = selectedColor;

  document.body.className = `font-${currentSettings.font} theme-${currentSettings.color}`;

  isPausedBySettings = false;
  switchMode(timerState.activeMode);
  modalOverlay.classList.add("hidden");
};

inputs.forEach((input) => {
  input.addEventListener("change", () => {
    let val = parseInt(input.value);
    const min = parseInt(input.min);
    const max = parseInt(input.max);

    if (isNaN(val) || val < min) {
      input.value = min;
    } else if (val > max) {
      input.value = max;
    }
  });
});

arrowUpButtons.forEach((btn) => setupArrowButton(btn, true));
arrowDownButtons.forEach((btn) => setupArrowButton(btn, false));

modeButtons.forEach((button) => {
  button.addEventListener("click", () => switchMode(button.id));
});

timerButton.addEventListener("click", toggleTimer);

settingsButton.addEventListener("click", () => {
  modalOverlay.classList.remove("hidden");

  if (timerState.isRunning) {
    toggleTimer();
    isPausedBySettings = true;
  } else {
    isPausedBySettings = false;
  }

  syncSettingsToForm();
});

modalCloseButton.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

modalForm.addEventListener("submit", applySettings);

const init = () => {
  updateDisplay();
  timerButton.textContent = "START";
};

init();
