#!/usr/bin/env python3

# import rospy
# from std_msgs.msg import String, UInt8
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from common import Status
import sys

status = Status.Follow
node_name = 'web_server'
topic = 'web'

app = Flask(__name__)
CORS(app)

# pub = rospy.Publisher(topic, UInt8, queue_size=1)
# # sub = rospy.Subscriber('status', UInt8,
# #                        lambda x: print(f"Got status, {x.data}"))
# rospy.init_node(node_name, anonymous=True)
# rospy.loginfo(f'rospy {node_name}, topic: {topic} started')


@app.route('/test', methods=['GET'])
def get_test():
  # pub.publish(0)
  # rospy.loginfo('Http response /test OK')
  return 'Test OK'


@app.route('/status', methods=['POST'])
def post_status():
  global status
  action = request.args.get('action')    # query
  print(f'post_status, action: {action}')
  status = Status(int(action))
  return 'POST'


@app.route('/status', methods=['GET'])
def get_status():
  global status
  response = {'status': status}
  print(f'get_status, response: {response}')
  return response


if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5002)
  # rospy.spin()
