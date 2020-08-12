from objects import sensorObjects as so
import time
import threading
from notification import notify as n

class mold_d(threading.Thread):
    def __init__(self, config):
        threading.Thread.__init__(self)
        self.config=config
        self.mold=False
    def getMoldStatus(self):
        return self.mold    
    def run(self):
        self.mold=False
        notify=False

        while True:
            print("getting mold detector")
            c=so.mold.getData()
            
            if(c<float(self.config["Mold_detector_thresh"])):
                self.mold=True
                if(notify==True):
                    pass
                else:
                    k=n.send("MOLD_DETECTED")
                    print("Mold detected!")
                    notify=True
            else:
                if(notify==True):
                    n.update(k)
                    print(k,"Fixed")
                self.mold=False
                notify=False
            print("Got mold detector ", self.mold)
            time.sleep(5)

            

