#!/usr/bin/env python3
from collections import namedtuple
from enum import Enum

import rospy
import ros
from std_msgs.msg import UInt8, String, Float32
from common import Status

WIDTH_THRESHOLD = 0.8
HEIGHT_THRESHOLD = 0.8
STATUS = Status.Follow    # default
WIDTH = 0
HEIGHT = 0
# 웹, 서보모터(팔), 바퀴모터, 표정
# TODO 양방향 토픽은 이름 분리 해야 하나?
publishers = namedtuple('Publishers', ['status'])
subscribers = namedtuple('Subscribers', ['web'])

publishers.status = rospy.Publisher('status', UInt8, queue_size=1)

def callback(status):
  global STATUS
  print(f'[main.py]: got status {status}')
  STATUS = Status(status.data)
  publishers.status.publish(STATUS.value)

subscribers.web = rospy.Subscriber('web', UInt8, callback, queue_size=1)
rospy.init_node('main', anonymous=True)

rate = rospy.Rate(10)

while not rospy.is_shutdown():
  rospy.spin()
  rate.sleep()

# status
# publishers
# subscribes
