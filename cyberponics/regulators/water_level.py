from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class water_level(threading.Thread):
    def __init__(self, config, regPin):
        threading.Thread.__init__(self)
        self.config=config
        self.regPin=regPin
        gpio.setup(regPin, gpio.OUT)
        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        while True:
            print("getting water level")
            d=so.waterLevel.getDistance()
            
            self.data=d
            if(d<float(self.config["Liq_level_reser"])):
                gpio.output(self.regPin, 1)
                
                
            
            elif(d>=float(self.config["Liq_level_reser"])):
                gpio.output(self.regPin,0)
                
            print("got water level ",self.data)
            time.sleep(0.2)

