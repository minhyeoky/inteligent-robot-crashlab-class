#!/usr/bin/env python3

import cv2
import rospy
from std_msgs.msg import String

DEV_VIDEO = 1  # dev/video1
WIDTH = 320
HEIGHT = 160
FPS = 30

MODEL_PATH = '/home/crashtx2/catkin_ws/src/irc/model/saved_model'

import sys

print(sys.version)

#################### Tensorflow Load Model ####################
import tensorflow as tf

print(tf.__version__)

sess = tf.Session()

_model = tf.saved_model.load(sess,
                             tags=[tf.saved_model.tag_constants.SERVING],
                             export_dir=MODEL_PATH)
_infer = _model.signature_def['serving_default']
print(_infer.inputs)
print(_infer.outputs)

_graph = tf.get_default_graph()
print(_graph)
# input
detection_boxes = _graph.get_tensor_by_name('detection_boxes:0')
detection_scores = _graph.get_tensor_by_name('detection_scores:0')
detection_classes = _graph.get_tensor_by_name('detection_classes:0')

# input
image_tensor = _graph.get_tensor_by_name('image_tensor:0')
print(detection_scores)
print(detection_classes)
print(detection_boxes)

print(image_tensor)


#################### ROS ####################


def talker():
  pub = rospy.Publisher('chatter', String, queue_size=10)
  rospy.init_node('talker', anonymous=True)
  rate = rospy.Rate(10)  # 10hz

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
