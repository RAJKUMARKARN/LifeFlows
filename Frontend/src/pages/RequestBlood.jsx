import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";

export default function RequestBlood() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="p-10">
        <h1 className="text-4xl font-bold">Schedule Donation</h1>
        <p className="text-gray-500 mt-4">
          This is the schedule donation page.
        </p>
      </div>
    </Sidebar>
  );
}
