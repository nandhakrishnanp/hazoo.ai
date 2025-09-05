from ultralytics import YOLO
import requests
import os
import json
import cv2
from math import radians, sin, cos, sqrt, atan2
import serial
import time
pre_size,cur_size=0,0
[lat_,lang_]=[0.000,0.000]

ser = serial.Serial('/dev/serial0', baudrate=9600, timeout=1)

model = YOLO(r"best.pt")
print(ser.is_open)
os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'
def isDistanceReached(lat1,lon1,lat2,lon2):
    R = 6371 
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance

def sendToServer(data):

    url = "https://hazoo-50027852561.development.catalystappsail.in/test"
    json_data = json.dumps(data);
   
    with open("/home/celestialcoders/project_mark/output.jpg", "rb") as file:
        
        files = {
        "image": ("output.jpg", file, "image/jpeg") 
        }

        response = requests.post(url,data=data,files=files)
        # print("THARA")
        if response.status_code == 200:
            print("Request successful!")
        else:
            print(f"Request failed with status code: {response.status_code}")
            print("Response text:", response.text)
def runmodel(frame,model_obj): 
    area=0
    class_names = model_obj.names
    results = model_obj(frame)
    dect_type=False
    if(len(results)>0 and results[0]):
        print("----hazard dectected-----")
        dect_type=True
        box=results[0].boxes
        class_id = int(box.cls[0].item())
        
        class_name = class_names[class_id]
        confidence = box.conf[0].item()
        label = f"{class_name} {confidence:.2f}"
        x1, y1, x2, y2 = map(int, box.xyxy[0])  # Convert to int
        area = (x2 - x1) * (y2 - y1)
        #preparing bounding box
        color = (0, 255, 0)  # Green
        cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        label = f"{class_name} {confidence:.2f}"
        cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        

        

        
    else:
        print("-------Hazard not found------")
    
    

    
    
    return [dect_type,results[0],area]

def sendMessage(message):
    
        ser.write(message)
        time.sleep(1)
        response = ser.readlines()
        
        if response:
            print(f"📨 Received response from GPS module")
        else:
            print("📭 No response from GPS module")
            
        return response
        
    

def startGps():
    """
    Initialize GPS module and get initial location coordinates.
    Returns starting latitude and longitude.
    """
    try:
        print("🛰  Initializing GPS module...")
        
        if ser is not None:
            try:
                ser.open()
                print("✓ Serial port opened successfully")
            except:
                print("ℹ  Serial port already open or accessible")
        
        # AT commands to initialize GPS
        at_commands = ['AT', 'AT+CGNSPWR=1']
        
        for command in at_commands:
            print(f"🔧 Executing: {command}")
            sendMessage((command + '\r\n').encode())
            time.sleep(2)
        
        print("📍 Getting initial GPS location...")
        start_lat, start_lon = get_location()
        
        # Wait for valid GPS coordinates
        while [start_lat, start_lon] == [0.0, 0.0] or [start_lat, start_lon] == [-1.0, -1.0]:
            print("⏳ Waiting for GPS signal...")
            start_lat, start_lon = get_location()
            time.sleep(2)
        
        print(f"✓ GPS initialized! Starting location: ({start_lat}, {start_lon})")
        return [start_lat, start_lon]
        
    except Exception as e:
        print(f"✗ Error initializing GPS: {e}")
        return [0.0, 0.0]
      


def send_message(message):
    ser.write(message)  
    print(f"Sent: {message}")
    
    
    return ser.readlines()
def startgps1():
    #sendToServer({"name":"celestialcoders"})
    try:
        ser.open()
    except:
        pass
    li=['AT','AT+CGNSPWR=1']
    for i in li:
        send_message((i+'\r\n').encode())
        time.sleep(2)
    [s_lat,s_lon]=get_location()
    while [s_lat, s_lon] == [0.0, 0.0] or [s_lat, s_lon] == [-1.0, -1.0]:
        [s_lat,s_lon] = get_location()
        print("no location")
        print(s_lat,s_lon)
    
    return [s_lat,s_lon]
def get_location():
    try:
        [lat,lon]=send_message('AT+CGNSINF\r\n'.encode())[1].decode().split(',')[3:5]
        
        if(lat=='' and lon==''):
            return [0.0,0.0]
    except:
        [lat,lon]=[-1,-1]

    return list(map(float,[lat,lon]))
def getConfig():
    resp=requests.get("https://hazoo-50027852561.development.catalystappsail.in/vehicle/123")
    if(resp.status_code==200):
        print(resp.json())
        return resp.json()[0]

if __name__=="__main__":
    
    
    [lat_,lon_]=[-1,-1]
    
    Config=getConfig()
    
    range=0
    if(Config['mode']=='Manual'):
        range=Config['range']
            
    [st_lat,st_lon]=startgps1()
    print(st_lat,st_lon)
    [km_level,username,pwd,ip]=[range,Config['rtsp']['username'],Config['rtsp']['password'],Config['rtsp']['ip']]
    #cap=cv2.VideoCapture(f"rtsp://{username}:{pwd}@{ip}/cam/realmonitor?channel=1&subtype=0", cv2.CAP_FFMPEG)
    rtsp_url ="rtsp://admin:admin@192.168.137.95:1935"
    # cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
    cap=cv2.VideoCapture(0)
    while(cap.isOpened()):
        
        ret, frame = cap.read()
        [dect_type,pic,cur_size]=[False,0,0]
        if(ret==True):
            [dect_type,pic,cur_size]=runmodel(frame,model)
            
            
        else:
            print("frame not found")
       

        [lat,lon]=get_location()
        if(cv2.waitKey(1) and 0xFF==ord('q')):
            cap.release()
            break
        if(pre_size<cur_size and Config['mode']=='Manual' and dect_type):
            [lat_,lon_]=[lat,lon]
            pic[-1].save("output.jpg")
            pre_size=cur_size  
        elif(Config['mode']=='Automatic' and dect_type):
            [lat_,lon_]=[lat,lon]
            pic[-1].save("output.jpg")
        if(isDistanceReached(st_lat,st_lon,lat,lon)>=km_level and Config['mode']=='Manual'):
          
            data={}
           
            data["location"]=[lat_,lon_]
            data["vehicle_id"]="123"
            sendToServer(data)
            [st_lat,st_lon]=[lat,lon]
        elif(Config['mode']=='Automatic' and dect_type):
            data={}
            
            data["location"]=[lat_,lon_]
            data["vehicle_id"]="123"
            sendToServer(data)
            
    

    cv2.destroyAllWindows()
        
