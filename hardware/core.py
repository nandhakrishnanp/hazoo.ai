from ultralytics import YOLO
import requests
import os
import json
import cv2
from math import radians, sin, cos, sqrt, atan2
import serial
import time
from datetime import datetime

# Constants
SERIAL_PORT = '/dev/serial0'
SERIAL_BAUDRATE = 9600
SERIAL_TIMEOUT = 1
VEHICLE_ID = "123"
OUTPUT_IMAGE_PATH = "/home/celestialcoders/project_mark/output.jpg"
MODEL_PATH = "best.pt"
SERVER_URL = "https://hazoo-50027852561.development.catalystappsail.in/test"
STATUS_UPDATE_URL = "https://hazoo-50027852561.development.catalystappsail.in/updateVehicleStatus"
DEFAULT_RTSP_URL = "rtsp://admin:ipl@9094@192.168.1.101:554/Streaming/Channels/801"

# Status update interval (5 minutes in seconds)
STATUS_UPDATE_INTERVAL = 300

# Global variables
latitude_, longitude_ = [0.000, 0.000]
last_status_update = 0

# Initialize serial connection
try:
    ser = serial.Serial(SERIAL_PORT, baudrate=SERIAL_BAUDRATE, timeout=SERIAL_TIMEOUT)
    print(f"✓ Serial connection initialized on {SERIAL_PORT}")
except Exception as e:
    print(f"✗ Failed to initialize serial connection: {e}")
    ser = None

# Set OpenCV FFMPEG options for RTSP streaming
os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'

