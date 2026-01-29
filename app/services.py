from app.init import db
from app.models import Employee, Attendance
from datetime import datetime
from flask import jsonify

def add_employee_logic(data):
    if Employee.query.filter_by(emp_id=data['emp_id']).first():
        return {"error": "Duplicate ID"}, 400
    
    new_emp = Employee(
        emp_id=data['emp_id'],
        name=data['name'],
        email=data['email'],
        department=data['department']
    )
    db.session.add(new_emp)
    db.session.commit()
    return {"message": "Employee added"}, 201

def mark_attendance_logic(data):
    date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
    record = Attendance(employee_id=data['user_id'], date=date_obj, status=data['status'])
    db.session.add(record)
    db.session.commit()
    return {"message": "Attendance marked"}, 201

def get_all_employees():
    users = Employee.query.all()
    return jsonify([{
        "id": e.id,
        "emp_id": e.emp_id,
        "name": e.name,
        "department": e.department
    } for e in users]), 200
    