'use strict';

require(`dotenv`).config();

const express = require(`express`);
const bodyParser = require(`body-parser`);
const http = require(`http`);
const payloadTransformer = require(`./payload_function`);
const mqtt = require(`mqtt`);
const config = require(`./config`);

const app = express();
const mqttClient = mqtt.connect(config.mqtt.uri, config.mqtt.options);

app.disable(`x-powered-by`);
app.use(bodyParser.json());

app.post(`/uplink`, async (req, res, next) => {
  // TODO: validate req.body.
  try {
    const { body } = req;
    const transformedPayload = payloadTransformer(body.data);

    const payload = {
      [body.devEUI]: [transformedPayload],
    };

    mqttClient.publish(`v1/gateway/telemetry`, JSON.stringify(payload), { qos: 1 });

    res.status(200).json({ message: `OK` });
  } catch (exception) {
    next(exception);
  }
});

app.use((req, res, next) => {
  const err = new Error(`Not found`);
  err.code = 404;

  next(err);
})

app.use((err, req, res, next) => {
  const code = err.code || 500;
  res.status(code).json({ error: { code, message: err.message } });
});

mqttClient.on(`error`, (error) => {
  console.error(`MQTT Error`, error);
  process.exit(-1);
});

process.on(`unhandledRejection`, (rejection) => {
  console.error(`unhandledRejection`, rejection);
  process.exit(-1);
});

process.on(`uncaughtException`, (exception) => {
  console.error(`uncaughtException`, exception);
  process.exit(-1);
});

const server = http.createServer(app);
server.listen(config.port, () => {
  console.log(`HTTP server is listening on port ${config.port}`);
});
