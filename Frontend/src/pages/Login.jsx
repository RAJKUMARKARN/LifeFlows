import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [fbLoaded, setFbLoaded] = useState(false);

  // Load video and Facebook SDK
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.play().catch(() => {});

    const fbScript = document.createElement("script");
    fbScript.src = "https://connect.facebook.net/en_US/sdk.js";
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.onload = () => {
      window.FB.init({
        appId: "1712539006800302",
        cookie: true,
        xfbml: true,
        version: "v17.0",
      });
      setFbLoaded(true);
    };
    document.body.appendChild(fbScript);
  }, []);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const MIN_LOADING_TIME = 800; // milliseconds

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const start = Date.now();

    try {
      const response = await axios.post(
        "https://life-flows-7ily.vercel.app/api/auth/login",
        formData
      );
      const elapsed = Date.now() - start;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
      }
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      const elapsed = Date.now() - start;
      if (elapsed < MIN_LOADING_TIME) {
        await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
      }
      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    if (!fbLoaded) return alert("Facebook SDK not loaded yet.");
    setLoading(true);
    const start = Date.now();

    window.FB.login(
      async (response) => {
        if (response.authResponse) {
          const { accessToken, userID } = response.authResponse;
          try {
            const res = await axios.post(
              "https://life-flows-7ily.vercel.app/api/auth/facebook",
              { accessToken, userID }
            );
            const elapsed = Date.now() - start;
            if (elapsed < MIN_LOADING_TIME) {
              await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
            }
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
          } catch (err) {
            const elapsed = Date.now() - start;
            if (elapsed < MIN_LOADING_TIME) {
              await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
            }
            console.error(err);
            alert("Facebook login failed.");
          } finally {
            setLoading(false);
          }
        } else {
          console.log("User cancelled Facebook login or did not authorize.");
          setLoading(false);
        }
      },
      { scope: "email,public_profile" }
    );
  };

  return (
    <div className="flex w-full h-screen relative">
      {/* Loading Overlay */}
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              border: "4px solid white",
              borderTop: "4px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Left Section */}
      <div className="w-[65%] h-full bg-black">
        <video
          ref={videoRef}
          src="/LifeFlows.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-[35%] h-full bg-white flex flex-col items-center justify-center text-black">
        {/* Branding */}
        <div className="flex h-[55px] w-[200px]">
          <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Welcome */}
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
            className="rounded-md font-medium text-[#848484] focus:bg-white bg-[#EFECEC] p-2 mb-4 w-[380px]"
            required
          />
          <h3 className="font-medium">Password</h3>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md font-medium text-[#848484] focus:bg-white bg-[#EFECEC] p-2 mb-4 w-[380px]"
            required
          />

          {/* Remember Me */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-[#BD1519] w-4 h-4 cursor-pointer" />
              <span className="text-[#737373] font-medium">Remember me</span>
            </label>
            <a href="#" className="text-[#BD1519] font-bold">Forgot Password</a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-gradient-to-b from-[#F2335A] to-[#CD1E2D] hover:from-[#CD1E2D] hover:to-[#F2335A] text-white p-2 rounded-lg font-bold transition-all duration-300 h-[50px] shadow-lg"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-[#5D5D5D] font-medium text-sm">or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                setLoading(true);
                const start = Date.now();
                try {
                  const token = credentialResponse.credential;
                  const res = await axios.post("https://life-flows-7ily.vercel.app/auth/google", { token });
                  const elapsed = Date.now() - start;
                  if (elapsed < MIN_LOADING_TIME) {
                    await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
                  }
                  localStorage.setItem("token", res.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  const elapsed = Date.now() - start;
                  if (elapsed < MIN_LOADING_TIME) {
                    await new Promise((r) => setTimeout(r, MIN_LOADING_TIME - elapsed));
                  }
                  alert("Google login failed. Please try again.");
                } finally {
                  setLoading(false);
                }
              }}
              onError={() => console.error("Google Login Failed")}
            />

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="flex items-center justify-center gap-2 w-[180px] py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          {/* Signup */}
          <p className="text-center text-xs text-[#737373] mt-5">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#BD1519] font-bold">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
