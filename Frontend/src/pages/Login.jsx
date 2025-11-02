export default function Login() {
  return (
    <div className="flex w-full h-screen">
      {/* Left Section (Image) */}
      <div className="w-[65%] h-full bg-black">
        <img
          src="/leftSection.png"
          alt="Blood donation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section (Form or content) */}
      <div className="w-[35%] h-full bg-white flex flex-col items-center justify-center text-black">
        
        {/* Branding */}
        <div id="Branding" className="flex h-[55px] w-[200px]">
          <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Welcome Section */}
        <div
          id="Welcome"
          className="flex flex-col items-center justify-center mt-[5%] font-bold"
        >
          <h1 className="text-[60px]">Welcome</h1>
          <p className="text-[#9A9A9A] text-[17px] font-normal">
            Sign in to save your Life-saving journey
          </p>
        </div>

        {/* Login Form */}
        <form action="POST" className="flex flex-col mt-[5%]">
          <h3 className="font-medium">Email</h3>
          <input
            type="email"
            placeholder="yourmail@example.com"
            className="rounded-md font-medium text-[#848484] bg-[#EFECEC] p-2 mb-4"
          />

          <h3 className="font-medium">Password</h3>
          <input
            type="password"
            placeholder="Password"
            className="w-[380px] rounded-md font-medium text-[#848484] bg-[#EFECEC] p-2 mb-4"
          />

          {/* Remember Me + Forgot Password */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-blue-500 w-4 h-4" />
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
            {/* Google Button */}
            <button className="flex items-center justify-center gap-2 w-[180px] py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition">
              <img src="/google.png" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </button>

            {/* Facebook Button */}
            <button className="flex items-center justify-center gap-2 w-[180px] h-[50px] py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-100 transition">
              <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
