import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ScheduleDonation from "./pages/ScheduleDonation"; 
import RequestBlood from "./pages/RequestBlood";



function App() {
  return (
    <>
   

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schedule-donation" element={<ScheduleDonation />} />
        <Route path="/request-blood" element={<RequestBlood />} />
      </Routes>
    </>
  );
}

export default App;
