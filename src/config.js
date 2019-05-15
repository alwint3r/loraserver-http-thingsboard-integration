'use strict';

module.exports = {
  mqtt: {
    uri: process.env.MQTT_URI || `mqtt://localhost:1883`,
    options: {
      username: process.env.MQTT_USERNAME || ``,
      password: ``,
    },
  },
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8090,
};
