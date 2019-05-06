LoRa Server Project HTTP Integration for Azure IoT Central Device Bridge
========================================================================

This simple HTTP server handles HTTP integration of LoRa Server Project (will be referred as LoRa Server througout this document) application, decode the payload from the LoRa Server and forward the decoded payload to Azure IoT Central Device Bridge (will be referred as Device Bridge througout this document).

## Why?

HTTP integration from LoRa Server application can not directly trigger Device Bridge without modifying the code. So you can just deploy this as an independent HTTP server inside some sort of virtual machine.

I decided to add support for Azure Function but I need to take my time learning about how to deploy Azure Function directly from my machine instead from Azure Management Portal. In another words, support for Azure Function is coming soon enough.


