import sensors.TempHumidity as TM

hum=TM.TH(4)
print(hum.getHumidity())