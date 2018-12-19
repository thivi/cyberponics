from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class hum_water_level(threading.Thread):
    def __init__(self, config, regPin, lock):
        threading.Thread.__init__(self)
        self.config=config
        self.regPin=regPin
        self.lock=lock
        gpio.setwarnings(False)
        gpio.setup(regPin, gpio.OUT)
        self.data=0
    def getData(self):
        return self.data
    def run(self):
        while True:
            print("Getting Humidity water level")
            self.lock.acquire()
            d=so.sc.getData('h')
            self.lock.release()
            self.data=d
            if(d<float(self.config["Humidity_Water_Level"])):
                gpio.output(self.regPin, 1)
                
                
            
            elif(d>=self.config["Humidity_Water_Level"]):
                gpio.output(self.regPin,0)
                
            print("Got Humidity water level ",self.data)
            time.sleep(0.2)

