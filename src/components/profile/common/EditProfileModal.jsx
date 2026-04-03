import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, X } from "lucide-react";
import toast from "react-hot-toast";
import { updateUserProfile } from "../../../features/profile/profileAPI";

export function EditProfileModal({ open, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const saving = useSelector((state) => state.profile.loading);

  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", bio: "" });

  // Sync form when modal opens or user changes
  useEffect(() => {
    if (open && user) {
      setForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        bio: user.bio ?? "",
      });
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  }, [open, user]);

  if (!open) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", form.firstName.trim());
    formData.append("lastName", form.lastName.trim());
    formData.append("bio", form.bio.trim());
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Profile updated!");
      onClose();
    } catch (err) {
      toast.error(err ?? "Failed to update profile");
    }
  };

  const currentAvatar =
    avatarPreview || user?.avatarUrl || "/images/profile.png";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e7edf8] px-5 py-4">
          <h3 className="text-base font-semibold text-[#112032]">
            Edit Profile
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-5 py-4">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative">
              <img
                src={currentAvatar}
                alt="Avatar preview"
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#125fee] text-white shadow hover:bg-blue-600"
              >
                <Camera size={13} />
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            {avatarFile && (
              <p className="text-xs text-gray-500">{avatarFile.name}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[#4c5a71]">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#dde3ef] px-3 py-2 text-sm text-[#112032] outline-none focus:border-[#377DFF] focus:ring-1 focus:ring-[#377DFF]"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[#4c5a71]">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-[#dde3ef] px-3 py-2 text-sm text-[#112032] outline-none focus:border-[#377DFF] focus:ring-1 focus:ring-[#377DFF]"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="mb-1 block text-xs font-medium text-[#4c5a71]">
              Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              maxLength={200}
              placeholder="Write something about yourself…"
              className="w-full resize-none rounded-lg border border-[#dde3ef] px-3 py-2 text-sm text-[#112032] outline-none focus:border-[#377DFF] focus:ring-1 focus:ring-[#377DFF]"
            />
            <p className="mt-0.5 text-right text-[10px] text-gray-400">
              {form.bio.length}/200
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[#377DFF] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-600 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
