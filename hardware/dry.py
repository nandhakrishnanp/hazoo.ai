import os
import cv2
from ultralytics import YOLO
os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'
DEFAULT_RTSP_URL = "rtsp://admin:ipl@9094@192.168.1.100:554/Streaming/Channels/801"

def runModel(frame):
    """
    Run YOLO model on the given frame to detect hazards.
    Returns detection status, results, and bounding box area.
    """
    try:
        print("🔍 Running hazard detection model...")
        
        area = 0
        model = YOLO("best.pt")
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
        
        return results[0];
        
    except Exception as e:
        print(f"✗ Error running detection model: {e}")
        return [False, None, 0]

cap = cv2.VideoCapture(2)

if not cap.isOpened():
    print("Error: Cannot open the RTSP stream.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Cannot grab frame from RTSP stream.")
        break
    cv2.imshow("RTSP Stream", runModel(frame))
    if cv2.waitKey(30) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()