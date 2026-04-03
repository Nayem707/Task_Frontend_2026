import { Briefcase, GraduationCap, MapPin } from "lucide-react";

export const AboutTab = ({ user }) => {
  return (
    <div className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
      <h3 className="text-xl font-bold">About {user.firstName || "User"}</h3>

      {/* Info Items */}
      <div className="space-y-3">
        {user.workplace && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Briefcase className="text-gray-500" size={18} />
            <span>
              Works at <span className="font-semibold">{user.workplace}</span>
            </span>
          </div>
        )}
        {user.education && (
          <div className="flex items-center space-x-3 text-gray-700">
            <GraduationCap className="text-gray-500" size={18} />
            <span>
              Studied at <span className="font-semibold">{user.education}</span>
            </span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center space-x-3 text-gray-700">
            <MapPin className="text-gray-500" size={18} />
            <span>
              Lives in <span className="font-semibold">{user.location}</span>
            </span>
          </div>
        )}
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="border-t pt-3">
          <p className="text-gray-700 italic">"{user.bio}"</p>
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between border-t pt-2 text-center">
        <div>
          <div className="text-lg font-bold">{user.followers || 0}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div>
          <div className="text-lg font-bold">{user.following || 0}</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
};
