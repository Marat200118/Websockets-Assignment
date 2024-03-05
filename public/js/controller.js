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

  gyroscope.addEventListener("reading", (e) => {
    console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
    console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
    console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);

    // document.querySelector(
    //   ".velocityDisplayX"
    // ).textContent = `Velocity-x: ${gyroscope.x.toFixed(2)}`;
    // document.querySelector(
    //   ".velocityDisplayY"
    // ).textContent = `Velocity-y: ${gyroscope.y.toFixed(2)}`;
    // document.querySelector(
    //   ".velocityDisplayZ"
    // ).textContent = `Velocity-z: ${gyroscope.z.toFixed(2)}`;
  });
  gyroscope.start();

  gyroscope.addEventListener("reading", (e) => {
    // Threshold for detecting significant tilt
    const threshold = 1.5; // Adjust based on testing

    // Determine direction based on gyroscope data
    if (gyroscope.x > threshold) {
      sendCommand("down");
    } else if (gyroscope.x < -threshold) {
      sendCommand("up");
    }

    if (gyroscope.y > threshold) {
      sendCommand("right");
    } else if (gyroscope.y < -threshold) {
      sendCommand("left");
    }
  });
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
