import requests
from requests.auth import HTTPBasicAuth
import json
request = ""

def getAccessToken(request):
    consumer_key = '4rsvcauIASiR4RaPSv4eo2KQZCYaJzKB'
    consumer_secret = '3ADc5hecLloPlsOy'
    api_URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    r = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
    mpesa_access_token = json.loads(r.text)
    validated_mpesa_access_token = mpesa_access_token['access_token']
    print(validated_mpesa_access_token)

    getAccessToken(request)