#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

#define mq2 A0

const String UID = "*********************";
const String SENSORNAME = "*********";

ESP8266WiFiMulti wifiMulti;


String getData()
{
    uint8_t mq_level = analogRead(mq2);
    Serial.printf("mq2:%d\n",mq_level);
    return String(mq_level);
}

void setup()
{
   Serial.begin(115200);
    for(uint8_t t = 4; t > 0; t--) {
        Serial.printf("[SETUP] WAIT %d...\n", t);
        Serial.flush();
        delay(1000);
    }
    wifiMulti.addAP("*****", "*****");
    
}
int waitseconds = 1;
void loop()
{
   // wait for WiFi connection
    if((wifiMulti.run() == WL_CONNECTED)) {

        HTTPClient http;

        Serial.print("[HTTP] begin...\n");
        String url = "http://********/recordData";
        http.begin(url);
        http.addHeader("Content-Type", "application/json");
        String httpRequestData = "{\"sensorName\": \""+SENSORNAME+"\",\"user\":\""+UID+"\",\"value\": \""+getData()+"\"}";
        Serial.print("[HTTP] POST...\n");
        Serial.println("payload: "+httpRequestData);
        int httpCode = http.POST(httpRequestData);
        // httpCode will be negative on error
        if(httpCode > 0) {
            // HTTP header has been send and Server response header has been handled
            Serial.printf("[HTTP] POST... code: %d\n", httpCode);

            // file found at server
            if(httpCode == HTTP_CODE_OK) {
                String payload = http.getString();
                Serial.println(payload);
                waitseconds = payload.toInt();
            }
        } else {
            Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
            delay(3000);
            ESP.reset();
        }

        http.end();
        delay(1000*waitseconds);
        ESP.reset();
    }
    delay(2000);

}
