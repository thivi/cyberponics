from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class light_intensity(threading.Thread):
    def __init__(self, config, regPin,lock):
        threading.Thread.__init__(self)
        self.config=config
        
        self.regPin=regPin
        self.lock=lock
        gpio.setwarnings(False)
        gpio.setup(regPin, gpio.OUT)
        self.p=gpio.PWM(regPin, 1000)
        self.on=True
        self.data=0
    def getData(self):
        return self.data        
    def turnLightOn(self):
        self.p.start(100)
        self.on=True
    def run(self):
        count=100
        while True:
            print("Getting light level")
            if(self.on==True):
                self.lock.acquire()
                d=so.sc.getData('l')
                self.lock.release()
                self.data=d
                if(d<=float(self.config["Light_Intensity_Low"])):
                    count+=count
                    self.p.ChangeDutyCycle(count)
                    
                    
                
                elif(d>=float(self.config["Light_Intensity_Up"])):
                    count-=count
                    self.p.ChangeDutyCycle(count)
                    
                print("Got light level ",self.data)
                time.sleep(0.2)

