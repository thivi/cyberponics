from objects import sensorObjects as so
import threading
import RPi.GPIO as gpio
import time
from notification import notify as n

class nutrition_level(threading.Thread):
    def __init__(self, config):
        threading.Thread.__init__(self)
        self.config=config

        self.data=0
    def getData(self):
        return self.data     
    def run(self):
        notify=False
        while True:
            print("Getting nut level")
            d=so.nutritionSolution.getDistance()
            self.data=d
            
            if(d<float(self.config["Nut_tank_level"])):
                if(notify==True):
                    pass
                else:
                    k=n.send("LOW_NUTRITION")
                    print("Low nutrition")
                    notify=True         
            
            elif(d>=float(self.config["Nut_tank_level"])):
                if(notify==True):
                    n.update(k)
                    print(k," fixed")
                notify=False
                          
            print("Got nut level ", d)
            time.sleep(0.2)

