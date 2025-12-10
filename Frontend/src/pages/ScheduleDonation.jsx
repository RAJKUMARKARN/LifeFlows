import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaHeartbeat, FaSearch } from "react-icons/fa";

import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

/* -------------------------------------------------------
    1. Logo / Header
---------------------------------------------------------*/
const LogoHeader = () => (
  <div className="transition-all duration-300 flex ml-4 mt-4 mb-10">
    <img src="/logo.png" alt="Life Flows Logo" className="w-[48px] h-[48px] mt-[2px]" />

    <div className="ml-[5px] flex flex-col justify-center leading-tight">
      <h1 className="text-[28px] font-bold">Life Flows</h1>
      <p className="text-[12px] font-medium text-[#969696]">Together we flow</p>
    </div>
  </div>
);

/* -------------------------------------------------------
    2. Feature Cards
---------------------------------------------------------*/
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="text-center p-4">
    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600">
      <Icon className="h-6 w-6" />
    </div>

    <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-500">{description}</p>
  </div>
);

const featuresData = [
  { icon: FaCalendarAlt, title: "Easy Scheduling", description: "Find a convenient time slot." },
  { icon: FaMapMarkerAlt, title: "Nearby Locations", description: "Search for centers near you." },
  { icon: FaHeartbeat, title: "Check Eligibility", description: "Quick self-assessment." },
];

/* -------------------------------------------------------
    3. Appointment Form
---------------------------------------------------------*/
const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    location: "",
    date: "",
    timeRange: "",
    bloodType: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://life-flows-7ily.vercel.app/api/schedule_donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const data = await res.json();
    console.log("Saved:", data);

    // Redirect to dashboard after success
    window.location.href = "/dashboard";

  } catch (err) {
    console.error(err);
    alert("Failed to connect to server. Make sure your backend is running.");
  }
};



  const inputClasses =
    "w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 transition duration-150 text-gray-700 placeholder-gray-500";

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto mt-16">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
        Find & Book Your Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="location"
            placeholder="Location (City/ZIP)"
            value={formData.location}
            onChange={handleChange}
            required
            className={inputClasses}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputClasses}
          />

          <select
            name="timeRange"
            value={formData.timeRange}
            onChange={handleChange}
            required
            className={`${inputClasses} text-gray-500`}
          >
            <option value="" disabled>
              Time Range
            </option>
            <option value="morning">Morning (8am - 12pm)</option>
            <option value="afternoon">Afternoon (12pm - 4pm)</option>
          </select>
        </div>

        {/* Blood Type */}
        <div>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className={`${inputClasses} text-gray-500`}
          >
            <option value="" disabled>
              Blood Type (Optional)
            </option>
            <option value="A+">A+</option>
            <option value="O-">O- (Universal Donor)</option>
            <option value="AB+">AB+</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="flex items-center justify-center w-full md:w-auto px-8 py-3 text-base font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 transition"
          >
            <FaSearch className="mr-2" />
            Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

/* -------------------------------------------------------
    4. Main Page
---------------------------------------------------------*/
export default function ScheduleDonation() {
  const navigate = useNavigate();
  const HERO_IMAGE_URL = "/heroSection.png";

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-50">
        <div className="p-10">
          {/* Logo */}
          <LogoHeader />

          {/* Hero Section */}
          <div
            className="relative bg-cover bg-center h-[400px] flex items-center rounded-lg overflow-hidden shadow-lg"
            style={{ backgroundImage: `url(${HERO_IMAGE_URL})` }}
          >
            <div className="absolute inset-0 bg-black opacity-30"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-white">
              <div className="max-w-lg">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                  Save Lives. <br />
                  <span className="block bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent">
                    Be a Blood Hero
                  </span>
                </h1>

                <p className="mt-3 text-xl">
                  Find a convenient time slot and location to donate today.
                </p>

                <button
                href="#appointment-form"
                  className="mt-8 px-6 py-3 bg-red-700 hover:bg-red-800 rounded-md shadow-lg transition text-white"
                >
                  SCHEDULE DONATION
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="py-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresData.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>

          {/* Appointment Form */}
          <div id="appointment-form" className="mb-20">
            <AppointmentForm />
          </div>
        </div>

        <Footer />
      </div>
    </Sidebar>
  );
}
