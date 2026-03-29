import requests

try:
    response = requests.post('http://localhost:8080/chart-pattern', json={'symbol': 'RELIANCE'})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")