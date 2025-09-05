import cv2
from ultralytics import YOLO


# Open the default camera (0 for default webcam, change to 1, 2... if using external cameras)
cap = cv2.VideoCapture(0)
model = YOLO(r"best1.pt")
# Check if camera opened successfully
if not cap.isOpened():
    print("Error: Cannot open camera")
    exit()
def runmodel(frame,model_obj): 
    area=0
    class_names = model_obj.names
    results = model_obj(frame)
    dect_type=False
    if(len(results)>0 and results[0]):
        print("----hazard dectected-----")
        dect_type=True
        
    else:
        print("-------Hazard not found------")
    
    

    
    
    return [dect_type,results[0].plot(),area]

# Loop to continuously get frames
while True:
    # Read frame-by-frame
    ret, frame = cap.read()
    [dect_type,pic,cur_size]=runmodel(frame,model)

    # If frame is read correctly, ret is True
    if not ret:
        print("Error: Cannot receive frame")
        break

    # Display the resulting frame
    cv2.imshow('Camera Stream', pic)

    # Press 'q' on the keyboard to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture when done
cap.release()
cv2.destroyAllWindows()
