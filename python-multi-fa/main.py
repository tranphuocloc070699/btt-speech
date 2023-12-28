import time 
import pyotp 
import qrcode 
import base64
import secrets

random_key = base64.b32encode(secrets.token_bytes(10)).decode('utf-8')

print(random_key)
uri = pyotp.totp.TOTP(random_key).provisioning_uri( 
	name='loctran', 
	issuer_name='demo-2fa'
    ) 

print(uri) 

# Qr code generation step 
qrcode.make(uri).save("qr.png") 


totp = pyotp.TOTP(random_key) 

# verifying the code 
while True: 
    print(totp.verify(input(("Enter the Code : "))))
