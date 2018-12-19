import sensors.ultrasonic as d
import time as t

obj=d.distanceSensor(2,3)

while True:
    print(obj.getDistance())
    t.sleep(1)