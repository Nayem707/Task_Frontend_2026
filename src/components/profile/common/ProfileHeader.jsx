import { Camera } from "lucide-react";

export const ProfileHeader = ({ user = {} }) => {
  const coverPhoto = "https://via.placeholder.com/1920x400?text=Cover+Photo";
  const avatarUrl = user.avatarUrl || "/images/profile.png";

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="relative h-48 overflow-hidden bg-gray-300 md:h-64">
        <img
          src={coverPhoto}
          alt="Cover"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1920x400?text=Cover+Photo";
          }}
        />
        <div className="absolute right-4 bottom-4 cursor-pointer rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70">
          <Camera size={18} />
        </div>
      </div>

      {/* Profile Picture Overlay */}
      <div className="absolute -bottom-12 left-4 md:-bottom-16 md:left-8">
        <div className="relative">
          <img
            src={avatarUrl}
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md md:h-32 md:w-32"
            onError={(e) => {
              e.target.src = "/images/profile.png";
            }}
          />
          <div className="absolute right-0 bottom-0 cursor-pointer rounded-full border-2 border-white bg-gray-800 p-1 transition hover:bg-gray-900">
            <Camera size={12} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};
