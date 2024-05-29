require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const WebSocket = require("ws")
const http = require("http");
const app = require("./app");

const BACKEND_PORT = process.env.BACKEND_PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || "development";
const webServer = http.createServer(app);



(async () => {
  const response = await fetch('https://slack.com/api/apps.connections.open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + process.env.SLACK_APP_TOKEN
    }
  })
  const data = await response.json()
  console.log(data)
  
  if (data.ok) {
    let wssUrl = data.url;
  
    let socket = new WebSocket(wssUrl);
  
    socket.onopen = function (e) {
      console.log("connected")
    }
  
    socket.onmessage = function (event) {
      console.log(event)
    }
  
  } 

})


webServer.listen(BACKEND_PORT, async () => {
  const response = await fetch('https://slack.com/api/apps.connections.open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + process.env.SLACK_APP_TOKEN
    }
  })
  const data = await response.json()
  console.log(data)
  
  if (data.ok) {
    let wssUrl = data.url;
  
    let socket = new WebSocket(wssUrl);
  
    socket.onopen = function (e) {
      console.log("connected")
    }
  
    socket.onmessage = function (event) {
      console.log(event)
    }
  
  } 

  console.log(`[BACKEND LISTENING ON PORT:${BACKEND_PORT} ENV:${NODE_ENV}]`)
});