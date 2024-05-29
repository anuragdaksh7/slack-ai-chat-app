require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const { io } = require("socket.io-client")
const { Server } = require("socket.io")
const WebSocket = require("ws")

// const { sequelize } = require("./db/models");
// const { logger } = require("./helpers/winston");

const http = require("http");
const app = require("./app");

const webServer = http.createServer(app);
const BACKEND_PORT = process.env.BACKEND_PORT || 9000;
// const DB_PORT = process.env.DB_PORT || 3306;
const NODE_ENV = process.env.NODE_ENV || "development";


const { WebClient, LogLevel } = require("@slack/web-api");

const client = new WebClient(process.env.BOT_TOKEN, {
  logLevel: LogLevel.DEBUG
});

const { App } = require('@slack/bolt');

const slackApp = new App({
  token: process.env.BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});


slackApp.message('knock knock', async ({ message, say }) => {
  console.log(message)
  await say(`_Who's there?_`);
});



slackApp.message(async ({ message, say }) => {
  console.log(message)
  // Filter out message events with subtypes (see https://api.slack.com/events/message)
  if (message.subtype === undefined || message.subtype === 'bot_message') {
    const reversedText = [...message.text].reverse().join("");
    await say(reversedText);
  }
}); 




(async () => {

  

  await slackApp.start(3000);
  console.log('⚡️ Bolt app started');

  
  




  // const response = await fetch('https://slack.com/api/apps.connections.open', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': 'Bearer ' + process.env.SLACK_APP_TOKEN
  //   }
  // })
  // const data = await response.json()
  // console.log(data)

  // if (data.ok) {
  //   let wssUrl = data.url;

  //   let socket = new WebSocket(wssUrl);

  //   socket.onopen = function (e) {
  //     console.log("connected")
  //   }

  //   socket.onmessage = function (event) {
  //     console.log(event)
  //   }

  // }


})();









webServer.listen(BACKEND_PORT, () =>
  console.log({
    level: "info",
    message: `[BACKEND LISTENING ON PORT:${BACKEND_PORT} ENV:${NODE_ENV}]`,
  })
);

// sequelize
//   .sync()
//   .then(() => {
//     logger.log({
//       level: "info",
//       message: `[DB CONNECTION SUCCESSFUL ON PORT:${DB_PORT}]`,
//     });
//     server.listen(BACKEND_PORT, () =>
//       logger.log({
//         level: "info",
//         message: `[BACKEND LISTENING ON PORT:${BACKEND_PORT} ENV:${NODE_ENV}]`,
//       })
//     );
//   })
//   .catch((error) => {
//     logger.error(`[DB CONNECTION ERROR]`, error);
//   });
