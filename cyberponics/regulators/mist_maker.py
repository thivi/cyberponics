import threading
import time
from objects import sensorObjects as so
import RPi.GPIO as gpio
from notification import notify as n

class mist_maker (threading.Thread):
   def __init__(self, pin, time,lock):
      threading.Thread.__init__(self)
      gpio.setmode(gpio.BCM)
      gpio.setwarnings(False)
      gpio.setup(pin, gpio.OUT)
      self.pin=pin
      self.time=time
      self.lock=lock
      self.sensor=True

   def getSensor(self):
       return self.sensor

   def run(self):
      notify=False  
      while True:
        print("Getting mist maker..............................................")
        #self.lock.acquire()
        #initM=so.sc.getData('m')
        
        #self.lock.release()
        gpio.output(self.pin, 0)
        print("MISTER ON..............................")
        start=time.time()
        while(time.time()-start<5):
            pass
        gpio.output(self.pin, 1)
        print("MISTER OFF........................")
        #self.lock.acquire()
        #finM=so.sc.getData('m')
        #self.lock.release()
##
##        if(finM<initM):
##            self.sensor=True
##            if(notify==True):
##                n.update(k)
##                print(k,"Fixed")
##            notify=False
##        else:
##            self.sensor=False
##            if(notify==True):
##                pass
##            else:
##                k=n.send("MIST_MAKER_MALFUNCTIONED")
##                print("Mist maker malfunctioned")
##                notify=True
##        print("Got mist maker ", self.sensor)
        start=time.time()
        while(time.time()-start<float(self.time["Mist_Maker_Time"])):
            print("Time remaining,,,,,,", time.time()-start)
            pass
        
          


