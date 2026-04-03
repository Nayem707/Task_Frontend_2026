import { Grid3X3, Info, Users, Image as ImageIcon } from "lucide-react";

const TABS = [
  { id: "posts", label: "Posts", icon: Grid3X3 },
  { id: "about", label: "About", icon: Info },
  { id: "friends", label: "Friends", icon: Users },
  { id: "photos", label: "Photos", icon: ImageIcon },
];

export const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex overflow-x-auto rounded-xl border-b border-gray-200 bg-white">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition md:px-6 ${
            activeTab === tab.id
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <tab.icon size={18} />
          {tab.label}
        </button>
      ))}
    </div>
  );
};
