
import sys

import Adafruit_DHT

class TH:
    
    def __init__(self, pinno):

        self.pin = pinno

        self.humidity, self.temperature = Adafruit_DHT.read_retry(11, self.pin)

    def getTemp(self):
    
        return self.temperature
    def getHumidity(self):
        return self.humidity
   
