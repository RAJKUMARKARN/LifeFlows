import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/bloodreq/blood-requests")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.slice(0, 4)); // only first 4
      })
      .catch((err) => console.log("Error loading requests:", err));
  }, []);

  const benefitsData = [
    {
      id: 1,
      title: "Supports Heart Health",
      description:
        "Regular blood donation helps lower excess iron levels, reducing oxidative stress and lowering the risk of heart disease and stroke.",
      logo: "❤️",
    },
    {
      id: 2,
      title: "Improves Blood Flow and Circulation",
      description:
        "Donation reduces blood thickness, improving oxygen and nutrient delivery to your brain, kidneys, and other vital organs.",
      logo: "🧠",
    },
    {
      id: 3,
      title: "Boosts Liver and Kidney Function",
      description:
        "Balanced iron levels reduce strain on your liver and kidneys, helping them filter toxins and function efficiently.",
      logo: "🫁",
    },
  ];

  return (
    <Sidebar>
      {/* animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out both;
          opacity: 0;
        }
      `}</style>

      <div className="flex-1 flex flex-col w-full">

        {/* LOGO */}
        <div className="transition-all duration-300 flex ml-4 mt-4">
          <img src="/logo.png" alt="" className="w-[45px] mt-[2px] h-[45px]" />
          <div className="leading-tight flex flex-col justify-center ml-[5px]">
            <h1 className="text-[28px] font-bold">Life Flows</h1>
            <p className="text-[15px] font-medium text-[#969696]">
              Together we flow
            </p>
          </div>
        </div>

        {/* HERO */}
        <div className="relative fade-up-on-scroll w-full h-[calc(100vh-80px)] mt-4 overflow-hidden rounded-[26px]">
          <img
            src="leftsec3.png"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
            <h1 className="text-[60px] font-bold bg-white bg-clip-text text-transparent drop-shadow-lg">
              Welcome to your Dashboard!
            </h1>
            <p className="text-[20px] font-semibold text-gray-200 mt-3 max-w-[700px]">
              Every action counts toward saving lives. Be the reason someone
              smiles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => navigate("/schedule-donation")}
                className="bg-white text-gray-600 px-6 py-3 rounded-[50px] shadow-lg hover:bg-[#d52d52] hover:text-white transition-all"
              >
                Schedule Donation
              </button>

              <button
                onClick={() => navigate("/request-blood")}
                className="border-2 border-white text-white px-6 py-3 rounded-[50px] shadow-lg hover:bg-white hover:text-gray-600 transition-all"
              >
                Request Blood
              </button>
            </div>
          </div>
        </div>

        {/* ================================
             RECENT BLOOD REQUESTS SECTION
           ================================ */}
        <div className="mt-[70px] mb-[50px] px-6 animate-fadeUp">
          <h1 className="text-[40px] font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent text-center mb-8">
            Recent Blood Requests
          </h1>

          {/* CAROUSEL */}
          <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
            {requests.length > 0 ? (
              requests.map((req) => (
                <div
                  key={req._id}
                  className="min-w-[300px] bg-white rounded-2xl shadow-md p-6 border border-gray-200"
                >
                  <h2 className="text-xl font-bold text-[#d52d52]">
                    {req.bloodType} Needed
                  </h2>

                  <p className="text-gray-700 mt-2">City: {req.city}</p>
                  <p className="text-gray-700">
                    Units Required: {req.units || "N/A"}
                  </p>
                  <p className="text-gray-700">Urgency: {req.urgency}</p>

                  <p className="text-gray-500 text-sm mt-3">
                    Requested: {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No requests found</p>
            )}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/all-blood-requests")}
              className="px-6 py-3 bg-[#d52d52] text-white rounded-full shadow hover:bg-red-600 transition-all"
            >
              View More Requests
            </button>
          </div>
        </div>

        {/* SECOND SECTION */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-[50px] px-6 animate-fadeUp">
          <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
            <img src="secondSection.png" className="w-[400px] rounded-[30px]" />
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-[35px] font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent mb-3">
              What are Blood Donation Camps?
            </h1>
            <p className="text-gray-500 leading-[30px]">
              Rather than going to the hospital to donate blood, we bring the hospital to you. We partner with government recognized blood banks who bring their expert doctors and staff to conduct a clean blood donation camp without any hassles. The camp can be organized in a common area or in a blood donation bus which we can bring. We make all the other arrangements, you just have to provide a ventilated clean area.Now saving lives does not need any travel even, just 20minutes at the camp!
  
            </p>
          </div>
        </div>

        {/* THIRD SECTION */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-[70px] mb-[70px] px-6 animate-fadeUp">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-[35px] font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent mb-3">
              How we make them different
            </h1>
            <p className="text-gray-500 leading-[30px]">
              We do not just help you organize a camp, but we also try to ensure each donor feels special. A blood donation camp can be fun with music, it can have a theme, it can motivate people for greater things. We help you do that, right from motivating people before the camp to ensuring each donor feels a sense of pride and happiness post donation.
      
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <img src="thirdSection.png" className="w-[400px] rounded-[30px]" />
          </div>
        </div>

        {/* BENEFITS */}
        <div className="bg-[#F5F5F7] rounded-[30px] p-10 mt-[50px] mb-[30px] text-center animate-fadeUp">
          <h1 className="text-[40px] text-gray-600 mb-10">
            Benefits of Blood Donation
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitsData.map((b) => (
              <div
                key={b.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{b.logo}</div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent">
                  {b.title}
                </h3>
                <p className="text-gray-600 mt-2">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-[50px] animate-fadeUp">
          <h1 className="text-[60px] bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent">
            Book an Appointment
          </h1>
          <p className="text-gray-600 mt-4 max-w-[700px] mx-auto">
            Organize a blood donation camp in your college, office, or society!
          </p>

          <button
            onClick={() => navigate("/schedule-donation")}
            className="mt-[25px] mb-[30px] bg-gray-700 text-white px-6 py-3 rounded-[50px] shadow-lg hover:bg-[#d52d52] transition-all"
          >
            Schedule Donation
          </button>
        </div>

        <Footer />
      </div>
    </Sidebar>
  );
}
