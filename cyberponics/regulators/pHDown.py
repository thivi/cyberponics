from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time
from notification import notify as n

class pHDown_level(threading.Thread):
    def __init__(self, config):
        threading.Thread.__init__(self)
        self.config=config

        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        notify=False
        while True:
            print("getting ph down level")
            d=so.phDownLevel.getDistance()
            self.data=d
            if(d<float(self.config["pH_Down_level"])):
                if(notify==True):
                    pass
                else:
                    k=n.send("LOW_PH_DOWN")
                    print("Low pH Down")
                    notify=True     
                
                
            
            elif(d>=float(self.config["pH_Down_level"])):
                if(notify==True):
                    n.update(k)
                    print(k," fixed")
                notify=False
                
            print("Got ph down level ",self.data)
            time.sleep(0.2)

