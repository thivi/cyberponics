import threading
import fb.fbconfig as fb
import pprint

pp = pprint.PrettyPrinter(indent=4)

class getConfig(threading.Thread):
    def __init__(self, config):
        threading.Thread.__init__(self)
        self.config=config
    def sh(self, mes):
        
        if(self.config["filled"]==False):
            self.config.update(mes['data'])
        
            self.config["filled"]=True
        else:
            obj={
                mes['path'][1:]:mes['data']
            }
            self.config.update(obj)
        pp.pprint(self.config)
    def run(self):
        fb.db.child("config").stream(self.sh)