'use strict';

const { decode: lppDecode} = require(`lpp-node`);

// Map LPP IPSO channel number to friendly key
// TODO: define your channel-to-keys mapping here.
const channelToKeysMapping = {  
  0: `temperature`,
};

module.exports = function transform(payload) {
  // Currently support only base64-encoded string payload.
  if (typeof payload === `string`) {
    // most likely a base64-encoded string
    const buffer = Buffer.from(payload, `base64`);
    const decodedPayload = {};
    const decoded = lppDecode(buffer);

    decoded.forEach((item) => {
      const key = channelToKeysMapping[item.channel];
      if (!key) {
        return false;
      }

      if (item.type === `IPSO_GPS_LOCATION_NONSTD`) {
        decodedPayload.latitude = item.data[0];
        decodedPayload.longitude = item.data[1];
      } else if (item.type === `IPSO_GPS_LOCATION`) {
        decodedPayload.latitude = item.data[0];
        decodedPayload.longitude = item.data[1];
        decodedPayload.altitude = item.data[2];
      } else if (item.type === `IPSO_ACCELEROMETER`) {
        decodedPayload.accelerometer_x = item.data[0];
        decodedPayload.accelerometer_y = item.data[1];
        decodedPayload.accelerometer_z = item.data[2];
      } else if (item.type === `IPSO_GRYOMETER`) {
        decodedPayload.gyroscope_x = item.data[0];
        decodedPayload.gyroscope_y = item.data[1];
        decodedPayload.gyroscope_z = item.data[2];
      } else {
        decodedPayload[key] = item.data;
      }
    });
    
    return decodedPayload;
  }

  // TODO: handle the LPP-decoded payload from LoRa Server

  // TODO: handle custom javascript function-decoded payload from LoRa Server 

  return {};
}
