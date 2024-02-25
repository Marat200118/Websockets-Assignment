let socket;
let targetSocketId;

const init = () => {
  targetSocketId = getUrlParameter("id");
  if (!targetSocketId) {
    alert(`Missing target ID in querystring`);
    return;
  }
  socket = io.connect("/");
  socket.on("connect", () => {
    console.log(`Connected: ${socket.id}`);
    attachButtonListeners();
  });

  socket.on("scoreUpdate", (data) => {
    // Correctly access the score from the data object
    document.querySelector(
      ".scoreDisplay"
    ).textContent = `Score: ${data.score}`;
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
    .getElementById("start")
    .addEventListener("click", () => sendCommand("start"));
  document
    .getElementById("up")
    .addEventListener("click", () => sendCommand("up"));
  document
    .getElementById("left")
    .addEventListener("click", () => sendCommand("left"));
  document
    .getElementById("right")
    .addEventListener("click", () => sendCommand("right"));
  document
    .getElementById("down")
    .addEventListener("click", () => sendCommand("down"));
};

const sendCommand = (command) => {
  if (socket.connected) {
    socket.emit("update", targetSocketId, { command });
  }
};

init();
