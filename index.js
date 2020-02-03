"use strict";
require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("./package");
const { PORT } = process.env;

(async () => {
  const server = Hapi.server({
    port: PORT,
    host: "localhost"
  });

  const swaggerOptions = {
    info: {
      title: "Test API Documentation",
      version: Pack.version
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  server.route(require("./routes"));

  await server.start();
  console.log("Server running on %s", server.info.uri);

  process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
  });
})();
