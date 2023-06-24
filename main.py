import scratchattach as scratch3
import sys

username = input("UserName: ")
password = input("Password: ")
try:
  session = scratch3.login(username, password) # use password --> call for imports
except Exception as e:
    print("There was a " + type(e).__name__ + " error during login")
    sys.exit(1)

if (session.banned):
    print("Unfortunately, you has been banned from Scratch\n. See you next time!")
    sys.exit(1)
