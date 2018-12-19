import pyrebase
config = {
  "apiKey": "AIzaSyDM0UCIgf95uQPd1qqIoEC0yHuNeV8HC5w",
  "authDomain": "projectId.firebaseapp.com",
  "databaseURL": "https://cyberponics-2017.firebaseio.com/",
  "storageBucket": "",
  "serviceAccount": "/home/pi/cyberponics/fb/Cyberponics-6dd59832d32f.json"
}
firebase = pyrebase.initialize_app(config)

auth = firebase.auth()
#authenticate a user
user = auth.sign_in_with_email_and_password("thivi94@outlook.com", "deviceCP2017")
db = firebase.database()
