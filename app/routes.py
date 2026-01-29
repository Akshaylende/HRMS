from flask import request
from app.init import flask_app
from app.services import add_employee_logic, mark_attendance_logic

@flask_app.route('/')
def home():
    return ('Backend Server Started !')


# Request Handling for Creating an employee entry in our DB 
@flask_app.route('/api/employees', methods=['POST'])
def add_employee():
    return add_employee_logic(request.json)


# Request Handling for marking attendence for an existing employee
@flask_app.route('/api/attendance', methods=['POST'])
def mark_attendance():
    return mark_attendance_logic(request.json)