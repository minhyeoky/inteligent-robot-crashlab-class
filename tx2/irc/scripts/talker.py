#!/usr/bin/env python3

import cv2

import rospy
from std_msgs.msg import String

DEV_VIDEO = 1    # dev/video1
WIDTH = 320
HEIGHT = 160
FPS = 30

import sys
import tensorflow as tf
print(sys.version)


def talker():
  pub = rospy.Publisher('chatter', String, queue_size=10)
  rospy.init_node('talker', anonymous=True)
  rate = rospy.Rate(10)    # 10hz

  # Set webcam
  vc = cv2.VideoCapture(DEV_VIDEO)
  vc.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
  vc.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)
  vc.set(cv2.CAP_PROP_FPS, FPS)

  if not vc.isOpened():
    print('Webcam is not opened')

  print('Webcam is connected successfully')

  while not rospy.is_shutdown():
    # status, img = vc.read()
    hello_str = 'Hi'
    vc.read()

    rospy.loginfo(hello_str)
    pub.publish(hello_str)
    rate.sleep()


if __name__ == '__main__':
  try:
    talker()
  except rospy.ROSInterruptException:
    pass
