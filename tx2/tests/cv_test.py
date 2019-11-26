import cv2
import matplotlib

matplotlib.use('Agg')
from time import sleep

WIDTH = 320

HEIGHT = 160

FPS = 60

import matplotlib.pyplot as plt

vc = cv2.VideoCapture(1)

vc.set(cv2.CAP_PROP_FRAME_HEIGHT, HEIGHT)
vc.set(cv2.CAP_PROP_FRAME_WIDTH, WIDTH)
vc.set(cv2.CAP_PROP_FPS, FPS)

idx = 0

if not vc.isOpened():
  print('Webcam is not opened')

while True:
  status, img = vc.read()
  break
