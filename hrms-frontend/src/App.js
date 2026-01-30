import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Calendar, Users, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import './styles.css'; // Ensure this is imported

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/api' });

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState([]);
  const [view, setView] = useState('employees'); 
  
  // Form States
  const [empForm, setEmpForm] = useState({ emp_id: '', name: '', email: '', department: '' });
  const [attForm, setAttForm] = useState({ user_id: '', date: new Date().toISOString().split('T')[0], status: 'Present' });

  useEffect(() => { 
    fetchEmployees(); 
    fetchTodayAttendance();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) { console.error("Error fetching employees"); }
  };

  const fetchTodayAttendance = async () => {
    try {
      const res = await API.get('/attendance/today');
      setTodayAttendance(res.data);
    } catch (err) { console.error("Error fetching attendance"); }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await API.post('/employee', empForm);
      setEmpForm({ emp_id: '', name: '', email: '', department: '' });
      fetchEmployees();
      alert("Employee added successfully");
    } catch (err) { alert(err.response?.data?.error || "Error adding employee"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    await API.delete(`/employees/${id}`);
    fetchEmployees();
  };

  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      await API.post('/attendance', attForm);
      alert("Attendance marked!");
      fetchTodayAttendance();
    } catch (err) { alert(err.response?.data?.error || "Error marking attendance"); }
  };

  return (
    <div className="app-container">
      {/* Sidebar / Navigation */}
      <aside className="sidebar">
        <div className="brand">
          <h1>HRMS<span className="brand-lite">Lite</span></h1>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-item ${view === 'employees' ? 'active' : ''}`} 
            onClick={() => setView('employees')}
          >
            <Users size={20} /> Employee Management
          </button>
          <button 
            className={`nav-item ${view === 'attendance' ? 'active' : ''}`} 
            onClick={() => setView('attendance')}
          >
            <Calendar size={20} /> Attendance Tracker
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <h2>{view === 'employees' ? 'Overview' : 'Daily Logs'}</h2>
          <span className="date-display">{new Date().toDateString()}</span>
        </header>

        {view === 'employees' ? (
          <div className="content-wrapper fade-in">
            {/* Add Employee Card */}
            <div className="card">
              <div className="card-header">
                <h3><UserPlus size={18} /> Register New Employee</h3>
              </div>
              <form onSubmit={handleAddEmployee} className="clean-form">
                <div className="form-group">
                  <label>Employee ID</label>
                  <input placeholder="e.g. EMP001" value={empForm.emp_id} onChange={e => setEmpForm({...empForm, emp_id: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input placeholder="John Doe" value={empForm.name} onChange={e => setEmpForm({...empForm, name: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input placeholder="john@company.com" type="email" value={empForm.email} onChange={e => setEmpForm({...empForm, email: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input placeholder="Engineering" value={empForm.department} onChange={e => setEmpForm({...empForm, department: e.target.value})} required />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Add Employee</button>
                </div>
              </form>
            </div>

            {/* Employee Table */}
            <div className="card">
              <div className="card-header">
                <h3>Employee Directory</h3>
                <span className="badge-count">{employees.length} Total</span>
              </div>
              <div className="table-container">
                <table className="clean-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Email</th>
                      <th style={{textAlign: 'right'}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.length === 0 ? (
                      <tr><td colSpan="5" className="empty-state">No employees found.</td></tr>
                    ) : (
                      employees.map(e => (
                        <tr key={e.id}>
                          <td className="fw-bold text-primary">{e.emp_id}</td>
                          <td>{e.name}</td>
                          <td><span className="dept-badge">{e.department}</span></td>
                          <td className="text-muted">{e.email}</td>
                          <td style={{textAlign: 'right'}}>
                            <button onClick={() => handleDelete(e.id)} className="btn-icon delete" title="Delete">
                              <Trash2 size={18}/>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="content-wrapper fade-in">
            <div className="grid-layout">
              {/* Mark Attendance Form */}
              <div className="card">
                <div className="card-header">
                  <h3><Calendar size={18} /> Mark Attendance</h3>
                </div>
                <form onSubmit={handleMarkAttendance} className="stack-form">
                  <div className="form-group">
                    <label>Employee</label>
                    <select value={attForm.user_id} onChange={e => setAttForm({...attForm, user_id: e.target.value})} required>
                      <option value="">Select an employee...</option>
                      {employees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.emp_id})</option>)}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Date</label>
                    <input type="date" value={attForm.date} onChange={e => setAttForm({...attForm, date: e.target.value})} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Status</label>
                    <div className="status-selector">
                      <label className={`radio-label ${attForm.status === 'Present' ? 'present-selected' : ''}`}>
                        <input type="radio" name="status" value="Present" checked={attForm.status === 'Present'} onChange={() => setAttForm({...attForm, status: 'Present'})} />
                        Present
                      </label>
                      <label className={`radio-label ${attForm.status === 'Absent' ? 'absent-selected' : ''}`}>
                        <input type="radio" name="status" value="Absent" checked={attForm.status === 'Absent'} onChange={() => setAttForm({...attForm, status: 'Absent'})} />
                        Absent
                      </label>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary full-width">Submit Record</button>
                </form>
              </div>

              {/* Attendance Log Table */}
              <div className="card">
                <div className="card-header">
                  <h3>Today's Logs</h3>
                </div>
                <div className="table-container">
                  <table className="clean-table">
                    <thead>
                      <tr><th>Employee</th><th>Date</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {todayAttendance.length > 0 ? todayAttendance.map((a, i) => (
                        <tr key={i}>
                          <td className="fw-bold">{a.name}</td>
                          <td>{a.date}</td>
                          <td>
                            <span className={`status-pill ${a.status.toLowerCase()}`}>
                              {a.status === 'Present' ? <CheckCircle size={14}/> : <XCircle size={14}/>} 
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="3" className="empty-state">
                            <AlertCircle size={20} className="inline-icon"/> No records found for today
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}