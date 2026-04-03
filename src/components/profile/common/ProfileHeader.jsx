import { Camera, User2 } from "lucide-react";

export const ProfileHeader = ({ user = {} }) => {
  const coverPhoto = "https://via.placeholder.com/1920x400?text=Cover+Photo";
  const avatarUrl = user.avatarUrl || "/images/profile.png";

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="relative h-32 overflow-hidden bg-gray-300 sm:h-48 md:h-64">
        <img
          src={coverPhoto}
          alt="Cover"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1920x400?text=Cover+Photo";
          }}
        />
        <div className="absolute right-2 bottom-2 cursor-pointer rounded-full bg-black/50 p-1.5 text-white transition hover:bg-black/70 sm:right-4 sm:bottom-4 sm:p-2">
          <Camera size={16} className="sm:size-[18px]" />
        </div>
      </div>

      {/* Profile Picture Overlay */}
      <div className="absolute -bottom-10 left-3 sm:-bottom-12 sm:left-4 md:-bottom-16 md:left-8">
        <div className="relative">
          {user.avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md sm:h-24 sm:w-24 md:h-32 md:w-32"
              onError={(e) => {
                e.target.src = "/images/profile.png";
              }}
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gray-200 text-2xl font-semibold text-gray-600 shadow-md sm:h-24 sm:w-24 sm:text-3xl md:h-32 md:w-32 md:text-5xl">
              <User2 className="h-16 w-16 text-gray-300" />
            </div>
          )}
          <div className="absolute right-0 bottom-2 cursor-pointer rounded-full border-2 border-white bg-gray-800 p-1 transition hover:bg-gray-900 sm:bottom-4">
            <Camera size={12} className="text-white sm:size-[15px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
