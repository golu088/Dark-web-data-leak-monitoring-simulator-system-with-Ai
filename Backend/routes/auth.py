from flask import Blueprint, request, jsonify

auth_routes = Blueprint('auth_routes', __name__)

users = []

@auth_routes.route('/register', methods=['POST'])
def register():
    data = request.json
    users.append(data)
    return jsonify({'message': 'Registered Successfully'})

@auth_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    for user in users:
        if user['email'] == data['email'] and user['password'] == data['password']:
            return jsonify({'message': 'Login Success'})
    return jsonify({'message': 'Invalid Credentials'})
