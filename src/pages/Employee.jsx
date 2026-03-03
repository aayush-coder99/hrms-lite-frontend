import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/employees").then(res => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      {employees.map(emp => (
        <div key={emp.id}>
          {emp.full_name} - {emp.department}
          <Link to={`/attendance/${emp.id}`}>Attendance</Link>
        </div>
      ))}
    </div>
  );
}