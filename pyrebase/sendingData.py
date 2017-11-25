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

user = auth.sign_in_with_email_and_password(peppper-bot1, pepper)


#Push Image

imagePath = "images/"+imageName+".jpg"

storage = firebase.storage()

storage.child(imagePath).put(imageName+".jpg", user['idToken'])

imageUrl = storage.child(imagePath).get_url()

#Push data to the database

data = {"name": "Mortimer 'Morty' Smith", "picture": imageUrl, "temperature": temperature, "feedback": childFeedback, "drawing": drawingUrl}
db.child("childs").push(data)


# https://firebasestorage.googleapis.com/v0/b/storage-url.appspot.com/o/images%2Fexample.jpg?alt=media
