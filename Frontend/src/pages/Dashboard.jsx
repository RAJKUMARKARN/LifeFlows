import Sidebar from "../Components/Sidebar";

export default function Dashboard() {
  function useFadeUpAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeUp");
          } else {
            entry.target.classList.remove("animate-fadeUp");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
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
      {/* Inject animation styles here so no global file needed */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation-name: fadeUp;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
          opacity: 0; /* initial opacity so it animates in */
        }
      `}</style>

      <div className="flex-1 flex flex-col w-full">
        {/* Logo and title */}
        <div className="transition-all duration-300 flex ml-4 mt-4">
          <img src="/logo.png" alt="" className="w-[45px] h-[45px]" />
          <div className="leading-tight flex flex-col justify-center ml-[5px] p-[5px]">
            <h1 className="text-[28px] font-bold mb-1">Life Flows</h1>
            <p className="text-[15px] font-medium text-[#969696]">Together we flow</p>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="relative fade-up-on-scroll w-full h-[calc(100vh-80px)] object-cover mt-4 overflow-hidden rounded-[26px]">
          <img
            src="leftsec3.png"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 z-10">
            <h1 className="text-[60px] font-bold bg-white bg-clip-text text-transparent drop-shadow-lg">
              Welcome to your Dashboard!
            </h1>
            <p className="text-[20px] font-semibold text-gray-200 mt-3 max-w-[700px]">
              Welcome! Every action counts toward saving lives. Be the reason someone smiles.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                type="button"
                className="bg-white text-gray-600 px-6 py-3 rounded-[50px] font-semibold transition-all duration-300 shadow-lg hover:bg-[#d52d52] hover:text-white"
              >
                Schedule Donation
              </button>

              <button
                type="button"
                className="bg-transparent border-white border-[2px] text-white px-6 py-3 rounded-[50px] font-semibold transition-all duration-300 shadow-lg hover:bg-white hover:text-gray-600"
              >
                Request Blood
              </button>
            </div>
          </div>
        </div>

        {/* SECOND SECTION */}
        <div
          className="flex flex-col md:flex-row justify-center items-center mt-[70px] mb-[70px] px-6 animate-fadeUp"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <img
              src="secondSection.png"
              alt=""
              className="h-[100%] w-[400px] rounded-[30px] grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col">
            <h1 className="font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent text-[35px] mb-[10px]">
              What are Blood Donation Camps ?
            </h1>
            <p className="text-gray-500 text-[18px] leading-[30px]">
              Rather than going to the hospital to donate blood, we bring the hospital to you. We
              partner with government recognized blood banks who bring their expert doctors and staff
              to conduct a clean blood donation camp without any hassles. The camp can be organized in
              a common area or in a blood donation bus which we can bring. We make all the other
              arrangements, you just have to provide a ventilated clean area. Now saving lives does
              not need any travel even, just 20 minutes at the camp!
            </p>
          </div>
        </div>

        {/* THIRD SECTION */}
        <div
          className="flex flex-col md:flex-row justify-center items-center mt-[70px] mb-[70px] px-6 animate-fadeUp"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="w-full md:w-1/2 flex flex-col mb-6 md:mb-0">
            <h1 className="font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent text-[35px] mb-[10px]">
              How we can make them different
            </h1>
            <p className="text-gray-500 text-[18px] leading-[30px]">
              We do not just help you organize a camp, but we also try to ensure each donor feels
              special. A blood donation camp can be fun with music, it can have a theme, it can
              motivate people for greater things. We help you do that, right from motivating people
              before the camp to ensuring each donor feels a sense of pride and happiness post
              donation.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center">
            <img
              src="thirdSection.png"
              alt=""
              className="h-[100%] w-[400px] rounded-[30px] grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
            />
          </div>
        </div>

        {/* FOURTH SECTION - benefits */}
        <div
          className="flex flex-col font-semibold rounded-[30px] p-[10px] mt-[50px] bg-[#F5F5F7] justify-center items-center mb-[70px] animate-fadeUp"
          style={{ animationDelay: "0.25s" }}
        >
          <h1 className="text-[40px] text-gray-600 mt-[30px] mb-6">Benefits of Blood Donation</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1100px] px-6">
            {benefitsData.map((benefit, i) => (
              <div
                key={benefit.id}
                className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition-all duration-300 animate-fadeUp"
                style={{ animationDelay: `${0.35 + i * 0.12}s` }}
              >
                <div className="text-4xl mb-4">{benefit.logo}</div>
                <h3 className="text-xl font-semibold mb-2 font-bold bg-gradient-to-r from-[#ee0979] to-[#ff6a00] bg-clip-text text-transparent">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FIFTH SECTION */}
        <div
          className="flex flex-col w-[100%] h-[400px] p-[10px] items-center animate-fadeUp"
          style={{ animationDelay: "0.9s" }}
        >
          <h1 className="text-[60px] text-gray-600">Book an Appointment for Donation</h1>
          <p className="text-[15px] mt-[30px] text-center text-gray-500 font-semibold max-w-[900px]">
            You are one step closer to being a superhero. Organize a blood donation camp in your
            college, office, or society and get that superman cape. We would take care of the process
            end-to-end.
          </p>
          <button
            type="submit"
            className="mt-[25px] bg-gray-700 text-white px-6 py-3 rounded-[50px] font-semibold transition-all duration-300 shadow-lg hover:bg-[#d52d52] hover:text-white"
          >
            Schedule Donation
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
