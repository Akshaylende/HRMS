from flask import request
from app.init import flask_app
from app.services import add_employee_logic, mark_attendance_logic, get_all_employees, delete_employee_data, attendance_data

@flask_app.route('/')
def home():
    return ('Backend Server Started !')


# Request Handling for Creating an employee entry in our DB 
@flask_app.route('/api/employee', methods=['POST'])
def add_employee():
    return add_employee_logic(request.json)


@flask_app.route('/api/employees')
def get_employees():
    return get_all_employees()
   

# Request Handling for marking attendence for an existing employee
@flask_app.route('/api/attendance', methods=['POST'])
def mark_attendance():
    return mark_attendance_logic(request.json)

@flask_app.route('/api/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    return delete_employee_data(id)


@flask_app.route('/api/attendance/today', methods=['GET'])
def get_today_attendance():
    return attendance_data()