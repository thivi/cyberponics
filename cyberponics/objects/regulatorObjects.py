from regulators import *
import threading
from pinDefinition import *

serialLock=threading.Lock()
shootLock=threading.Lock()
rootLock=threading.Lock()

config={
    "filled":False,
    "EC_Low":0, 
    "EC_Up":0, 
    "Humidity_Water_Level":0, 
    "Light_Intensity_Low":0, 
    "Light_Intensity_Up":0, 
    "Mist_Maker_Time":0, 
    "Mold_detector_thresh":0, 
    "Nut_tank_level":0, 
    "Liq_level_reser":0, 
    "pH_up":0,
    "pH_low":0,
    "pH_UP_level":0,
    "pH_Down_level":0,
    "Root_Hum_Up":0,
    "Root_Hum_Low":0,
    "Root_Pres_Up":0,
    "Root_Pres_Low":0,
    "Root_Temp_Up":0,
    "Root_Temp_Low":0,
    "Shoot_Hum_Up":0,
    "Shoot_Hum_Low":0,
    "Shoot_Pres_Up":0,
    "Shoot_Pres_Low":0,
    "Shoot_Temp_Up":0,
    "Shoot_Temp_Low":0

}
rConfig=getconfig.getConfig(config)
rEc = ec.ec(config, EC_Inc, EC_Dec, serialLock)
rHumWater = humidityWater.hum_water_level(config, Humidifier_on, serialLock)
rLight = light_level.light_intensity(config, Light, serialLock)
rMist = mist_maker.mist_maker(Mist_on, config, serialLock)
rMold = mold_detector.mold_d(config)
rNutrition = nutrition_level.nutrition_level(config)
rPH =ph.ph(config, pH_Inc, pH_Dec,serialLock)
rPHDown =pHDown.pHDown_level(config)
rPHUp =pHUP.pHUP_level(config)
rRootHum =rootHum.rootHum(config, RootHum_In, RootHum_Dec,rootLock)
rRootPres =rootPres.rootPres(config, RootPres_Inc, RootPres_Dec,serialLock)
rRootTemp =rootTemp.rootTemp(config, RootTemp_Inc,rootLock)
rShootHum =shootHum.shootHum(config,shootLock)
rShootPres =shootpres.shootPres(config,serialLock)
rShootTemp =shootTemp.shootTemp(config,shootLock)
rWaterLevel =water_level.water_level(config, WaterLevel_on)
rUpload =webData.uploadData(serialLock)