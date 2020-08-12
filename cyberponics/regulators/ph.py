from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class ph(threading.Thread):
    def __init__(self, config,  upPin, lowPin,lock):
        threading.Thread.__init__(self)
        self.config=config
        
        self.upPin=upPin
        self.lowPin=lowPin
        self.lock=lock
        gpio.setwarnings(False)
        gpio.setup(upPin, gpio.OUT)
        gpio.setup(lowPin, gpio.OUT)
        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        while True:
            print("Getting ph")
            self.lock.acquire()
            d=so.sc.getData('z')
            self.lock.release()
            self.data=d
            if(d>float(self.config["pH_up"])):
                gpio.output(self.upPin, 1)
                gpio.output(self.lowPin,0)
                
            
            elif(d<float(self.config["pH_low"])):
                gpio.output(self.lowPin,1)
                gpio.output(self.upPin,0)

            else:
                gpio.output(self.lowPin,0)
                gpio.output(self.upPin,0)
                
            print("got PH ",self.data)
            time.sleep(0.2)

