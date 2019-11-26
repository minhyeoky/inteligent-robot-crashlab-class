import cv2
import matplotlib
from time import sleep

matplotlib.use('Agg')
import matplotlib.pyplot as plt

CAP_DSHOW = 700

vc = cv2.VideoCapture(CAP_DSHOW)
idx = 0

while True:
    status, img = vc.read()
    print(f'C920 - {idx} - {status}')
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    plt.imshow(img)
    plt.savefig('./test.png')
    plt.close()
    key = cv2.waitKey(1)
    print(f'C920 - key - {key}')
    if key & 0xff == ord('q'):
        break
