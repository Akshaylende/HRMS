import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserPlus, Calendar, Users, AlertCircle, Loader2 } from 'lucide-react';

const API = axios.create({ baseURL: 'http://127.0.0.1:5000/api' });

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'attendance'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchEmployees(); }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
      setError(null);
    } catch (err) {
      setError("Cannot connect to backend. Is the Flask server running?");
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (id, status) => {
    try {
      await API.post('/attendance', { user_id: id, date: new Date().toISOString().split('T')[0], status });
      alert("Success!");
    } catch (err) {
      alert(err.response?.data?.error || "Error marking attendance");
    }
  };

  return (
    <div className="layout">
      <header className="main-header">
        <h1>HRMS <span>Lite</span></h1>
        <div className="nav-group">
          <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>Directory</button>
          <button onClick={() => setView('attendance')} className={view === 'attendance' ? 'active' : ''}>Attendance</button>
        </div>
      </header>

      {error && <div className="error-banner"><AlertCircle size={18}/> {error}</div>}

      <main className="card">
        {loading ? (
          <div className="state-msg"><Loader2 className="spinner" /> Loading Data...</div>
        ) : employees.length === 0 ? (
          <div className="state-msg">No employees found. Please add one.</div>
        ) : (
          <table>
            <thead>
              <tr><th>ID</th><th>Name</th><th>Department</th><th style={{textAlign:'right'}}>Actions</th></tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td><strong>{emp.emp_id}</strong></td>
                  <td>{emp.name}</td>
                  <td>{emp.department}</td>
                  <td style={{textAlign:'right'}}>
                    {view === 'attendance' ? (
                      <div className="btn-group">
                        <button className="btn-p" onClick={() => markAttendance(emp.id, 'Present')}>P</button>
                        <button className="btn-a" onClick={() => markAttendance(emp.id, 'Absent')}>A</button>
                      </div>
                    ) : (
                      <button className="btn-del">Delete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}