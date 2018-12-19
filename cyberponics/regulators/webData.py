from objects import sensorObjects as so
from objects import regulatorObjects as r
import fb.fbconfig as f
import datetime
import threading
import time
import pprint

pp = pprint.PrettyPrinter(indent=4)
class uploadData(threading.Thread):
    def __init__(self,lock):
        threading.Thread.__init__(self)
        self.lock=lock
    def getData(self):
##        growth=so.growth.getDistance()
##        nl=r.rNutrition.getData()
##        phUp=r.rPHUp.getData()
##        phDown=r.rPHDown.getData()
##        wl=r.rWaterLevel.getData()
##        shootTemp=r.rShootTemp.getData()
##        shootHum=r.rShootHum.getData()
##        rootTemp=r.rRootTemp.getData()
##        rootHum=r.rRootHum.getData()
##        shootPres=r.rShootPres.getData()
##        rootPres=r.rRootPres.getData()
##        ph=r.rPH.getData()
##        light=r.rLight.getData()
##        self.lock.acquire()
##        co2=so.sc.getData('c')
##        self.lock.release()
##        humidityWaterLevel=r.rHumWater.getData()
##        mold=r.rMold.getMoldStatus()
##        mistmaker=r.rMist.getSensor()
##        ec=r.rEc.getData()
##        data={
##            "plant_height":growth,
##            "nutrition_level":nl,
##            "pH_UP_level":phUp,
##            "phDown":phDown,
##            "water_level":wl,
##            "shoot_temperature":shootTemp,
##            "shoot_humidity":shootHum,
##            "root_temperature":rootTemp,
##            "root_humidity":rootHum,
##            "shoot_pressure":shootPres,
##            "root_pressure":rootPres,
##            "ec":ec,
##            "pH":ph,
##            "light_intensity":light,
##            "co2":co2,
##            "mold":mold,
##            "humidityWaterLevel":humidityWaterLevel,
##            "mist-maker":mistmaker
##
##        }
        data={
            "plant_height":20,
            "nutrition_level":15,
            "pH_UP_level":16,
            "phDown":25,
            "water_level":10,
            "shoot_temperature":30,
            "shoot_humidity":80,
            "root_temperature":30,
            "root_humidity":90,
            "shoot_pressure":100001,
            "root_pressure":100005,
            "ec":200,
            "pH":6,
            "light_intensity":1200,
            "co2":200,
            "mold":False,
            "humidityWaterLevel":25,
            "mist-maker":True

        }
    
        return data
    def run(self):
        while True:
            print("Getting Data")
            d=self.getData()
            pp.pprint(d)
            f.db.child("data").child(datetime.datetime.now().strftime("%Y-%m-%d %H:%M")).set(d, f.user['idToken'])
            print("got data")
            time.sleep(60)
        

    
    