from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class shootHum(threading.Thread):
    def __init__(self, config, lock):
        threading.Thread.__init__(self)
        self.config=config

        self.lock=lock

        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        while True:
            print("Getting shoot hum")
            self.lock.acquire()
            d=so.shootTH.getHumidity()
            self.lock.release()
            self.data=d
            if(d>float(self.config["Shoot_Hum_Up"])):
                self.lock.acquire()
                so.sc.sendData('d')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('i')
                self.lock.release()
                
            
            elif(d<float(self.config["Shoot_Hum_Low"])):
                self.lock.acquire()
                so.sc.sendData('g')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('f')
                self.lock.release()               
 

            else:
                self.lock.acquire()
                so.sc.sendData('f')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('i')
                self.lock.release()
                
            print("Got shoot hum ",self.data)
            time.sleep(0.2)

