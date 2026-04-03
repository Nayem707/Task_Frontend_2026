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
  Heart,
  MessageSquare,
  UserPlus,
  AtSign,
  Camera,
} from "lucide-react";
import { logout } from "../../../features/auth/authAPI";
import { ROUTES } from "../../../utils/constants";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../../features/notifications/notificationsAPI";
import { fetchConversations } from "../../../features/messages/messagesAPI";

const NOTIFICATION_ICONS = {
  LIKE: <Heart size={14} className="text-red-400" />,
  COMMENT: <MessageSquare size={14} className="text-blue-400" />,
  FOLLOW: <UserPlus size={14} className="text-green-400" />,
  MESSAGE: <MessageCircle size={14} className="text-purple-400" />,
  MENTION: <AtSign size={14} className="text-yellow-500" />,
  GROUP_INVITE: <Users size={14} className="text-indigo-400" />,
  STORY_REACTION: <Heart size={14} className="text-pink-400" />,
};

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const avatarSrc = user?.avatarUrl || "/images/profile.png";

  const {
    items: notifications,
    unreadCount: notifyCount,
    loading: notifyLoading,
  } = useSelector((state) => state.notifications);
  const { conversations, loading: chatLoading } = useSelector(
    (state) => state.messages
  );
  const chatUnread = conversations.filter(
    (c) =>
      c.lastMessage?.receiverId === user?.id && c.lastMessage?.status !== "READ"
  ).length;

  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const profileRef = useRef(null);
  const notifyRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (notifyRef.current && !notifyRef.current.contains(e.target)) {
        setNotifyOpen(false);
      }
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setChatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[#edf0f7] bg-white shadow-xs">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 md:px-0">
        {/* Logo */}
        <Link to="/feed" className="shrink-0">
          <img
            src="/images/logo.svg"
            alt="BuddyScript"
            className="h-6 sm:h-8"
          />
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
        <div className="flex items-center gap-1 sm:gap-3 md:gap-6">
          {/* Home - active */}
          <Link
            to="/feed"
            className="relative hidden rounded-xl p-2.5 hover:bg-[#f0f4ff] sm:block"
          >
            <Home size={21} className="text-[#377DFF]" />
            <span className="absolute bottom-1 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[#377DFF]" />
          </Link>

          {/* Friends */}
          <Link
            to="/profile/friends"
            className="hidden rounded-xl p-2.5 hover:bg-[#f0f4ff] sm:block"
          >
            <Users size={22} className="text-gray-500" fill="none" />
          </Link>

          {/* Notifications */}
          <div ref={notifyRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setNotifyOpen((v) => !v)}
              className="relative rounded-xl p-2.5 hover:bg-[#f0f4ff]"
            >
              <Bell size={22} className="text-gray-500" fill="none" />
              {notifyCount > 0 && (
                <span className="absolute -top-0.5 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B6B] text-[10px] font-bold text-white">
                  {notifyCount > 99 ? "99+" : notifyCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notifyOpen && (
              <div className="absolute top-full -right-4 z-50 mt-3 w-screen rounded-b-xl border border-[#e7edf8] bg-white shadow-xl sm:-right-54 sm:w-100">
                <div className="flex items-center justify-between border-b border-[#e7edf8] px-4 py-3">
                  <h4 className="font-semibold text-[#112032]">
                    Notifications
                  </h4>
                  {notifyCount > 0 && (
                    <button
                      type="button"
                      onClick={() => dispatch(markAllNotificationsRead())}
                      className="text-xs text-[#377DFF] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-[80vh] divide-y divide-[#f0f3f8] overflow-y-auto">
                  {notifyLoading && (
                    <div className="px-4 py-6 text-center text-sm text-[#9aa5b8]">
                      Loading…
                    </div>
                  )}
                  {!notifyLoading && notifications.length === 0 && (
                    <div className="px-4 py-6 text-center text-sm text-[#9aa5b8]">
                      No notifications yet
                    </div>
                  )}
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (!n.isRead) dispatch(markNotificationRead(n.id));
                      }}
                      className={`flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-[#f5f7fb] ${
                        !n.isRead ? "bg-[#f0f6ff]" : ""
                      }`}
                    >
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef2ff]">
                        {NOTIFICATION_ICONS[n.type] ?? (
                          <Bell size={14} className="text-gray-400" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs leading-snug text-[#4c5a71]">
                          {n.content ?? n.type.replace(/_/g, " ")}
                        </p>
                        <span className="text-[10px] text-[#9aa5b8]">
                          {timeAgo(n.createdAt)}
                        </span>
                      </div>
                      {!n.isRead && (
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#377DFF]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chat */}
          <div ref={chatRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setChatOpen((v) => !v)}
              className="relative rounded-xl p-2.5 hover:bg-[#f0f4ff]"
            >
              <MessageCircle size={22} className="text-gray-500" fill="none" />
              {chatUnread > 0 && (
                <span className="absolute -top-0.5 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6B6B] text-[10px] font-bold text-white">
                  {chatUnread > 99 ? "99+" : chatUnread}
                </span>
              )}
            </button>

            {/* Chat Dropdown */}
            {chatOpen && (
              <div className="absolute top-full -right-4 z-50 mt-3 w-screen rounded-b-xl border border-[#e7edf8] bg-white shadow-xl sm:-right-20 sm:w-82">
                <div className="flex items-center justify-between border-b border-[#e7edf8] px-4 py-3">
                  <h4 className="font-semibold text-[#112032]">Messages</h4>
                  <Link
                    to="/chat"
                    onClick={() => setChatOpen(false)}
                    className="text-xs text-[#377DFF] hover:underline"
                  >
                    See all
                  </Link>
                </div>
                <div className="max-h-[80vh] divide-y divide-[#f0f3f8] overflow-y-auto">
                  {chatLoading && (
                    <div className="px-4 py-6 text-center text-sm text-[#9aa5b8]">
                      Loading…
                    </div>
                  )}
                  {!chatLoading && conversations.length === 0 && (
                    <div className="px-4 py-6 text-center text-sm text-[#9aa5b8]">
                      No messages yet
                    </div>
                  )}
                  {conversations.map(({ partner, lastMessage }) => {
                    const isUnread =
                      lastMessage?.receiverId === user?.id &&
                      lastMessage?.status !== "READ";
                    return (
                      <Link
                        key={partner.id}
                        to={`/chat/${partner.id}`}
                        onClick={() => setChatOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 hover:bg-[#f5f7fb] ${
                          isUnread ? "bg-[#f0f6ff]" : ""
                        }`}
                      >
                        {partner.avatarUrl ? (
                          <img
                            src={partner.avatarUrl}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                            alt={`${partner.firstName} ${partner.lastName}`}
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                            {(partner.firstName || "U").charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-[#112032]">
                            {partner.firstName} {partner.lastName}
                          </p>
                          <p className="truncate text-xs text-[#4c5a71]">
                            {lastMessage?.senderId === user?.id ? "You: " : ""}
                            {lastMessage?.content ?? ""}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className="text-[10px] text-[#9aa5b8]">
                            {lastMessage?.createdAt
                              ? timeAgo(lastMessage.createdAt)
                              : ""}
                          </span>
                          {isUnread && (
                            <span className="h-2 w-2 rounded-full bg-[#377DFF]" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile */}
        <div
          ref={profileRef}
          className="relative flex cursor-pointer items-center gap-1.5 sm:gap-2.5"
          onClick={() => setProfileOpen((v) => !v)}
        >
          {user?.avatarUrl ? (
            <img
              src={avatarSrc}
              alt="Profile"
              className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10"
              loading="lazy"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600 sm:h-10 sm:w-10">
              {(user?.firstName || "U").charAt(0).toUpperCase()}
            </div>
          )}

          <div className="relative">
            <div className="absolute right-1 -bottom-4 cursor-pointer rounded-full border-2 border-white bg-green-800 p-1 transition hover:bg-gray-900" />
          </div>
          <div className="hidden items-center gap-1 lg:flex">
            <span className="text-sm font-medium text-[#112032]">
              {fullName}
            </span>
            <ChevronDown size={14} className="text-[#112032]" />
          </div>

          {/* Profile Dropdown */}

          {profileOpen && (
            <div
              className="absolute top-full -right-4 z-50 mt-3 w-56 overflow-hidden rounded-b-xl border border-[#e7edf8] bg-white shadow-xl sm:-right-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-[#e7edf8] px-4 py-3">
                {user?.avatarUrl ? (
                  <img
                    src={avatarSrc}
                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                    alt=""
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
                    {(user?.firstName || "U").charAt(0).toUpperCase()}
                  </div>
                )}
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
