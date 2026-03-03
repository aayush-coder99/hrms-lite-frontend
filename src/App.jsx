import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employees from "./pages/Employee";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Employees />} />
        <Route path="/attendance/:id" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;