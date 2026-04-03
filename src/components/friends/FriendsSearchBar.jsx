import { Search } from "lucide-react";

function FriendsSearchBar({
  value,
  onChange,
  placeholder = "Search friends...",
}) {
  return (
    <div className="relative mb-4 sm:mb-6">
      <Search
        className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        size={16}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-full border border-gray-200 bg-white py-2 pr-3 pl-9 text-xs text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:py-2 sm:pr-4 sm:pl-10 sm:text-sm"
      />
    </div>
  );
}

export default FriendsSearchBar;
