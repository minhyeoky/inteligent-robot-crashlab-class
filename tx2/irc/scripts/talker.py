#!/usr/bin/env python3

import cv2
from time import time
import sys
import logging

# Imports ROSPY libraries
import rospy
from std_msgs.msg import String

# CONSTANTS
DEV_VIDEO = 1    # dev/video1
WIDTH = 640
HEIGHT = 320
FPS = 30
MODEL_PATH = '/home/crashtx2/catkin_ws/src/irc/model/saved_model'



#################### Tensorflow Load Model ####################
import tensorflow as tf
import numpy as np
logger = tf.get_logger()
logger.setLevel('DEBUG')
logger.debug(sys.version)
logger.debug(tf.__version__)

sess = tf.Session()

_model = tf.saved_model.load(sess,
                             tags=[tf.saved_model.tag_constants.SERVING],
                             export_dir=MODEL_PATH)
_infer = _model.signature_def['serving_default']
logger.debug(_infer.inputs)
logger.debug(_infer.outputs)

_graph = tf.get_default_graph()
logger.debug(_graph)
# input
detection_boxes = _graph.get_tensor_by_name('detection_boxes:0')
detection_scores = _graph.get_tensor_by_name('detection_scores:0')
detection_classes = _graph.get_tensor_by_name('detection_classes:0')
num_detections = _graph.get_tensor_by_name('num_detections:0')

# input
image_tensor = _graph.get_tensor_by_name('image_tensor:0')
logger.debug(num_detections)
logger.debug(detection_scores)
logger.debug(detection_classes)
logger.debug(detection_boxes)

logger.debug(image_tensor)

#################### ROS ####################


def inference(img):
  img = np.expand_dims(img, 0)
  ND, DS, DC, DB = sess.run(
      [num_detections, detection_scores, detection_classes, detection_boxes],
      feed_dict={image_tensor: img})
  output_dict = {
      'num_detections': ND.astype(np.int8),
      'detection_scores': DS,
      'detection_classes': DC.astype(np.int8),
      'detection_boxes': DB
  }
  _num_detections = output_dict['num_detections'][0]
  logger.debug(_num_detections)
  ret_dict = {'detection_boxes': []}

  for i in range(_num_detections):
    DS = output_dict['detection_scores'][i]
    DC = output_dict['detection_classes'][i]
    DB = output_dict['detection_boxes'][i]

    logger.debug(f'detection_scores: {DS}')
    logger.debug(f'detection_classes: {DC}')
    logger.debug(f'detection_boxes: {DB}')
    if DS > 0.8 and DC == 1:
      logger.debug('FOUND')
    ret_dict['detection_boxes'].append(DB)

  return ret_dict


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
    logger.info('Webcam is not opened')

  logger.info('Webcam is connected successfully')

  idx = 0
  start = time()
  while not rospy.is_shutdown():
    # Read Image from Webcam
    status, img = vc.read()

    # detect objects
    if status:
      inference(img)
      logger.debug(img)
    msg = 'cam is working...'

    rospy.loginfo(msg)
    pub.publish(msg)
    rate.sleep()

    # END
    idx += 1
    end = time()
    t = end - start
    if t > 1.:
      logger.debug(f'time passed: {t}')
      logger.debug(f'inference fps: {idx}')
      start = time()
      idx = 0


if __name__ == '__main__':
  try:
    talker()
  except rospy.ROSInterruptException:
    pass
