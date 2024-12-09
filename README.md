# js_socketio
## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)

## General Info
***  
This project is a basic **Socket.IO** application integrated with an **Express.js server**. It sets up a WebSocket server and client communication to demonstrate real-time messaging between a server and a browser.

- **Server Functionalities**:
  - Sends a message to the client upon connection: `"Hola Mundo desde SocketIO Servidor en javascript"`.
  - Listens for messages from the client and logs them to the console.
  - Handles client disconnections.

- **Client Functionalities**:
  - Receives and displays the server message.
  - Sends a custom message to the server via a button click.

## Technologies
***  
A list of technologies used within the project:
* [Node.js](https://nodejs.org): Version 20.0.0
* [Express.js](https://expressjs.com): Version 4.x
* [Socket.IO](https://socket.io): Version 4.x

## Installation
***  
Follow these steps to install and run the project:
### Via GitHub
Ensure you have Node.js installed on your machine:
```
node --version  
npm --version
```
Copy the repository
```
git clone https://github.com/nava2105/js_socketio.git
```
Enter the directory
```
cd ../js_socketio
```
Install the dependencies
```
npm install  
```
Run the server
```
node app.js
```
Open a browser and enter to
Server: [http://localhost:3000](http://localhost:3000)
### Via Docker-hub
Pull the image from Docker-hub
```
docker pull na4va4/js_socketio
```
Start a container from the image
```
docker run -p 3000:3000 na4va4/js_socketio
```
Open a browser and enter to
Server: [http://localhost:3000](http://localhost:3000)