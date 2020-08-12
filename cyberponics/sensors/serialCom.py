import serial

class serialData:
    
    def __init__(self, port):
        
        self.s=serial.Serial()
        self.s.baudrate=9600
        self.s.port=port
        self.s.open()
        
    def getData(self, sensor):

        self.s.write(sensor.encode())
        x= self.s.readline()
        return float(x.decode().replace('\r\n',''))
    
    def sendData(self,char):
        
        self.s.write(char.encode())
