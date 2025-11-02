import { useState } from "react";
import { Link } from "react-router-dom";


export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the Terms & Privacy Policy.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Sign-up data:", formData);
  };

  const handleGoogleSignIn = () => console.log("Google Sign-In clicked");
  const handleFacebookSignIn = () => console.log("Facebook Sign-In clicked");

  return (
    <div className="flex w-full h-screen">
      {/* Left Section */}
      <div className="w-[65%] h-full bg-black">
        <img
          src="/leftsec3.png"
          alt="Blood donation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section */}
      <div className="w-[35%] h-full bg-white flex flex-col items-center justify-center text-black px-4">
        {/* Branding */}
        <div id="Branding" className="flex h-[45px] w-[160px] mb-2">
          <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Welcome Section */}
        <div id="Welcome" className="flex flex-col items-center justify-center mt-2 font-bold">
          <h1 className="text-[45px] leading-tight">Create Account</h1>
          <p className="text-[#9A9A9A] text-[14px] font-normal text-center mt-1">
            Join us and start your life-saving journey today
          </p>
        </div>

        {/* Sign Up Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-4 w-[320px]"
        >
          <label className="font-medium text-sm mb-1">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-3"
          />

          <label className="font-medium text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="yourmail@example.com"
            value={formData.email}
            onChange={handleChange}
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-3"
          />

          <label className="font-medium text-sm mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-3"
          />

          <label className="font-medium text-sm mb-1">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="rounded-md text-sm text-[#848484] bg-[#EFECEC] p-2 mb-4"
          />

          {/* Terms */}
          <label className="flex items-center space-x-2 mb-4 text-xs">
            <input
              name="agree"
              type="checkbox"
              checked={formData.agree}
              onChange={handleChange}
              className="accent-red-600 w-3.5 h-3.5"
            />
            <span className="text-[#737373] font-medium">
              I agree to the{" "}
              <a href="#" className="text-[#BD1519] font-bold">
                Terms & Privacy
              </a>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-b from-[#F2335A] to-[#CD1E2D] hover:from-[#CD1E2D] hover:to-[#F2335A] text-white p-2 rounded-lg font-semibold text-sm transition-all duration-300 h-[42px] shadow-md"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-[#5D5D5D] font-medium text-xs">
              or continue with
            </span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center gap-3 mt-2">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 w-[140px] py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              <img src="/google.png" alt="Google" className="w-4 h-4" />
              <span className="text-xs font-medium">Google</span>
            </button>

            <button
              type="button"
              onClick={handleFacebookSignIn}
              className="flex items-center justify-center gap-2 w-[140px] py-1.5 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-100 transition"
            >
              <img src="/facebook.png" alt="Facebook" className="w-4 h-4" />
              <span className="text-xs font-medium">Facebook</span>
            </button>
          </div>

          {/* Already have an account */}
          <p className="text-center text-xs text-[#737373] mt-5">
            Already have an account?{" "}
            <Link to="/" className="text-[#BD1519] font-bold">
                Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
