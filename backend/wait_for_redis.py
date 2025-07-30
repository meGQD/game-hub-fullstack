import os
import socket
import time 

host = os.environ.get("REDIS_HOST", 'redis')
port = int(os.environ.get("REDIS_PORT", 6379))

print(f"Waiting for redis at {host}:{port}...")

while True:
    try:
        with socket.create_connection((host, port), timeout=1):
            print("Redis is ready!")
            break
    except OSError:
        time.sleep(0.1)
