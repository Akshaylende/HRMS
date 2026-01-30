from app.init import db
from app.models import Employee, Attendance
from datetime import datetime
from flask import jsonify

def add_employee_logic(data):
    if Employee.query.filter_by(emp_id=data['emp_id']).first():
        return {"error": "Duplicate ID"}, 400
    print(data)
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
    emp_row = Attendance.query.filter_by(employee_id = data['user_id'], date = date_obj)
    if emp_row:
        return {"error": "Attendance already marked for the emp for today"}, 400
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
        "email": e.email,
        "department": e.department
    } for e in users]), 200


def delete_employee_data(id):
    # Logic: find employee by PK and delete
    from app.models import Employee, db
    emp = Employee.query.get_or_404(id)
    db.session.delete(emp)
    db.session.commit()
    return jsonify({"message": "Employee deleted"}), 200


def attendance_data():
    # Join with Employee to get names in the table
    today = datetime.today().date()
    records = db.session.query(Attendance, Employee).join(
        Employee, Attendance.employee_id == Employee.id
    ).filter(Attendance.date == today).all()

    # records = Attendance.query.all()
    return jsonify([{
        "name": emp.name,
        "status": att.status,
        "date": str(att.date)
    } for att, emp in records])

    