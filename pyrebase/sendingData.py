import pyrebase

config = {
  "apiKey": "AIzaSyCzdHfBdkE_TuMO5Tf506QhlQBBjGD9wyM",
  "authDomain": "mappa-29c30.firebaseapp.com",
  "databaseURL": "https://mappa-29c30.firebaseio.com",
  "storageBucket": "mappa-29c30.appspot.com",
}

firebase = pyrebase.initialize_app(config)

# Get a reference to the auth service
auth = firebase.auth()

# Log the user in

user = auth.sign_in_with_email_and_password("peppper-bot1@peppermail.com", "pepper")

#Data to get from the child before sending

childrenName = "Test"
imagePath = "image/TestImage"
imageName = "TestImage"
childrenTemperature = "38"
childFeedback = "Yes/No"
drawingPath = "image/TestDrawing"
drawingName = "TestDraw"

#Push Image

imagePath = "images/"+imageName+".jpg"

storage = firebase.storage()

storage.child(imagePath).put(imageName+".jpg", user['idToken'])

imageUrl = storage.child(imagePath).get_url()

storage.child(drawingPath).put(drawingName+".jpg", user['idToken'])
drawingUrl = storage.child(imagePath).get_url()

#Push data to the database

data = {"name": childrenName, "picture": imageUrl, "temperature": childrenTemperature, "feedback": childFeedback, "drawing": drawingUrl}
db.child("childs").push(data)


# https://firebasestorage.googleapis.com/v0/b/storage-url.appspot.com/o/images%2Fexample.jpg?alt=media
