import sensors.serialCom as sc

pr=sc.serialData('/dev/ttyACM1')
print(pr.getData('q'))