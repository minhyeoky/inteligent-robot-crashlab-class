#!/usr/bin/env python3

import cv2
import sys
from time import time

import imageio as io
import rospy
from object_detection.utils import visualization_utils as vis_util
from std_msgs.msg import String

# CONSTANTS
GIF_FILE_PATH = '/home/crashtx2/TEST.gif'
MAX_RUN_TIME_SEC = -1
PERSON_CLASSID = 1
THRESHOLD_PERSON = 0.5
DEV_VIDEO = 1    # dev/video1
WIDTH = 300
HEIGHT = 300
FPS = 10
MODEL_PATH = '/home/crashtx2/catkin_ws/src/irc/model/saved_model'
IMGS_FOR_GIF = []

# yapf: disable
# COCO Dataset class names...
category_index = {1: {'id': 1, 'name': 'person'},
                  2: {'id': 2, 'name': 'bicycle'},
                  3: {'id': 3, 'name': 'car'},
                  4: {'id': 4, 'name': 'motorcycle'},
                  5: {'id': 5, 'name': 'airplane'},
                  6: {'id': 6, 'name': 'bus'},
                  7: {'id': 7, 'name': 'train'},
                  8: {'id': 8, 'name': 'truck'},
                  9: {'id': 9, 'name': 'boat'},
                  10: {'id': 10, 'name': 'traffic light'},
                  11: {'id': 11, 'name': 'fire hydrant'},
                  13: {'id': 13, 'name': 'stop sign'},
                  14: {'id': 14, 'name': 'parking meter'},
                  15: {'id': 15, 'name': 'bench'},
                  16: {'id': 16, 'name': 'bird'},
                  17: {'id': 17, 'name': 'cat'},
                  18: {'id': 18, 'name': 'dog'},
                  19: {'id': 19, 'name': 'horse'},
                  20: {'id': 20, 'name': 'sheep'},
                  21: {'id': 21, 'name': 'cow'},
                  22: {'id': 22, 'name': 'elephant'},
                  23: {'id': 23, 'name': 'bear'},
                  24: {'id': 24, 'name': 'zebra'},
                  25: {'id': 25, 'name': 'giraffe'},
                  27: {'id': 27, 'name': 'backpack'},
                  28: {'id': 28, 'name': 'umbrella'},
                  31: {'id': 31, 'name': 'handbag'},
                  32: {'id': 32, 'name': 'tie'},
                  33: {'id': 33, 'name': 'suitcase'},
                  34: {'id': 34, 'name': 'frisbee'},
                  35: {'id': 35, 'name': 'skis'},
                  36: {'id': 36, 'name': 'snowboard'},
                  37: {'id': 37, 'name': 'sports ball'},
                  38: {'id': 38, 'name': 'kite'},
                  39: {'id': 39, 'name': 'baseball bat'},
                  40: {'id': 40, 'name': 'baseball glove'},
                  41: {'id': 41, 'name': 'skateboard'},
                  42: {'id': 42, 'name': 'surfboard'},
                  43: {'id': 43, 'name': 'tennis racket'},
                  44: {'id': 44, 'name': 'bottle'},
                  46: {'id': 46, 'name': 'wine glass'},
                  47: {'id': 47, 'name': 'cup'},
                  48: {'id': 48, 'name': 'fork'},
                  49: {'id': 49, 'name': 'knife'},
                  50: {'id': 50, 'name': 'spoon'},
                  51: {'id': 51, 'name': 'bowl'},
                  52: {'id': 52, 'name': 'banana'},
                  53: {'id': 53, 'name': 'apple'},
                  54: {'id': 54, 'name': 'sandwich'},
                  55: {'id': 55, 'name': 'orange'},
                  56: {'id': 56, 'name': 'broccoli'},
                  57: {'id': 57, 'name': 'carrot'},
                  58: {'id': 58, 'name': 'hot dog'},
                  59: {'id': 59, 'name': 'pizza'},
                  60: {'id': 60, 'name': 'donut'},
                  61: {'id': 61, 'name': 'cake'},
                  62: {'id': 62, 'name': 'chair'},
                  63: {'id': 63, 'name': 'couch'},
                  64: {'id': 64, 'name': 'potted plant'},
                  65: {'id': 65, 'name': 'bed'},
                  67: {'id': 67, 'name': 'dining table'},
                  70: {'id': 70, 'name': 'toilet'},
                  72: {'id': 72, 'name': 'tv'},
                  73: {'id': 73, 'name': 'laptop'},
                  74: {'id': 74, 'name': 'mouse'},
                  75: {'id': 75, 'name': 'remote'},
                  76: {'id': 76, 'name': 'keyboard'},
                  77: {'id': 77, 'name': 'cell phone'},
                  78: {'id': 78, 'name': 'microwave'},
                  79: {'id': 79, 'name': 'oven'},
                  80: {'id': 80, 'name': 'toaster'},
                  81: {'id': 81, 'name': 'sink'},
                  82: {'id': 82, 'name': 'refrigerator'},
                  84: {'id': 84, 'name': 'book'},
                  85: {'id': 85, 'name': 'clock'},
                  86: {'id': 86, 'name': 'vase'},
                  87: {'id': 87, 'name': 'scissors'},
                  88: {'id': 88, 'name': 'teddy bear'},
                  89: {'id': 89, 'name': 'hair drier'},
                  90: {'id': 90, 'name': 'toothbrush'}}
