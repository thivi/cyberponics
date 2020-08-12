from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class shootTemp(threading.Thread):
    def __init__(self, config, lock):
        threading.Thread.__init__(self)
        self.config=config

        self.lock=lock

        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        while True:
            print("getting shoot temp")
            self.lock.acquire()
            d=so.shootTH.getTemp()
            self.lock.release()
            self.data=d
            if(d>float(self.config["Shoot_Temp_Up"])):

                self.lock.acquire()
                so.sc.sendData('r')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('u')
                self.lock.release()                
            
            elif(d<float(self.config["Shoot_Temp_Low"])):
                print("temp low")
                self.lock.acquire()
                so.sc.sendData('t')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('s')
                self.lock.release()

            else:
                self.lock.acquire()
                so.sc.sendData('s')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('u')
                self.lock.release()
                
            print("got shoot temp ",self.data)
            time.sleep(0.2)

