
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <BH1750.h>
#include <MQ135.h>
MQ135 gasSensor = MQ135(A3);
#define RZERO 730.12
Adafruit_BMP280 bmp;
BH1750 lightMeter(0x23);

void co(){
  float ppm = gasSensor.getPPM();
  Serial.println(ppm);
}

void lightSensor(){
  lightMeter.begin(BH1750_CONTINUOUS_HIGH_RES_MODE);
  uint16_t lux = lightMeter.readLightLevel();
  Serial.println(lux);
}

void ecSensor(){
  int anVolt=analogRead(A2);
  float volt=(5/1023.0)*anVolt;
  float current=((5.0-volt)/10000.0);
  double resistance=volt/current;
  float resistivity=(resistance*(4*0.3))/1;
  float conductivity=1/resistivity;
  float ppm=(conductivity*1000)*500;
  Serial.println(ppm);
}

void pressureRoot(){
  if (!bmp.begin(0x77,0x58)) {  
    Serial.println(0);
    while (1);
  }

  Serial.println(bmp.readPressure());
  
}
void getPH(){
  float anPh=analogRead(A6);
  float pH=map(anPh, 500,1023, 14,0);
  Serial.println(pH);
}

void pressureShoot(){
  if (!bmp.begin(0x76,0x58)) {  
    Serial.println(0);
    while (1);
  }

  Serial.println(bmp.readPressure());
  
}

void humidifierWaterLevel(){
  int anL=analogRead(A0);
  float level=map(anL,236,677,0,40);
  Serial.println(level);
}

void mistMakerFeedback(){
  int mmfb=analogRead(A1);
  Serial.println(mmfb);
}
void setup() {
  Serial.begin(9600);
  Wire.begin();
  pinMode(2,OUTPUT);
  pinMode(3,OUTPUT);
  pinMode(4,OUTPUT);
  pinMode(5,OUTPUT);
  pinMode(6,OUTPUT);
  pinMode(7,OUTPUT);
  pinMode(8,OUTPUT);

  digitalWrite(2,LOW);
  digitalWrite(3,LOW);
  digitalWrite(4,LOW);
  digitalWrite(5,LOW);
  digitalWrite(6,LOW);
  digitalWrite(7,LOW);
  digitalWrite(8,LOW);
  
}

void loop() {
    char sr=Serial.read();
    if(sr=='p'){
      
      pressureShoot();

    }

    if(sr=='q'){
      
      pressureRoot();
    }
    if(sr=='h'){
      humidifierWaterLevel();
    }
    if(sr=='m'){
      mistMakerFeedback();
    }
    if(sr=='e'){
      ecSensor();
    }
    if(sr=='l'){
      lightSensor();
    }
    if(sr=='c'){
      co();
    }
    if(sr=='z'){
      getPH();
    }
    if(sr=='a'){// root temperature low pin on
      digitalWrite(2,HIGH);
    }
    if(sr=='b'){//root temp low pin off
      digitalWrite(2,LOW);
    }
    if(sr=='d'){//shoot hum high on
      digitalWrite(3, HIGH);
    }
    if(sr=='f'){//shoot hum high off
      digitalWrite(3, LOW);
    }
    if(sr=='g'){//shoot hum low on
      digitalWrite(4, HIGH);
    }
    if(sr=='i'){//shoot hum low off
      digitalWrite(4, LOW);
    }
    if(sr=='j'){//shoot pres high on
      digitalWrite(5, HIGH);
    }
    if(sr=='k'){//shoot pres high off
      digitalWrite(5, LOW);
    }
    if(sr=='n'){//shoot pres low on
      digitalWrite(6, HIGH);
    }
    if(sr=='o'){//shoot pres low off
      digitalWrite(6, LOW);
    }
    if(sr=='r'){//shoot temp high on
      digitalWrite(7, HIGH);
    }
    if(sr=='s'){//shoot temp high off
      digitalWrite(7, LOW);
    }
    if(sr=='t'){//shoot temp low on
      digitalWrite(8, HIGH);
    }
    if(sr=='u'){//shoot temp low off
      digitalWrite(8, LOW);
    }
    
}