def updateVehicleStatus():
    """
    Send vehicle status update to server to indicate the vehicle is connected.
    """
    try:
        print("💓 Sending heartbeat status update...")
        
        # Get current location for status update
        lat, lon = getLocation()
        
        data = {
            "id": VEHICLE_ID,
            "latitude": lat,
            "longitude": lon
        }
        
        response = requests.post(STATUS_UPDATE_URL, json=data, timeout=10)
        
        if response.status_code == 200:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"✓ Status update successful at {timestamp}")
            return True
        else:
            print(f"✗ Status update failed with status code: {response.status_code}")
            print(f"📝 Response: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print("✗ Status update timeout")
        return False
    except requests.exceptions.ConnectionError:
        print("✗ Status update connection error")
        return False
    except Exception as e:
        print(f"✗ Error updating vehicle status: {e}")
        return False

def checkAndUpdateStatus():
    """
    Check if it's time to send a status update and send it if needed.
    """
    global last_status_update
    
    current_time = time.time()
    if current_time - last_status_update >= STATUS_UPDATE_INTERVAL:
        if updateVehicleStatus():
            last_status_update = current_time

def sendToServer(data):
    """
    Send hazard detection data and image to the server via HTTP POST request.
    """
    try:
        print("🌐 Preparing to send data to server...")
        print(f"📤 Data to send: {data}")
        
        if not os.path.exists(OUTPUT_IMAGE_PATH):
            print(f"✗ Output image not found at {OUTPUT_IMAGE_PATH}")
            return False
            
        with open(OUTPUT_IMAGE_PATH, "rb") as file:
            files = {
                "image": ("output.jpg", file, "image/jpeg") 
            }
            
            print(f"🚀 Sending request to {SERVER_URL}")
            response = requests.post(SERVER_URL, data=data, files=files, timeout=30)
            
            if response.status_code == 200:
                print("✓ Request successful! Data sent to server.")
                return True
            else:
                print(f"✗ Request failed with status code: {response.status_code}")
                print(f"📝 Response text: {response.text}")
                return False
                
    except requests.exceptions.Timeout:
        print("✗ Request timeout - Server took too long to respond")
        return False
    except requests.exceptions.ConnectionError:
        print("✗ Connection error - Unable to reach server")
        return False
    except Exception as e:
        print(f"✗ Error sending data to server: {e}")
        return False

def runModel(frame):
    """
    Run YOLO model on the given frame to detect hazards.
    Returns detection status, results, and bounding box area.
    """
    try:
        print("🔍 Running hazard detection model...")
        
        area = 0
        model = YOLO(MODEL_PATH)
        class_names = model.names
        results = model(frame)
        detection_type = False
        
        if len(results) > 0 and results[0]:
            print("⚠  HAZARD DETECTED!")
            detection_type = True
            box = results[0].boxes
            
            if len(box) > 0:
                class_id = int(box.cls[0].item())
                class_name = class_names[class_id]
                confidence = box.conf[0].item()
                
                print(f"🎯 Detected: {class_name} (Confidence: {confidence:.2f})")
                
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                area = (x2 - x1) * (y2 - y1)
                
                # Draw bounding box
                color = (0, 255, 0)  # Green
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                label = f"{class_name} {confidence:.2f}"
                cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
                
                print(f"📦 Bounding box area: {area} pixels")
        else:
            print("✓ No hazards detected in current frame")
        
        return [detection_type, results[0], area]
        
    except Exception as e:
        print(f"✗ Error running detection model: {e}")
        return [False, None, 0]

def sendMessage(message):
    """
    Send AT command to GPS module via serial connection and read response.
    """
    try:
        if ser is None:
            print("✗ Serial connection not available")
            return []
            
        print(f"📡 Sending AT command: {message.decode().strip()}")
        ser.write(message)
        time.sleep(1)
        response = ser.readlines()
        
        if response:
            print(f"📨 Received response from GPS module")
        else:
            print("📭 No response from GPS module")
            
        return response
        
    except Exception as e:
        print(f"✗ Error sending message to GPS module: {e}")
        return []

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
        start_lat, start_lon = getLocation()
        
        # Wait for valid GPS coordinates
        while [start_lat, start_lon] == [0.0, 0.0] or [start_lat, start_lon] == [-1.0, -1.0]:
            print("⏳ Waiting for GPS signal...")
            start_lat, start_lon = getLocation()
            time.sleep(2)
        
        print(f"✓ GPS initialized! Starting location: ({start_lat}, {start_lon})")
        return [start_lat, start_lon]
        
    except Exception as e:
        print(f"✗ Error initializing GPS: {e}")
        return [0.0, 0.0]

def getLocation():
    """
    Get current GPS coordinates from the GPS module.
    Returns latitude and longitude as floats.
    """
    try:
        response = sendMessage('AT+CGNSINF\r\n'.encode())
        
        if len(response) > 1:
            location_data = response[1].decode().split(',')[3:5]
            lat, lon = location_data
            
            if lat == '' or lon == '':
                print("📍 GPS coordinates not available")
                return [0.0, 0.0]
            
            coordinates = list(map(float, [lat, lon]))
            print(f"📍 Current location: ({coordinates[0]}, {coordinates[1]})")
            return coordinates
        else:
            print("📍 No valid GPS response received")
            return [-1.0, -1.0]
            
    except Exception as e:
        print(f"✗ Error getting GPS location: {e}")
        return [-1.0, -1.0]

if __name__ == "__main__":
    try:
        print("🚀 Starting Hazard Detection System...")
        print("=" * 50)
        
        # Initialize global variables
        latitude_, longitude_ = [-1, -1]
        last_status_update = time.time()
        
        # Initialize GPS
        start_lat, start_lon = startGps()
        if [start_lat, start_lon] == [0.0, 0.0]:
            print("✗ GPS initialization failed. Exiting...")
            exit(1)
        
        # Setup RTSP connection
        print(f"📹 Connecting to camera: {DEFAULT_RTSP_URL}")
        cap = cv2.VideoCapture(DEFAULT_RTSP_URL, cv2.CAP_FFMPEG)
        
        if not cap.isOpened():
            print("✗ Failed to connect to camera. Exiting...")
            exit(1)
        
        print("✓ Camera connected successfully")
        print("🔄 Starting main detection loop...")
        print("=" * 50)
        
        # Main detection loop
        while cap.isOpened():
            # Check and send status update if needed
            checkAndUpdateStatus()
            
            ret, frame = cap.read()
            detection_type, pic, current_size = [False, 0, 0]
            
            if ret:
                detection_type, pic, current_size = runModel(frame)
            else:
                print("⚠  Failed to read frame from camera")
                continue
            
            # Get current location
            lat, lon = getLocation()
            
            # Handle hazard detection
            if detection_type:
                print("🚨 Hazard detected, updating location and sending data")
                latitude_, longitude_ = [lat, lon]
                
                if pic is not None:
                    pic.save(OUTPUT_IMAGE_PATH)
                    print(f"💾 Image saved to {OUTPUT_IMAGE_PATH}")
                
                # Send hazard detection data
                data = {
                    "location": [latitude_, longitude_],
                    "vehicle_id": VEHICLE_ID
                }
                sendToServer(data)
            
            # Small delay to prevent excessive CPU usage
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\n🛑 System interrupted by user")
    except Exception as e:
        print(f"✗ Critical error in main loop: {e}")
    finally:
        print("🧹 Cleaning up resources...")
        try:
            if 'cap' in locals():
                cap.release()
            cv2.destroyAllWindows()
            if ser is not None:
                ser.close()
            print("✓ Cleanup completed successfully")
        except Exception as e:
            print(f"⚠  Error during cleanup: {e}")
        
        print("👋 Hazard Detection System terminated")