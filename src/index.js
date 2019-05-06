'use strict';

require(`dotenv`).config();

const express = require(`express`);
const bodyParser = require(`body-parser`);
const fetch = require(`node-fetch`);
const http = require(`http`);
const payloadTransformer = require(`./payload_function`);
const config = require(`./config`);

const app = express();

app.disable(`x-powered-by`);
app.use(bodyParser.json());

app.post(`/uplink`, async (req, res, next) => {
  // TODO: validate req.body.
  try {
    const { body } = req;
    const transformedPayload = payloadTransformer(body.data);

    const requestBody = {
      measurements: transformedPayload,
      device: {
        deviceId: body.devEUI || ``,
      },
    };

    const requestOptions = {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`,
        'Accept': `application/json`,
      },
      body: JSON.stringify(requestBody),
    };

    const response = await fetch(config.iotc_devicebridge_url, requestOptions);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseText = await response.text();
    res.status(response.status).end(responseText);
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
