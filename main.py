import scratchattach as scratch3
import sys

userName = input("UserName: ")
password = input("Password: ")
try:
  session = scratch3.login(userName, password) # use password --> caLL 4 imports
except Exception as e:
    print("There was a failure during login: " + type(e).__name__ + " error!")
    sys.exit(1)


if (session.banned):
    print("User: " + userName + ", has been banned from Scratch\n. See you next time!")
    sys.exit(1)

conn = session.connect_cloud("833939168")
user = session.connect_user("2Tables")
print("Cloud variables ready")

while True:
    conn.set_var("test", user.follower_count())
    break
