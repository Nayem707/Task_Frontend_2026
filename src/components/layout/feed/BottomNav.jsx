import { Link, useLocation } from "react-router-dom";
import { Home, Users, Bell, MessageCircle, User } from "lucide-react";
import { useSelector } from "react-redux";

function BottomNav() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const { unreadCount: notifyCount } = useSelector(
    (state) => state.notifications
  );
  const { conversations } = useSelector((state) => state.messages);
  const chatUnread = conversations.filter(
    (c) =>
      c.lastMessage?.receiverId === user?.id && c.lastMessage?.status !== "READ"
  ).length;

  const navItems = [
    {
      to: "/feed",
      icon: Home,
      label: "Home",
      isActive: location.pathname === "/feed",
    },
    {
      to: "/profile/friends",
      icon: Users,
      label: "Friends",
      isActive: location.pathname === "/profile/friends",
    },
    {
      to: "/notifications",
      icon: Bell,
      label: "Notifications",
      badge: notifyCount,
      isActive: location.pathname === "/notifications",
    },
    {
      to: "/chat",
      icon: MessageCircle,
      label: "Chat",
      badge: chatUnread,
      isActive: location.pathname.startsWith("/chat"),
    },
    {
      to: "/profile",
      icon: User,
      label: "Profile",
      isActive: location.pathname === "/profile",
    },
  ];

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-30 border-t border-[#edf0f7] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] sm:hidden">
      <div className="safe-area-inset-bottom flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label, badge, isActive }) => (
          <Link
            key={to}
            to={to}
            className={`relative flex flex-1 flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors ${
              isActive
                ? "text-[#377DFF]"
                : "text-gray-500 hover:bg-[#f0f4ff] hover:text-[#377DFF]"
            }`}
          >
            <div className="relative">
              <Icon size={20} fill={isActive ? "#377DFF" : "none"} />
              {badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6B6B] text-[8px] font-bold text-white">
                  {badge > 9 ? "9+" : badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
            {isActive && (
              <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-[#377DFF]" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;
