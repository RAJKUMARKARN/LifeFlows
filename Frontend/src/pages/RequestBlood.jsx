import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { FiUser, FiPhone, FiMapPin, FiDroplet, FiHome, FiInfo } from "react-icons/fi";

export default function RequestBlood() {
  const [formData, setFormData] = useState({
    patientName: "",
    hospitalName: "",
    bloodGroup: "",
    units: "",
    city: "",
    contact: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/bloodreq/request-blood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Blood request successfully submitted!");
        window.location.href = "/dashboard";

        setFormData({
          patientName: "",
          hospitalName: "",
          bloodGroup: "",
          units: "",
          city: "",
          contact: "",
          notes: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      alert("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <Sidebar>
      <div className="min-h-screen flex flex-col p-10 w-full items-center">
        <div className="transition-all duration-300 flex ml-4 mt-4 mb-6">
          <img src="/logo.png" alt="" className="w-[48px] mt-[2px] h-[48px]" />
          <div className="leading-tight flex flex-col justify-center ml-[5px]">
            <h1 className="text-[28px] font-bold">Life Flows</h1>
            <p className="text-[12px] font-medium text-[#969696]">Together we flow</p>
          </div>
        </div>

        <h1 className="text-[40px] font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent">
          Blood Request Form
        </h1>
        <p className="text-gray-500 text-center mt-1 max-w-[600px]">
          Provide patient and hospital details to initiate a verified emergency blood request.
        </p>

        <div className="mt-8 bg-white shadow-xl border border-gray-200 p-10 rounded-2xl w-full max-w-[850px]">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-[30px]"
          >

            <div>
              <label className="font-semibold text-gray-700">Patient Name</label>
              <div className="flex rounded-md bg-[#EFECEC] p-2 mt-1 text-[#848484]">
                <FiUser className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Hospital Name</label>
              <div className="flex rounded-md bg-[#EFECEC] p-2 mt-1 text-[#848484]">
                <FiHome className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Ex: Apollo Hospital"
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Blood Group</label>
              <div className="flex rounded-md bg-[#EFECEC] p-2 text-[#848484]">
                <FiDroplet className="text-red-500 mr-3" />
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none"
                  required
                >
                  <option value="">Choose group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>O+</option><option>O-</option>
                  <option>AB+</option><option>AB-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Units Required</label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleChange}
                placeholder="Ex: 2"
                className="flex rounded-md bg-[#EFECEC] p-2 mt-1 text-[#848484] outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">City</label>
              <div className="flex rounded-md bg-[#EFECEC] p-2 mt-1 text-[#848484]">
                <FiMapPin className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Ex: Mumbai"
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Contact Number</label>
              <div className="flex rounded-md bg-[#EFECEC] p-2 mt-1 text-[#848484]">
                <FiPhone className="text-gray-500 mr-3" />
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Ex: 9876543210"
                  className="w-full bg-transparent outline-none"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700">
                Additional Notes (Optional)
              </label>
              <div className="flex rounded-md bg-[#EFECEC] p-2 mt-1 text-[#848484]">
                <FiInfo className="text-gray-500 mr-3 mt-1" />
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the situation if needed…"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-b from-[#F2335A] to-[#CD1E2D] hover:from-[#CD1E2D] hover:to-[#F2335A] text-white p-2 rounded-lg font-bold transition-all duration-300 h-[50px] w-[300px] shadow-lg"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>

          </form>
        </div>

        <div className="w-full mt-[50px]">
          <Footer />
        </div>

      </div>
    </Sidebar>
  );
}
