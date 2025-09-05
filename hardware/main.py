from ultralytics import YOLO
import requests
import os
import json
import cv2
from math import radians, sin, cos, sqrt, atan2
import serial
import time
import threading
from datetime import datetime

# Constants
EARTH_RADIUS_KM = 6371
SERIAL_PORT = '/dev/serial0'
SERIAL_BAUDRATE = 9600
SERIAL_TIMEOUT = 1
VEHICLE_ID = "123"
OUTPUT_IMAGE_PATH = "/home/celestialcoders/project_mark/output.jpg"
MODEL_PATH = "best.pt"
SERVER_URL = "https://hazoo-50027852561.development.catalystappsail.in/test"
CONFIG_URL = "https://hazoo-50027852561.development.catalystappsail.in/vehicle/123/config"
STATUS_UPDATE_URL = "https://hazoo-50027852561.development.catalystappsail.in/updateVehicleStatus"
DEFAULT_RTSP_URL = "rtsp://admin:ipl@9094@192.168.1.100:554/Streaming/Channels/801"

# Operation Modes
MODE_MANUAL = 'manual'
MODE_AUTOMATIC = 'automatic'

# Status update interval (5 minutes in seconds)
STATUS_UPDATE_INTERVAL = 60

# Global variables
previous_size, current_size = 0, 0
latitude_, longitude_ = [0.000, 0.000]
status_update_running = True

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
    This function runs in a separate thread and updates every 5 minutes.
    """
    global status_update_running
    
    while status_update_running:
        try:
            print("💓 Sending heartbeat status update...")
            
            data = {
                "id": VEHICLE_ID
            }
            
            response = requests.post(STATUS_UPDATE_URL, json=data, timeout=10)
            
            if response.status_code == 200:
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print(f"✓ Status update successful at {timestamp}")
            else:
                print(f"✗ Status update failed with status code: {response.status_code}")
                print(f"📝 Response: {response.text}")
                
        except requests.exceptions.Timeout:
            print("✗ Status update timeout")
        except requests.exceptions.ConnectionError:
            print("✗ Status update connection error")
        except Exception as e:
            print(f"✗ Error updating vehicle status: {e}")
        
        # Wait for 5 minutes before next update
        time.sleep(STATUS_UPDATE_INTERVAL)

def startStatusUpdates():
    """
    Start the background thread for sending periodic status updates.
    """
    print("🔄 Starting periodic status updates (every 5 minutes)...")
    status_thread = threading.Thread(target=updateVehicleStatus, daemon=True)
    status_thread.start()
    print("✓ Status update thread started")
    return status_thread

def stopStatusUpdates():
    """
    Stop the background status update thread.
    """
    global status_update_running
    print("🛑 Stopping status updates...")
    status_update_running = False

def isDistanceReached(lat1, lon1, lat2, lon2):
    """
    Calculate the distance between two GPS coordinates using Haversine formula.
    Returns distance in kilometers.
    """
    try:
        print(f"📍 Calculating distance between ({lat1}, {lon1}) and ({lat2}, {lon2})")
        
        lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        a = sin(dlat/2)*2 + cos(lat1) * cos(lat2) * sin(dlon/2)*2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        
        distance = EARTH_RADIUS_KM * c
        print(f"📏 Distance calculated: {distance:.3f} km")
        return distance
        
    except Exception as e:
        print(f"✗ Error calculating distance: {e}")
        return 0

def sendToServer(data):
    """
    Send hazard detection data and image to the server via HTTP POST request.
    """
    try:
        print("🌐 Preparing to send data to server...")
        print(f"📤 Data to send: {data}")
        
        json_data = json.dumps(data)
        
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

def getConfig():
    """
    Fetch vehicle configuration from the server.
    Returns configuration dictionary with mode, range, and RTSP settings.
    """
    try:
        print("⚙  Fetching vehicle configuration from server...")
        
        response = requests.get(CONFIG_URL, timeout=10)
        
        if response.status_code == 200:
            config = response.json()[0]
            print("✓ Configuration loaded successfully:")
            print(f"   Mode: {config.get('mode', 'Unknown')}")
            print(f"   Range: {config.get('range', 'Unknown')} km")
            print(f"   RTSP IP: {config.get('rtsp', {}).get('ip', 'Unknown')}")
            return config
        else:
            print(f"✗ Failed to fetch configuration. Status code: {response.status_code}")
            return None
            
    except requests.exceptions.Timeout:
        print("✗ Configuration request timeout")
        return None
    except requests.exceptions.ConnectionError:
        print("✗ Unable to connect to configuration server")
        return None
    except Exception as e:
        print(f"✗ Error fetching configuration: {e}")
        return None

if __name__ == "__main__":
    try:
        print("🚀 Starting Hazard Detection System...")
        print("=" * 50)
        
        # Initialize global variables
        latitude_, longitude_ = [-1, -1]
        
        # Start periodic status updates
        status_thread = startStatusUpdates()
        
        # Get configuration
        
        
        detection_range = 0
        mode = MODE_AUTOMATIC;
        
       
        
        # Initialize GPS
        start_lat, start_lon = startGps()
        if [start_lat, start_lon] == [0.0, 0.0]:
            print("✗ GPS initialization failed. Exiting...")
            exit(1)
        
        # Setup RTSP connection
        # rtsp_config = config.get('rtsp', {})
        # username = rtsp_config.get('username', 'admin')
        # password = rtsp_config.get('password', 'admin')
        # ip = rtsp_config.get('ip', '192.168.103.205')
        
        # rtsp_url = f"rtsp://{username}:{password}@{ip}/cam/realmonitor?channel=1&subtype=0"
        rtsp_url = DEFAULT_RTSP_URL  # Using default for now
        
        # print(f"📹 Connecting to  cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
        #  camera: {rtsp_url}")
        cap =cv2.VideoCapture(0);
      
        if not cap.isOpened():
            print("✗ Failed to connect to camera. Exiting...")
            exit(1)
        
        print("✓ Camera connected successfully")
        print("🔄 Starting main detection loop...")
        print("=" * 50)
        # Main detection loop
        while cap.isOpened():
            open("log.txt","w").close()
            ret, frame = cap.read()
            detection_type, pic, current_size = [False, 0, 0]
            
            if ret:
                detection_type, pic, current_size = runModel(frame)
            else:
                print("⚠  Failed to read frame from camera")
                continue
            
            # Get current location
            lat, lon = getLocation()
            
            # Handle manual mode
            if previous_size < current_size and mode == MODE_MANUAL and detection_type:
                print("🚨 Manual mode: Larger hazard detected, updating location")
                latitude_, longitude_ = [lat, lon]
                if pic is not None:
                    pic.save(OUTPUT_IMAGE_PATH)
                    print(f"💾 Image saved to {OUTPUT_IMAGE_PATH}")
                previous_size = current_size
                
            # Handle automatic mode
            elif mode == MODE_AUTOMATIC and detection_type:
                print("🚨 Automatic mode: Hazard detected, updating location")
                latitude_, longitude_ = [lat, lon]
                if pic is not None:
                    pic.save(OUTPUT_IMAGE_PATH)
                    print(f"💾 Image saved to {OUTPUT_IMAGE_PATH}")
            
            # Send data based on distance (manual mode) or detection (automatic mode)
            if (mode == MODE_MANUAL and 
                isDistanceReached(start_lat, start_lon, lat, lon) >= detection_range):
                
                print("📤 Manual mode: Distance threshold reached, sending data")
                data = {
                    "location": [latitude_, longitude_],
                    "vehicle_id": VEHICLE_ID
                }
                
                if sendToServer(data):
                    start_lat, start_lon = [lat, lon]  # Update reference point
                    
            elif mode == MODE_AUTOMATIC and detection_type:
                print("📤 Automatic mode: Sending hazard detection data")
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
            # Stop status updates
            stopStatusUpdates()
            
            if 'cap' in locals():
                cap.release()
            cv2.destroyAllWindows()
            if ser is not None:
                ser.close()
            print("✓ Cleanup completed successfully")
        except Exception as e:
            print(f"⚠  Error during cleanup: {e}")
        
        print("👋 Hazard Detection System terminated")