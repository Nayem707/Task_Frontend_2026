import { Grid3X3, Info, Users, Image as ImageIcon } from "lucide-react";

const TABS = [
  { id: "posts", label: "Posts", icon: Grid3X3 },
  { id: "about", label: "About", icon: Info },
  { id: "friends", label: "Friends", icon: Users },
  { id: "photos", label: "Photos", icon: ImageIcon },
];

export const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="scrollbar-hide flex overflow-x-auto rounded-xl border-b border-gray-200 bg-white">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold transition sm:gap-2 sm:px-4 sm:py-3 sm:text-sm md:px-6 ${
            activeTab === tab.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <tab.icon size={16} className="sm:size-[18px]" />
          {tab.label}
        </button>
      ))}
    </div>
  );
};
