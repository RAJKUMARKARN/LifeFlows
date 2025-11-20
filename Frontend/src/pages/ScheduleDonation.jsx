import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

export default function ScheduleDonation() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="p-10">
        <h1 className="text-4xl font-bold">Schedule Donation</h1>
        <p className="text-gray-500 mt-4">
          This is the schedule donation page.
        </p>
        <Footer/>
      </div>
    </Sidebar>
  );
}
