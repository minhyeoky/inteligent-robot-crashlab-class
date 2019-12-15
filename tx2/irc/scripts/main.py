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
subscribers = namedtuple('Subscribers', ['web', 'camera'])

Publisher = rospy.Publisher
Subscriber = rospy.Subscriber

# publishers.web = Publisher('web', UInt8, queue_size=1)
# publishers.servo = Publisher('servo', Int, queue_size=1)
publishers.status = Publisher('status', UInt8, queue_size=1)


def width_callback(x):
  global WIDTH
  print(f'width : {x.data}')
  WIDTH = x.data
  calc_status()


def height_callback(x):
  global HEIGHT
  print(f'height : {x.data}')
  HEIGHT = x.data
  calc_status()


def calc_status():
  global HEIGHT
  global WIDTH
  global STATUS
  if HEIGHT >= HEIGHT_THRESHOLD and WIDTH >= WIDTH_THRESHOLD:
    STATUS = Status.Donating
  else:
    STATUS = Status.Follow

  publishers.status.publish(STATUS.value)
  rate.sleep()
  print(f'Status is : {STATUS.value}')


# subscribers.web = Subscriber('web', UInt8, lambda x: print('web'), queue_size=1)
subscribers.camera = Subscriber('width', Float32, width_callback, queue_size=1)
subscribers.camera = Subscriber('height',
                                Float32,
                                height_callback,
                                queue_size=1)
rospy.init_node('main', anonymous=True)

rate = rospy.Rate(10)

while not rospy.is_shutdown():
  rospy.spin()
  rate.sleep()
  rospy.loginfo('Hi')

# status
# publishers
# subscribes
