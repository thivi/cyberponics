from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time

class shootPres(threading.Thread):
    def __init__(self, config,  lock):
        threading.Thread.__init__(self)
        self.config=config
       
        self.lock=lock

        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        while True:
            print("getting shoot pressure")
            self.lock.acquire()
            d=so.sc.getData('e')
            self.lock.release()
            self.data=d
            if(d>float(self.config["Shoot_Pres_Up"])):

                self.lock.acquire()
                so.sc.sendData('j')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('o')
                self.lock.release()                
            
            elif(d<float(self.config["Shoot_Pres_Low"])):
                
                self.lock.acquire()
                so.sc.sendData('n')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('k')
                self.lock.release()                

            else:

                self.lock.acquire()
                so.sc.sendData('o')
                self.lock.release()
                self.lock.acquire()
                so.sc.sendData('k')
                self.lock.release()                
            
            print("Got shoot pressure ",self.data)
            time.sleep(0.2)

