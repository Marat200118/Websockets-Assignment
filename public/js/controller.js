// const $messages = document.getElementById("messages");

// let socket;

// const init = () => {
//   targetSocketId = getUrlParameter("id");
//   if (!targetSocketId) {
//     alert(`Missing target ID in querystring`);
//     return;
//   }
//   socket = io.connect("/");
//   socket.on("connect", () => {
//     console.log(`Connected: ${socket.id}`);
//   });
//   window.addEventListener(`mousemove`, (e) => handleMouseMove(e));
//   window.addEventListener(`touchmove`, (e) => handleTouchMove(e));
// };

// const getUrlParameter = (name) => {
//   name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//   const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
//   const results = regex.exec(location.search);
//   return results === null
//     ? false
//     : decodeURIComponent(results[1].replace(/\+/g, " "));
// };

// const handleMouseMove = (e) => {
//   if (socket.connected) {
//     socket.emit(`update`, targetSocketId, {
//       x: e.clientX / window.innerWidth,
//       y: e.clientY / window.innerHeight,
//     });
//   }
// };

// const handleTouchMove = (e) => {
//   if (socket.connected) {
//     socket.emit(`update`, targetSocketId, {
//       x: e.touches[0].clientX / window.innerWidth,
//       y: e.touches[0].clientY / window.innerHeight,
//     });
//   }
// };

// init();
