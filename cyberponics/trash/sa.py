import threading
import time

l=threading.Lock()

class myThread (threading.Thread):
   def __init__(self,name, lock):
      threading.Thread.__init__(self)
      self.name=name
      self.lock=lock
   def run(self):
      
      while True:
            self.lock.acquire()
            print(self.name)
            self.lock.release()
            



# Create new threads
thread1 = myThread("t1",l)
thread2 = myThread("t2",l)

# Start new Threads
thread1.start()
thread2.start()

thread1.join()
thread2.join()
print("Exiting Main Thread")