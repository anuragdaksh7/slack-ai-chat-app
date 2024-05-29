require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
// const { sequelize } = require("./db/models");
// const { logger } = require("./helpers/winston");

const http = require("http");
const app = require("./app");

const server = http.createServer(app);
const BACKEND_PORT = process.env.BACKEND_PORT || 9000;
// const DB_PORT = process.env.DB_PORT || 3306;
const NODE_ENV = process.env.NODE_ENV || "development";

server.listen(BACKEND_PORT, () =>
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
