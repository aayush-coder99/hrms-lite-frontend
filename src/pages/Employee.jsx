import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/employees", form);
      setForm({
        employee_id: "",
        full_name: "",
        email: "",
        department: "",
      });
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.detail || "Error creating employee");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      setError("Error deleting employee");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>HRMS Lite - Employee Management</h1>

      {/* Create Employee Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Add New Employee</h3>

        <input
          name="employee_id"
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={handleChange}
          required
        />

        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Employee"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      {/* Employee List */}
      <h3>Employee List</h3>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <Link to={`/attendance/${emp.id}`}>
                    <button>Attendance</button>
                  </Link>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    style={{ marginLeft: "10px", background: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}