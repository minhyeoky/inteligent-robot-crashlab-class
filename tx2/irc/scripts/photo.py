#!/usr/bin/env python3
import cv2
import sys
import rospy
import imageio as io
from std_msgs.msg import UInt8
from pathlib import Path


def callback(x):
    print('taking photo...')

    p = Path('/home/crashtx2/photos')
    if not p.exists():
        p.mkdir()

    latest_idx = None
    try:
        photos = list(p.glob('*.jpg'))
        print('1')
        photos = sorted(photos, key=lambda x: int(x.name.split('.')[0]))
        print(photos)
        latest_idx = int(photos[-1].name.split('.')[0]) + 1
    except:
        # Index error
        print('exception in photo.py latest_idx')
        latest_idx = 1
    try:
        vc = cv2.VideoCapture(1)
        status, img = vc.read()
        vc.release()
        if status:
            print('success!')
            print(img.shape)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            io.imwrite(f'{p}/{latest_idx}.jpg', img[:, :, :])
            pub.publish(1)
            rate.sleep()



    except:
        print("Error in Photo")
        
    

sub = rospy.Subscriber('photo', UInt8, callback, queue_size=1)
pub = rospy.Publisher('take', UInt8, queue_size=1)
rospy.init_node('camera-photo', anonymous=True)
rate = rospy.Rate(10)

while not rospy.is_shutdown():    rospy.spin()
