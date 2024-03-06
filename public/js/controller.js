// let socket;
// let targetSocketId;
// let gyroscope = new Gyroscope({ frequency: 5 });

// const init = () => {
//   targetSocketId = getUrlParameter("id");
//   if (!targetSocketId) {
//     alert(`Missing target ID in querystring`);
//     return;
//   }
//   socket = io.connect("/");
//   socket.on("connect", () => {
//     console.log(`Connected: ${socket.id}`);
//     socket.emit("controllerConnected", true);
//     document.querySelector(".start").classList.add("animate-start");
//     attachButtonListeners();

//     document.getElementById("useGyroscope").addEventListener("click", () => {
//       socket.emit("controlMethod", { method: "gyroscope" });
//       // Optionally, handle UI changes to indicate the selection
//     });

//     document.getElementById("useButtons").addEventListener("click", () => {
//       socket.emit("controlMethod", { method: "buttons" });
//       // Optionally, handle UI changes to indicate the selection
//     });
//   });

//   socket.on("scoreUpdate", (data) => {
//     document.querySelector(
//       ".scoreDisplay"
//     ).textContent = `Score: ${data.score}`;
//   });

//   if (window.DeviceOrientationEvent) {
//     window.addEventListener("deviceorientation", (event) => {
//       const { alpha, beta, gamma } = event;

//       document.querySelector(
//         ".velocityDisplayX"
//       ).textContent = `Rotation Alpha: ${alpha.toFixed(2)}`;
//       document.querySelector(
//         ".velocityDisplayY"
//       ).textContent = `Rotation Beta: ${beta.toFixed(2)}`;
//       document.querySelector(
//         ".velocityDisplayZ"
//       ).textContent = `Rotation Gamma: ${gamma.toFixed(2)}`;
//       if (beta > 10) {
//         sendCommand("down");
//       } else if (beta < -10) {
//         sendCommand("up");
//       }

//       if (gamma > 10) {
//         // Tilted right
//         sendCommand("right");
//       } else if (gamma < -10) {
//         // Tilted left
//         sendCommand("left");
//       }
//     });
//   } else {
//     console.log("DeviceOrientationEvent is not supported by this device.");
//   }
// };

// const getUrlParameter = (name) => {
//   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//   const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
//   const results = regex.exec(location.search);
//   return results === null
//     ? false
//     : decodeURIComponent(results[1].replace(/\+/g, " "));
// };

// const attachButtonListeners = () => {
//   document
//     .querySelector(".start")
//     .addEventListener("click", () => sendCommand("start"));

//   document
//     .querySelector(".reset")
//     .addEventListener("click", () => sendCommand("reset"));
//   document.querySelector(".scoreDisplay").textContent = "Score: 0";

//   document
//     .querySelector(".up")
//     .addEventListener("click", () => sendCommand("up"));
//   document
//     .querySelector(".left")
//     .addEventListener("click", () => sendCommand("left"));
//   document
//     .querySelector(".right")
//     .addEventListener("click", () => sendCommand("right"));
//   document
//     .querySelector(".down")
//     .addEventListener("click", () => sendCommand("down"));
// };

// const sendCommand = (command) => {
//   if (socket.connected) {
//     socket.emit("update", targetSocketId, { command });
//   }
// };

// init();

let socket;
let targetSocketId;
let controlMethod = "";

const init = () => {
  targetSocketId = getUrlParameter("id");
  if (!targetSocketId) {
    alert("Missing target ID in querystring");
    return;
  }
  socket = io.connect("/");
  socket.on("connect", () => {
    console.log(`Connected: ${socket.id}`);
    socket.emit("controllerConnected", true);
    setupControlMethodListeners();
  });

  document.querySelector(".start").addEventListener("click", startGame);

  document
    .querySelector(".reset")
    .addEventListener("click", () => sendCommand("reset"));
};

const setupControlMethodListeners = () => {
  const gyroscopeButton = document.getElementById("useGyroscope");
  const buttonsButton = document.getElementById("useButtons");

  gyroscopeButton.addEventListener("click", () => {
    controlMethod = "gyroscope";
    highlightSelection(gyroscopeButton, buttonsButton);
    socket.emit("controlMethod", { method: "gyroscope" });
  });

  buttonsButton.addEventListener("click", () => {
    controlMethod = "buttons";
    highlightSelection(buttonsButton, gyroscopeButton);
    setupButtonControlListeners(); // Attach button event listeners here
    socket.emit("controlMethod", { method: "buttons" });
  });
};

const startGame = () => {
  if (controlMethod === "") {
    alert("Please select a control method first.");
    return;
  }
  document.querySelector(".control-method-choice").style.display = "none";
  document.querySelector(".start").style.display = "none";
  document.querySelector(".game-controls").style.display = "block";
  document.querySelector(
    controlMethod === "gyroscope" ? ".gyroscope-controls" : ".button-controls"
  ).style.display = "block";
  sendCommand("start");
};

const setupButtonControlListeners = () => {
  // Example: attach event listener for "up" button
  document
    .querySelector(".up")
    .addEventListener("click", () => sendCommand("up"));
  // Repeat for other direction buttons: left, right, down
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

const highlightSelection = (selectedButton, otherButton) => {
  selectedButton.classList.add("selected");
  otherButton.classList.remove("selected");
};

const sendCommand = (command) => {
  if (socket.connected) {
    socket.emit("update", targetSocketId, { command });
  }
};

const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

init();
