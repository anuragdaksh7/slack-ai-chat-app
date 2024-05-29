require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const WebSocket = require("ws")
const http = require("http");
const app = require("./app");

const BACKEND_PORT = process.env.BACKEND_PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || "development";
const webServer = http.createServer(app);

async function sendMessage(message) {
  const url = process.env.SLACK_WRITER_WEBHOOK

  const payload = {
    text: message
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };

  fetch(url, options)
}

webServer.listen(BACKEND_PORT, async () => {
  const response = await fetch('https://slack.com/api/apps.connections.open', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + process.env.SLACK_APP_TOKEN
    }
  })
  const data = await response.json()
  // console.log(data)

  if (data.ok) {
    let wssUrl = data.url;

    let socket = new WebSocket(wssUrl);

    socket.onopen = function (e) {
      console.log("connected")
      sendMessage("The BOT is LIVE", socket)
    }

    socket.onmessage = async function (event) {
      const data = JSON.parse(event.data)

      if (data.type === "events_api" && data.retry_attempt === 0) {
        const payload = data.payload.event
        const user = payload.user
        const channel = payload.channel
        var text = payload.text.split(" ")
        text[0] = "<@" + user + ">"
        text = text.join(" ")
        console.log(text)
        sendMessage(text)
        console.log(payload)
      }

      if (data.type === "hello") {
        console.log("initial debug message")
      }
    }

  }

  console.log(`[BACKEND LISTENING ON PORT:${BACKEND_PORT} ENV:${NODE_ENV}]`)
});