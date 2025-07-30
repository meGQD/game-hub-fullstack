import os
import socket
import time 

host = os.environ.get("DB_HOST", 'db')
port = int(os.environ.get("DB_PORT", 5432))

print(f"Waiting for database at {host}:{port}...")

while True:
    try:
        with socket.create_connection((host, port), timeout=1):
            print("Database is ready!")
            break
    except OSError:
        time.sleep(0.1)
