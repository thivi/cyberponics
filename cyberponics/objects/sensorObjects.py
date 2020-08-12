from sensors import ultrasonic as us
from sensors import serialCom as s
from sensors import TempHumidity as TH
from sensors import color as c
from pinDefinition import *

mold=c.color(mold_in,120,590)
growth=us.distanceSensor(growth_trigger,growth_echo,50)
nutritionSolution=us.distanceSensor(nutLevel_trigger,nutLevel_echo,50)
waterLevel=us.distanceSensor(waterLevel_trigger,waterLevel_echo,20)
phUpLevel=us.distanceSensor(phUpLevel_trigger,phUpLevel_echo,50)
phDownLevel=us.distanceSensor(phDownLevel_trigger,phDownLevel_echo,50)
shootTH=TH.TH(shootTH_in)
rootTH=TH.TH(rootTH_in)
sc=s.serialData('/dev/ttyUSB0')