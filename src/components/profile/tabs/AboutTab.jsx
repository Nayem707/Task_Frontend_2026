import {
  Briefcase,
  GraduationCap,
  MapPin,
  Heart,
  Calendar,
  Link,
  Mail,
  Phone,
  Cake,
  Users,
} from "lucide-react";

export const AboutTab = ({ user }) => {
  // Default user data with extra fields for demonstration
  const {
    firstName = "Emily",
    workplace = "Creative Studio Inc.",
    education = "University of Arts, London",
    location = "San Francisco, California",
    bio = "Digital creator & traveler 🌍 | Coffee enthusiast ☕ | Spreading positivity ✨",
    followers = 1245,
    following = 832,
    relationship = "In a relationship",
    birthday = "March 15, 1992",
    website = "emilyjohnson.art",
    email = "emily@example.com",
    phone = "+1 (555) 123-4567",
    joined = "Joined March 2018",
  } = user;

  return (
    <div className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
      <h3 className="text-xl font-bold">About {firstName}</h3>
      <hr className="border-gray-200" />

      {/* Basic info grid (two columns on larger screens) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {workplace && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Briefcase className="text-gray-500" size={18} />
            <span>
              Works at <span className="font-semibold">{workplace}</span>
            </span>
          </div>
        )}
        {education && (
          <div className="flex items-center space-x-3 text-gray-700">
            <GraduationCap className="text-gray-500" size={18} />
            <span>
              Studied at <span className="font-semibold">{education}</span>
            </span>
          </div>
        )}
        {location && (
          <div className="flex items-center space-x-3 text-gray-700">
            <MapPin className="text-gray-500" size={18} />
            <span>
              Lives in <span className="font-semibold">{location}</span>
            </span>
          </div>
        )}
        {relationship && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Heart className="text-gray-500" size={18} />
            <span>{relationship}</span>
          </div>
        )}
        {birthday && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Cake className="text-gray-500" size={18} />
            <span>Born {birthday}</span>
          </div>
        )}
        {website && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Link className="text-gray-500" size={18} />
            <a
              href={`https://${website}`}
              className="text-blue-600 hover:underline"
            >
              {website}
            </a>
          </div>
        )}
        {email && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="text-gray-500" size={18} />
            <span>{email}</span>
          </div>
        )}
        {phone && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="text-gray-500" size={18} />
            <span>{phone}</span>
          </div>
        )}
        {joined && (
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar className="text-gray-500" size={18} />
            <span>{joined}</span>
          </div>
        )}
      </div>

      {/* Bio */}
      {bio && (
        <div className="border-t border-gray-200 pt-3">
          <p className="text-gray-700 italic">“{bio}”</p>
        </div>
      )}

      {/* Followers / Following stats */}
      <div className="flex justify-between border-t border-gray-200 pt-2 text-center">
        <div>
          <div className="text-lg font-bold">{followers}</div>
          <div className="text-sm text-gray-500">Followers</div>
        </div>
        <div>
          <div className="text-lg font-bold">{following}</div>
          <div className="text-sm text-gray-500">Following</div>
        </div>
      </div>
    </div>
  );
};
