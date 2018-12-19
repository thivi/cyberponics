from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class rootTemp(threading.Thread):
    def __init__(self, config,  upPin,lock):
        threading.Thread.__init__(self)
        self.config=config
        
        self.upPin=upPin
        
        self.lock=lock
        gpio.setwarnings(False)
        gpio.setup(upPin, gpio.OUT)
        
        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        while True:
            print("getting Root temp")
            self.lock.acquire()
            d=so.rootTH.getTemp()
            self.lock.release()
            self.data=d
            if(d>float(self.config["Root_Temp_Up"])):
                gpio.output(self.upPin, 1)
                self.lock.acquire()
                so.sc.sendData('b')
                self.lock.release()
            
            elif(d<float(self.config["Root_Temp_Low"])):
                self.lock.acquire()
                so.sc.sendData('a')
                self.lock.release()
                gpio.output(self.upPin,0)

            else:
                self.lock.acquire()
                so.sc.sendData('b')
                self.lock.release()
                gpio.output(self.upPin,0)
                
            print("goot root temp ",self.data)
            time.sleep(0.2)

