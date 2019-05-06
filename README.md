LoRa Server Project HTTP Integration for Azure IoT Central Device Bridge
========================================================================

This simple HTTP server handles HTTP integration of LoRa Server Project (will be referred as LoRa Server througout this document) application, decode the payload from the LoRa Server and forward the decoded payload to Azure IoT Central Device Bridge (will be referred as Device Bridge througout this document).

## Why?

Using HTTP integration from LoRa Server application to directly trigger Device Bridge has issues:
* The request body sent by the LoRa Server HTTP integration is incompatible with the Device Bridge's request format.
* You may need to customize the payload function but you don't want to write the function in the LoRa Server application.

This HTTP server solves the issues. You can point the `/uplink` endpoint to the HTTP integration to receive uplink messages, then customize the payload function to decode or transform the payload, and finally the server will trigger the Device Bridge.

I decided to add support for Azure Function but I need to take my team to learn about how to deploy Azure Function directly from my machine instead from Azure Management Portal. In another words, support for Azure Function is coming soon enough.

## Running the Server

Create a `.env` file witht the following content:

```env
AZURE_IOTC_DEVICEBRIDGE_URL=
PORT=8090
```

You **need** to provide the URL to the Device Bridge. Then run the following commands in your CMD or terminal window:

```sh
$ npm install
$ npm start
```


