import requests

url = "http://localhost:8080/api"
response = None
for i in range(1000):
    response = requests.get(url)

if response and response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")