# Real-Time Snake Game Controller Application with Node.js, Express, and Socket.IO

This repository contains the source code for a real-time game controller application built with Node.js, Express, and Socket.IO. It demonstrates real-time communication between a server and clients, utilizing device orientation for control inputs and providing a visual feedback mechanism via a web interface.

User is able to control the snake in the game using either gyroscope controls or button controls. The game state and score are updated in real-time across all connected clients.

## Features

- Real-time control method selection (Gyroscope or Button controls).
- Dynamic visual feedback for gyroscope controls using device orientation data.
- Real-time score updates and game state management across clients.
- Responsive design for both desktop and mobile devices.

## Interface

### Snake game
<img width="1463" alt="Screenshot 2024-03-08 at 16 56 48" src="https://github.com/Marat200118/Websockets-Assignment/assets/37581663/5cfb38db-65e4-4882-bb13-fa34443e8517">

### Controller
<img width="300" alt="Screenshot 2024-03-08 at 16 56 39" src="https://github.com/Marat200118/Websockets-Assignment/assets/37581663/e4c85685-dfe8-49dd-9f1a-9bd9fa1ada1c">
<img width="300" alt="Screenshot 2024-03-08 at 16 56 11" src="https://github.com/Marat200118/Websockets-Assignment/assets/37581663/67488cbb-1281-4ad3-9ba2-b03f2408992d">
<img width="300" alt="Screenshot 2024-03-08 at 16 56 01" src="https://github.com/Marat200118/Websockets-Assignment/assets/37581663/6794c028-0eee-4cf1-b613-a3b93a2d1389">


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (version 12.x or later recommended)
- [npm](https://www.npmjs.com/) (normally comes with Node.js)
<img width="594" alt="Screenshot 2024-03-08 at 16 56 39" src="https://github.com/Marat200118/Websockets-Assignment/assets/37581663/f9ad6caf-d84f-47d0-841d-4bac486b01ae">

### Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/your-github-username/your-repository-name.git
```

2. Navigate to the project root directory:

```bash
cd your-repository-name
```

3. Install the project dependencies:

```bash
npm install
```

### Running the Application

To run the application, execute the following command:

```bash
npm start
```

The application will be accessible at `https://localhost:443` by default.

