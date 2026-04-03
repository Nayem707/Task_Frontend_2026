import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  Users,
  Bell,
  MessageCircle,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { logout } from "../../../features/auth/authAPI";
import { ROUTES } from "../../../utils/constants";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const avatarSrc = user?.avatarUrl || "/images/profile.png";
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const profileRef = useRef(null);
  const notifyRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[#edf0f7] bg-white shadow-xs">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-0">
        {/* Logo */}
        <Link to="/feed" className="shrink-0">
          <img src="/images/logo.svg" alt="BuddyScript" className="h-8" />
        </Link>

        {/* Search */}
        <div className="mx-2 hidden max-w-lg flex-1 items-center gap-2 rounded-full bg-[#f5f7fb] px-3 py-2 lg:flex">
          <Search size={17} className="text-gray-500" />
          <input
            type="search"
            placeholder="input search text"
            className="flex-1 bg-transparent text-sm text-[#112032] outline-none placeholder:text-[#aab4c4]"
          />
        </div>

        {/* Nav Icons */}
        <div className="flex items-center gap-6">
          {/* Home - active */}
          <Link
            to="/feed"
            className="relative rounded-xl p-2.5 hover:bg-[#f0f4ff]"
          >
            <Home size={21} className="text-[#377DFF]" />
            <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#377DFF]" />
          </Link>

          {/* Friends */}
          <Link to="/friends" className="rounded-xl p-2.5 hover:bg-[#f0f4ff]">
            <Users size={22} className="text-gray-500" fill="none" />
          </Link>

          {/* Notifications */}
          <div ref={notifyRef} className="relative">
            <button
              type="button"
              onClick={() => setNotifyOpen((v) => !v)}
              className="relative rounded-xl p-2.5 hover:bg-[#f0f4ff]"
            >
              <Bell size={22} className="text-gray-500" fill="none" />
              <span className="absolute -top-0.5 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B6B] text-[10px] font-bold text-white">
                6
              </span>
            </button>

            {/* Notifications Dropdown */}
            {notifyOpen && (
              <div className="absolute top-full -right-54 z-50 mt-3 w-100 rounded-b-xl border border-[#e7edf8] bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-[#e7edf8] px-4 py-3">
                  <h4 className="font-semibold text-[#112032]">
                    Notifications
                  </h4>
                </div>
                <div className="max-h-[80vh] divide-y divide-[#f0f3f8] overflow-y-auto">
                  {[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                  ].map((i) => (
                    <div
                      key={i}
                      className="flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-[#f5f7fb]"
                    >
                      <img
                        src={
                          i % 2 === 0
                            ? "/images/profile-1.png"
                            : "/images/friend-req.png"
                        }
                        className="h-9 w-9 shrink-0 rounded-full object-cover"
                        alt=""
                      />
                      <div>
                        <p className="text-xs leading-snug text-[#4c5a71]">
                          <span className="font-semibold text-[#112032]">
                            {i % 2 === 0 ? "Steve Jobs" : "Admin"}
                          </span>
                          {i % 2 === 0
                            ? " posted a link in your timeline."
                            : " changed the name of the group Freelancer USA."}
                        </p>
                        <span className="text-[10px] text-[#9aa5b8]">
                          42 minutes ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          <Link
            to="/chat"
            className="relative rounded-xl p-2.5 hover:bg-[#f0f4ff]"
          >
            <MessageCircle size={22} className="text-gray-500" fill="none" />
            <span className="absolute -top-0.5 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B6B] text-[10px] font-bold text-white">
              2
            </span>
          </Link>
        </div>

        {/* Profile */}
        <div
          ref={profileRef}
          className="relative flex cursor-pointer items-center gap-2.5"
          onClick={() => setProfileOpen((v) => !v)}
        >
          <img
            src={avatarSrc}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
            loading="lazy"
          />
          <div className="hidden items-center gap-1 lg:flex">
            <span className="text-sm font-medium text-[#112032]">
              {fullName}
            </span>
            <ChevronDown size={14} className="text-[#112032]" />
          </div>

          {/* Profile Dropdown */}

          {profileOpen && (
            <div
              className="absolute top-full -right-10 z-50 mt-3 w-56 overflow-hidden rounded-b-xl border border-[#e7edf8] bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-[#e7edf8] px-4 py-3">
                <img
                  src={avatarSrc}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                  alt=""
                />
                <div>
                  <p className="text-sm font-semibold text-[#112032]">
                    {fullName}
                  </p>
                  <Link to="/profile" className="text-xs text-[#377DFF]">
                    View Profile
                  </Link>
                </div>
              </div>
              <hr className="border-[#e7edf8]" />
              <ul>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm text-[#4c5a71] hover:bg-[#f5f7fb]"
                  >
                    <span className="flex items-center gap-2.5">
                      <Settings size={18} className="text-[#377DFF]" />
                      Settings
                    </span>
                    <ChevronRight size={14} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm text-[#4c5a71] hover:bg-[#f5f7fb]"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle size={18} className="text-[#377DFF]" />
                      Help & Support
                    </span>
                    <ChevronRight size={14} className="text-[#112032]" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={async () => {
                      setProfileOpen(false);
                      await dispatch(logout());
                      navigate(ROUTES.LOGIN, { replace: true });
                    }}
                    className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm text-[#4c5a71] hover:bg-[#f5f7fb]"
                  >
                    <span className="flex items-center gap-2.5">
                      <LogOut size={18} className="text-[#377DFF]" />
                      Log Out
                    </span>
                    <ChevronRight size={14} className="text-[#112032]" />
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
