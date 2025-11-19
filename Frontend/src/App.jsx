import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ScheduleDonation from "./pages/ScheduleDonation"; 
import RequestBlood from "./pages/RequestBlood";
  // ✅ ADD THIS


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/schedule-donation" element={<ScheduleDonation />} />
      <Route path="/request-blood" element={<RequestBlood />} />
    </Routes>
  );
}

export default App;
