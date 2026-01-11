import { useEffect, useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import Badge from "../components/ Badge"; // ✅ FIXED IMPORT

// initials helper
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fileRef = useRef(null);

  // ===============================
  // LOAD USER + LOCAL DATA
  // ===============================
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5001/api/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const savedImage = localStorage.getItem(`profileImage_${data._id}`);
        const savedProfession = localStorage.getItem(
          `profession_${data._id}`
        );
        const savedLocation = localStorage.getItem(
          `location_${data._id}`
        );

        setUser({
          ...data,
          profileImage: savedImage || "",
        });

        if (savedProfession) setProfession(savedProfession);
        if (savedLocation) setLocation(savedLocation);
      });
  }, []);

  // ===============================
  // IMAGE CHANGE (INSTANT PREVIEW)
  // ===============================
  const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5001/api/users/profile/image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();

        setUser((prev) => ({
          ...prev,
          profileImage: data.profileImage,
        }));

        // 🔔 NOTIFY OTHER PAGES
        window.dispatchEvent(new Event("profile-updated"));
      };


  // ===============================
  // SAVE TEXT DATA
  // ===============================
  const handleSaveDetails = () => {
    localStorage.setItem(`profession_${user._id}`, profession);
    localStorage.setItem(`location_${user._id}`, location);
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading profile...
      </div>
    );
  }

  return (
    <Sidebar>
      <div className="relative min-h-screen bg-gray-100">
        {/* COVER */}
        <div className="h-64 bg-gradient-to-b from-[#ee0979] to-[#ff6a00]" />

        {/* PROFILE CARD */}
        <div className="absolute left-1/2 top-44 -translate-x-1/2 w-full max-w-5xl bg-white p-6 rounded-xl shadow flex gap-6">
          
          {/* IMAGE */}
          <div
            onClick={() => fileRef.current.click()}
            className="cursor-pointer"
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                className="w-40 h-40 rounded-full border-4 border-white object-cover"
                alt="profile"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold">
                {getInitials(user.name)}
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileRef}
              onChange={handleImageChange}
            />
          </div>

          {/* INFO (MIDDLE) */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>

            {isEditing ? (
              <input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="mt-2 border px-2 py-1 w-full"
              />
            ) : (
              <p className="mt-2">{profession || "Write your profession"}</p>
            )}

            {isEditing ? (
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 border px-2 py-1 w-full"
              />
            ) : (
              <p className="mt-2">
                {location || "Write your location"} ·{" "}
                <span className="text-blue-600">{user.email}</span>
              </p>
            )}

            <div className="mt-4">
              {isEditing ? (
                <button
                  onClick={handleSaveDetails}
                  className="bg-blue-600 text-white px-4 py-1 rounded-full"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="border px-4 py-1 rounded-full"
                >
                  Edit profile
                </button>
              )}
            </div>
          </div>

          {/* BADGES (RIGHT SIDE) */}
          <div className="w-56 hidden md:block">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Badges
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <Badge />
              <Badge />
              <Badge />
              <Badge />
            </div>
          </div>
        </div>

        <div className="pt-56" />
      </div>
    </Sidebar>
  );
};

export default Profile;
