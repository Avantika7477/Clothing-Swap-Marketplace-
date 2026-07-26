import { useRef, useState } from "react";
import { HiCamera } from "react-icons/hi";

const ProfilePictureUpload = () => {
  const inputRef = useRef(null);

  const [image, setImage] = useState(
    localStorage.getItem("profileImage") || "",
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImage(imageUrl);

    localStorage.setItem("profileImage", imageUrl);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">Profile Picture</h2>

      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={image || "https://via.placeholder.com/180x180?text=Profile"}
            alt="Profile"
            className="w-44 h-44 rounded-full object-cover border-4 border-green-500"
          />

          <button
            onClick={() => inputRef.current.click()}
            className="absolute bottom-2 right-2 bg-moss-800 hover:bg-moss-700 text-white p-3 rounded-full transition"
          >
            <HiCamera className="text-xl" />
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />

        <p className="mt-4 text-gray-500 text-center">
          Click the camera icon to upload a new profile picture.
        </p>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
