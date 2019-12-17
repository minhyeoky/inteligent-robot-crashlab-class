#!/usr/bin/env python3

import rospy
from std_msgs.msg import String, UInt8
from flask import Flask, jsonify, request, abort, send_file
from flask_cors import CORS
from common import Status
from PIL import Image
import sys
from pathlib import Path

status = Status.Follow
node_name = 'web_server'
topic = 'photo'
app = Flask(__name__)
CORS(app)

pub_photo = rospy.Publisher('photo', UInt8, queue_size=1)
pub_web = rospy.Publisher('web', UInt8, queue_size=1)
sub_take = rospy.Subscriber('take', UInt8, lambda x: print("Got taken"))
rospy.init_node(node_name, anonymous=True)
rospy.loginfo(f'rospy {node_name}, topic: {topic} started')
rate = rospy.Rate(10)

@app.route('/test', methods=['GET'])
def get_test():
  return 'Test OK'


@app.route('/status', methods=['POST'])
def post_status():
  global status
  action = request.args.get('action')    # query
  print(f'post_status, action: {action}')
  status = Status(int(action))
  pub_web.publish(status.value)
  return 'POST'


@app.route('/status', methods=['GET'])
def get_status():
  global status
  response = {'status': status.value}
  print(f'get_status, response: {response}')
  return response

@app.route('/take', methods=['GET'])
def take_photo():
  pub_photo.publish(1)
  print('/take')
  rate.sleep()
  return 'Photo - success'
 
@app.route('/photo', methods=['GET'])
def get_photo():
  p = Path('/home/crashtx2/photos')
  p = list(p.glob('*.jpg'))
  f = sorted(p, key=lambda x: int(x.name.split('.')[0]))[-1]
  print(f'/photo: {f}')
  return send_file(str(f), mimetype='image/jpg', cache_timeout=-1)


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5002)
  rospy.spin()
