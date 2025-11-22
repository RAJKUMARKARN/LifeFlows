import Sidebar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

export default function ScheduleDonation() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="p-10">
        <div className="transition-all duration-300 flex ml-4 mt-4">
          <img src="/logo.png" alt="" className="w-[48px] mt-[2px] h-[48px]" />
          <div className="leading-tight flex flex-col justify-center ml-[5px]">
            <h1 className="text-[28px] font-bold">Life Flows</h1>
            <p className="text-[12px] font-medium text-[#969696]">Together we flow</p>
          </div>
        </div>
        <h1 className="text-4xl font-bold">Schedule Donation</h1>
        <p className="text-gray-500 mt-4">
          This is the schedule donation page.
        </p>
        <Footer className="b-[3px]"/>
      </div>
    </Sidebar>
  );
}
