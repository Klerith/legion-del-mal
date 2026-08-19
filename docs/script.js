const filterButtons = document.querySelectorAll(".filter");
const missions = document.querySelectorAll(".mission");
const alarmButton = document.querySelector("#alarmButton");
const closeAlarmButton = document.querySelector("#closeAlarmButton");
const alarmOverlay = document.querySelector("#alarmOverlay");
const progressBar = document.querySelector("#progressBar");
const progressValue = document.querySelector("#progressValue");
const statusMessage = document.querySelector("#statusMessage");

const conquestUpdates = [
  {
    progress: 41,
    message: "Fase actual: Brainiac intenta recordar la contraseña del Wi-Fi lunar.",
  },
  {
    progress: 46,
    message: "Fase actual: Magneto está separando los clips del resto del inventario.",
  },
  {
    progress: 52,
    message: "Fase actual: Mystique se infiltró en una reunión que pudo ser un correo.",
  },
  {
    progress: 37,
    message: "Fase actual: conseguir presupuesto sin emitir factura.",
  },
];

let currentUpdateIndex = 0;

function filterMissions(selectedStatus) {
  missions.forEach((mission) => {
    const shouldShow =
      selectedStatus === "all" || mission.dataset.status === selectedStatus;

    mission.classList.toggle("is-hidden", !shouldShow);
  });
}

function selectFilter(selectedButton) {
  filterButtons.forEach((button) => {
    const isSelected = button === selectedButton;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  filterMissions(selectedButton.dataset.filter);
}

function openAlarm() {
  alarmOverlay.classList.add("is-visible");
  alarmOverlay.setAttribute("aria-hidden", "false");
  closeAlarmButton.focus();
}

function closeAlarm() {
  alarmOverlay.classList.remove("is-visible");
  alarmOverlay.setAttribute("aria-hidden", "true");
  alarmButton.focus();
}

function updateConquestProgress() {
  currentUpdateIndex = (currentUpdateIndex + 1) % conquestUpdates.length;
  const update = conquestUpdates[currentUpdateIndex];

  progressBar.style.width = `${update.progress}%`;
  progressValue.textContent = `${update.progress}%`;
  statusMessage.textContent = update.message;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => selectFilter(button));
});

alarmButton.addEventListener("click", openAlarm);
closeAlarmButton.addEventListener("click", closeAlarm);

alarmOverlay.addEventListener("click", (event) => {
  if (event.target === alarmOverlay) {
    closeAlarm();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && alarmOverlay.classList.contains("is-visible")) {
    closeAlarm();
  }
});

setInterval(updateConquestProgress, 5000);
