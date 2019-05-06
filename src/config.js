'use strict';

module.exports = {
  iotc_devicebridge_url: process.env.AZURE_IOTC_DEVICEBRIDGE_URL || ``,
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8090,
};
