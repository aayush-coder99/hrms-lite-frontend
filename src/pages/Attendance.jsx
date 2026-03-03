import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";

export default function Attendance() {
  const { id } = useParams();
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAttendance = async () => {
    try {
      const res = await API.get(`/attendance/${id}`);
      setRecords(res.data);
    } catch (err) {
      setError("Failed to fetch attendance");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/attendance", {
        employee_id: parseInt(id),
        date: date,
        status: status,
      });

      setDate("");
      fetchAttendance();
    } catch (err) {
      setError("Error marking attendance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">⬅ Back to Employees</Link>

      <h2>Attendance Management</h2>

      {/* Attendance Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="date"
          value={date}
          required
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Mark Attendance"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Attendance Records */}
      <h3>Attendance Records</h3>

      {records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.date}</td>
                <td>{rec.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}