import fb.fbconfig as fb
import datetime

class Notification:
        
    def send(self, type):

        notification={
            "read":False,
            "fixed":False,
            "dateTime":datetime.datetime.now().strftime("%Y-%m-%d %H:%M"),
            "type":type
        }
        key=notification["type"]+" "+datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        fb.db.child("notifications").child(key).set(notification, fb.user['idToken'])
        return key
    
    def update(self,key):
        fb.db.child("notifications").child(key).child("fixed").set(True, fb.user['idToken'])
        fb.db.child("notifications").child(key).child("read").set(False, fb.user['idToken'])

notify=Notification()