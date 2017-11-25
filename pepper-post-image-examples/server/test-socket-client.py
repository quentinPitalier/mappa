import socket
imagePath = "img/center.jpg"
HOST = '172.16.16.131'
PORT = 5000
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_address = (HOST, PORT)
sock.connect(server_address)

try:
    myfile = open(imagePath, 'rb')
    sock.sendall(myfile.read())
    myfile.close()
    json_result = sock.recv(4096)
    sock.sendall("#end")
    print(json_result)
finally:
    sock.close()