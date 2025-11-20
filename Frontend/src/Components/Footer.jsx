export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#ee0979] to-[#ff6a00] rounded-[30px] text-white py-12 shadow-inner">

      <div className="w-full px-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo + Tagline */}
        <div>
          <h1 className="text-3xl font-bold">Life Flows</h1>
          <p className="text-sm mt-2 opacity-90">
            Saving lives, one drop at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm opacity-90">
            <li className="hover:opacity-100 cursor-pointer">Dashboard</li>
            <li className="hover:opacity-100 cursor-pointer">Schedule Donation</li>
            <li className="hover:opacity-100 cursor-pointer">Urgent Requests</li>
            <li className="hover:opacity-100 cursor-pointer">Profile</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-sm">📍 New Delhi, India</p>
          <p className="text-sm mt-1">📧 info@lifeflows.org</p>
          <p className="text-sm mt-1">📞 +91 98765 43210</p>
        </div>

      </div>

      <div className="text-center text-sm mt-10 opacity-80">
        © {new Date().getFullYear()} Life Flows. All rights reserved.
      </div>
    </footer>
  );
}