# yapf: enable
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
# outputs
detection_boxes = _graph.get_tensor_by_name('detection_boxes:0')
detection_scores = _graph.get_tensor_by_name('detection_scores:0')
detection_classes = _graph.get_tensor_by_name('detection_classes:0')
num_detections = _graph.get_tensor_by_name('num_detections:0')
logger.debug(num_detections)
logger.debug(detection_scores)
logger.debug(detection_classes)
logger.debug(detection_boxes)

# input
image_tensor = _graph.get_tensor_by_name('image_tensor:0')

logger.debug(image_tensor)

#################### ROS ####################


def inference(img: np.ndarray) -> dict:
  img_orig = np.copy(img)
  img = np.expand_dims(img, 0)
  ND, DS, DC, DB = sess.run(
      [num_detections, detection_scores, detection_classes, detection_boxes],
      feed_dict={image_tensor: img})
  output_dict = {
      'num_detections': ND.astype(np.int8)[0],
      'detection_scores': DS[0],
      'detection_classes': DC.astype(np.int8)[0],
      'detection_boxes': DB[0]
    # Detection box, name: detection_boxes.
    # Contains detection boxes coordinates in format [y_min, x_min, y_max, x_max],
    # where (x_min, y_min) are coordinates of the top left corner,
    # (x_max, y_max) are coordinates of the right bottom corner.
    # Coordinates are rescaled to input image size
  }

  def _vis_img(image):
    return vis_util.visualize_boxes_and_labels_on_image_array(
        image=image,
        boxes=output_dict['detection_boxes'],
        classes=output_dict['detection_classes'],
        scores=output_dict['detection_scores'],
        category_index=category_index,
        min_score_thresh=THRESHOLD_PERSON,
        use_normalized_coordinates=True,
        line_thickness=5)

  _num_detections = output_dict['num_detections']
  logger.debug(f'_num_detections: {_num_detections}')
  ret_dict = {'detection_boxes': []}
  # logger.debug(f'output_dict: {output_dict}')
  for i in range(_num_detections):

    _ds = output_dict['detection_scores'][i]
    _dc = output_dict['detection_classes'][i]
    _db = output_dict['detection_boxes'][i]
    logger.debug(f'FOUND, class: {_dc}, score: {_ds}')
    logger.debug(f'Bounding Box: {_db}')

    if _ds > THRESHOLD_PERSON and _dc == PERSON_CLASSID:
      ret_dict['detection_boxes'].append(_db)

  direction = get_direction(ret_dict['detection_boxes'])
  category_index[1]['name'] = direction

  img_with_boxes_and_labels = _vis_img(img_orig)
  IMGS_FOR_GIF.append(img_with_boxes_and_labels)

  return ret_dict


def get_direction(boxes: list) -> list:
  direction = 0
  largest_person = -1

  for each in boxes:
    y_min, y_max = each[0], each[2]
    x_min, x_max = each[1], each[3]
    area = y_max - y_min
    x_center = x_min + (x_max - x_min) / 2

    if largest_person < area:
      direction = x_center
      largest_person = area
  return direction


def talker():
  pub = rospy.Publisher('chatter', String, queue_size=1)
  rospy.init_node('talker', anonymous=True)
  rate = rospy.Rate(10)    # 10hz

  # Set webcam
  vc = cv2.VideoCapture(DEV_VIDEO)
  vc.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
  vc.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)
  vc.set(cv2.CAP_PROP_FPS, FPS)

  _, img = vc.read()
  logger.info(f'image\' shape from webcam: {img.shape}')
  if not vc.isOpened():
    logger.info('Webcam is not opened')
    sys.exit(0)

  logger.info('Webcam is connected successfully')

  idx = 0
  idx_total = 0
  start = time()
  while not rospy.is_shutdown():
    # Read Image from Webcam
    status, img = vc.read()
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # detect objects
    if status:
      bbs: dict = inference(img)
      direction = get_direction(bbs['detection_boxes'])
      logger.info(direction)
      msg = str(direction)
      rospy.loginfo(msg)
      pub.publish(msg)
      rate.sleep()

    # END
    idx += 1
    end = time()
    t = end - start
    if t >= 1.:
      idx_total += 1
      logger.debug(f'time passed: {t}')
      logger.info(f'inference fps: {idx}')
      start = time()
      idx = 0
    if idx_total > MAX_RUN_TIME_SEC:
      if MAX_RUN_TIME_SEC < 0:
        continue
      break

  if 0 < MAX_RUN_TIME_SEC <= 30:
    with io.get_writer(GIF_FILE_PATH, mode='I', duration=0.1) as writer:
      for img in IMGS_FOR_GIF:
        writer.append_data(img)


if __name__ == '__main__':
  try:
    talker()
  except rospy.ROSInterruptException:
    pass
