#!/usr/bin/env python3
from collections import namedtuple
from enum import Enum

import rospy
from std_msgs.msg import UInt8, String


class Status(Enum):
  Follow = 1
  Donating = 2
  Donated = 3


STATUS = Status.Follow    # default
# 웹, 서보모터(팔), 바퀴모터, 표정
# TODO 양방향 토픽은 이름 분리 해야 하나?
publishers = namedtuple('Publishers', ['web', 'servo', 'motor', 'emotion'])
subscribers = namedtuple('Subscribers', ['web', 'camera'])

Publisher = rospy.Publisher
Subscriber = rospy.Subscriber

publishers.web = Publisher('web', UInt8, queue_size=1)
# publishers.servo = Publisher('servo', Int, queue_size=1)
publishers.wheel = Publisher('motor', UInt8, queue_size=1)

# rospy.init_node('main', anoymous=False)
# subscribers.web = Subscriber('web', Int, queue_size=1)
subscribers.web = Subscriber('camera', String, queue_size=1)

while not rospy.is_shutdown():
  rospy.loginfo('Hi')

# status
# publishers
# subscribes

if __name__ == '__main__':
  pass
