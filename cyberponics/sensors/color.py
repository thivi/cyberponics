import RPi.GPIO as gpio
import time as t

class color:
    
    def __init__(self, pin, min,max):
        self.pinno=pin
        self.minno=min
        self.maxno=max
        gpio.setmode(gpio.BCM)
        gpio.setup(self.pinno,gpio.IN, pull_up_down=gpio.PUD_DOWN)
        self.tot=0
        self.f=0
    def getData(self):
        self.tot=0
        for i in range(1,100):
            while gpio.input(self.pinno)==0:
                pass

            start=t.time()
            while gpio.input(self.pinno)==1:
                pass
            stop=t.time()

            duration=stop-start
            self.tot=self.tot+duration
            

        avg=self.tot/100
        period=(avg*2.0)
        self.f=1/period
        hexcode=((self.f-self.minno)*((255-0)/(self.maxno-self.minno)))+0
        return (hexcode)
    
    def getF(self):
        return self.f
       

