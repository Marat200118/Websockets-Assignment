let socket;
let targetSocketId;
let gyroscope = new Gyroscope({ frequency: 5 });

const init = () => {
  targetSocketId = getUrlParameter("id");
  if (!targetSocketId) {
    alert(`Missing target ID in querystring`);
    return;
  }
  socket = io.connect("/");
  socket.on("connect", () => {
    console.log(`Connected: ${socket.id}`);
    socket.emit("controllerConnected", true);
    document.querySelector(".start").classList.add("animate-start");
    attachButtonListeners();
  });

  socket.on("scoreUpdate", (data) => {
    document.querySelector(
      ".scoreDisplay"
    ).textContent = `Score: ${data.score}`;
  });

  // Replace gyroscope with DeviceOrientationEvent listener
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
      const { alpha, beta, gamma } = event;

      document.querySelector(
        ".velocityDisplayX"
      ).textContent = `Rotation Alpha: ${alpha.toFixed(2)}`;
      document.querySelector(
        ".velocityDisplayY"
      ).textContent = `Rotation Beta: ${beta.toFixed(2)}`;
      document.querySelector(
        ".velocityDisplayZ"
      ).textContent = `Rotation Gamma: ${gamma.toFixed(2)}`;
      if (beta > 10) {
        sendCommand("down");
      } else if (beta < -10) {
        sendCommand("up");
      }

      if (gamma > 10) {
        // Tilted right
        sendCommand("right");
      } else if (gamma < -10) {
        // Tilted left
        sendCommand("left");
      }
    });
  } else {
    console.log("DeviceOrientationEvent is not supported by this device.");
  }
};

const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? false
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const attachButtonListeners = () => {
  document
    .querySelector(".start")
    .addEventListener("click", () => sendCommand("start"));

  document
    .querySelector(".reset")
    .addEventListener("click", () => sendCommand("reset"));
  document.querySelector(".scoreDisplay").textContent = "Score: 0";

  document
    .querySelector(".up")
    .addEventListener("click", () => sendCommand("up"));
  document
    .querySelector(".left")
    .addEventListener("click", () => sendCommand("left"));
  document
    .querySelector(".right")
    .addEventListener("click", () => sendCommand("right"));
  document
    .querySelector(".down")
    .addEventListener("click", () => sendCommand("down"));
};

const sendCommand = (command) => {
  if (socket.connected) {
    socket.emit("update", targetSocketId, { command });
  }
};

init();
