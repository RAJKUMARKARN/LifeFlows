import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // ✅ Add this
import { jwtDecode } from "jwt-decode"; // ✅ Add this
import axios from "axios";

export default function Login() {
 const videoRef = useRef(null); // ✅ Declare ref here

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    }
  }, []);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔹 Send login request to backend
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // 🔹 Save JWT token to localStorage
      localStorage.setItem("token", response.data.token);

      console.log("✅ Login successful:", response.data);

      // 🔹 Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Left Section */}
      <div className="w-[65%] h-full bg-black">
        <video
        ref = {videoRef}
          src="/LifeFlows.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Right Section */}
      <div className="w-[35%] h-full bg-white flex flex-col items-center justify-center text-black">
        {/* Branding */}
        <div className="flex h-[55px] w-[200px]">
          <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Welcome Section */}
        <div className="flex flex-col items-center justify-center mt-[5%] font-bold">
          <h1 className="text-[60px]">Welcome</h1>
          <p className="text-[#9A9A9A] text-[17px] font-normal">
            Sign in to save your Life-saving journey
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col mt-[5%]">
          <h3 className="font-medium">Email</h3>
          <input
            name="email"
            type="email"
            placeholder="yourmail@example.com"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md font-medium text-[#848484] bg-[#EFECEC] p-2 mb-4 w-[380px]"
            required
          />

          <h3 className="font-medium">Password</h3>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md font-medium text-[#848484] bg-[#EFECEC] p-2 mb-4 w-[380px]"
            required
          />

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-[#BD1519] w-4 h-4 cursor-pointer" />
              <span className="text-[#737373] font-medium">Remember me</span>
            </label>
            <a href="#" className="text-[#BD1519] font-bold">
              Forgot Password
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-b from-[#F2335A] to-[#CD1E2D] hover:from-[#CD1E2D] hover:to-[#F2335A] text-white p-2 rounded-lg font-bold transition-all duration-300 h-[50px] shadow-lg"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-[#5D5D5D] font-medium text-sm">
              or continue with
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const token = credentialResponse.credential;
                const userInfo = jwtDecode(token);
                console.log("✅ Google User Info:", userInfo);

                // Send token to backend for verification
                const res = await axios.post("http://localhost:5000/api/auth/google", { token });

                // Save JWT and redirect
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
              } catch (error) {
                console.error("❌ Google Login Failed:", error.response?.data || error.message);
                alert("Google login failed. Please try again.");
              }
            }}
            onError={() => {
              console.error("Google Login Failed");
            }}
          />

            <button
              type="button"
              className="flex items-center justify-center gap-2 w-[180px] py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          {/* Signup Redirect */}
          <p className="text-center text-xs text-[#737373] mt-5">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#BD1519] font-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
