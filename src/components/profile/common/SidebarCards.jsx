import { Briefcase, GraduationCap, MapPin } from "lucide-react";

export const IntroCard = ({ user = {} }) => {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-xl font-bold">Intro</h3>
      <div className="space-y-3">
        {user.workplace && (
          <div className="flex items-center gap-3 text-gray-700">
            <Briefcase size={16} /> Works at {user.workplace}
          </div>
        )}
        {user.education && (
          <div className="flex items-center gap-3 text-gray-700">
            <GraduationCap size={16} /> Studied at {user.education}
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-3 text-gray-700">
            <MapPin size={16} /> Lives in {user.location}
          </div>
        )}
      </div>
    </div>
  );
};

export const PhotosPreview = ({ photos = [] }) => {
  // Ensure photos is always an array
  const photosList = Array.isArray(photos) ? photos : [];

  if (photosList.length === 0) {
    return null; // Don't render if no photos
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-bold">Photos</h3>
        <span className="cursor-pointer text-sm text-blue-600 hover:underline">
          See all
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {photosList.slice(0, 3).map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            className="h-24 w-full rounded-lg object-cover"
            alt={`photo-${idx}`}
          />
        ))}
      </div>
    </div>
  );
};

export const FriendsPreview = ({ friends = [] }) => {
  // Ensure friends is always an array
  const friendsList = Array.isArray(friends) ? friends : [];

  if (friendsList.length === 0) {
    return null; // Don't render if no friends
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl font-bold">Friends</h3>
        <span className="cursor-pointer text-sm text-blue-600 hover:underline">
          See all friends
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {friendsList.map((friend) => (
          <div key={friend.id} className="flex items-center gap-2">
            <img
              src={friend.avatarUrl || "/images/profile.png"}
              className="h-10 w-10 rounded-full object-cover"
              alt={`${friend.firstName} ${friend.lastName}`}
            />
            <span className="text-sm font-medium">
              {friend.firstName} {friend.lastName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
