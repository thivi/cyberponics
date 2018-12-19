import objects.sensorObjects as so
import time as t
import threading
class sample(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self)
        pass
    def run(self):
        while True:
            print(so.nutritionSolution.getDistance())
            t.sleep(0.2)
        
s=sample()
s.start()