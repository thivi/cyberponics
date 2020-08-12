import webData as w
import fb.fbconfig as f
import datetime

print(w.getData())
f.db.child("data").child(datetime.datetime.now().strftime("%Y-%m-%d %H:%M")).set(w.getData(), f.user['idToken'])