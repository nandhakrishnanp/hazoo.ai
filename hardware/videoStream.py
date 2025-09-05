from flask import Flask, Response
import cv2
import hardware.demo as demo
import os
import numpy as np


app = Flask(__name__)
os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'
# Open Raspberry Pi camera (use `cv2.VideoCapture(0)` for a USB camera)
rtsp_url ="rtsp://admin:admin@192.168.137.95:1935"
cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)

def generate_frames():
    """Capture frames from webcam and stream via Flask."""
    while True:
        success, frame = cap.read()
        if(success):
            cv2.imshow("rrr",frame)
        modu_ret,frame1=demo.runmodel(frame)
        if(cv2.waitKey(1) and 0xFF==ord('q')):
            cap.release()
            break
        if not modu_ret:
            break

        # Convert frame to JPEG format
        _, buffer = cv2.imencode(".jpg", frame1.plot())
        frame_bytes = buffer.tobytes()

        # Stream as MJPEG response
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    """Flask route for streaming video."""
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    """Main webpage to view the stream."""
    return """<html>
                <head><title>Raspberry Pi Video Stream</title></head>
                <body>
                    <h1>Live Camera Feed From Model</h1>
                    <img src="/video_feed" width="640">
                </body>
              </html>"""

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False, threaded=True)
