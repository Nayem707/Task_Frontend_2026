import React from "react";
import { ChevronRight, Plus } from "lucide-react";

const friendStories = [
  {
    name: "Ryan Roslansky",
    avatar: "/images/people2.png",
    bg: "/images/mobile_story_img.png",
  },
  {
    name: "Ryan Roslansky",
    avatar: "/images/people2.png",
    bg: "/images/mobile_story_img1.png",
  },
  {
    name: "Ryan Roslansky",
    avatar: "/images/people2.png",
    bg: "/images/mobile_story_img2.png",
  },
  {
    name: "Ryan Roslansky",
    avatar: "/images/people2.png",
    bg: "/images/img1.png",
  },
];

const Stories = () => {
  return (
    <section className="app-card mb-4 px-4 py-4">
      <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Your Story */}
        <div className="relative h-[190px] w-[130px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-[#eef2f8]">
          <img
            src="/images/profile.png"
            alt="Your Story"
            className="absolute bottom-8 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full object-cover"
          />
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent px-2 pt-8 pb-2">
            <p className="text-center text-[11px] font-semibold text-white">
              Your Story
            </p>
          </div>
          <div className="absolute top-3 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-[#377DFF] shadow">
            <Plus size={16} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Friend Stories */}
        {friendStories.map((story, i) => (
          <div
            key={i}
            className="relative h-[190px] w-[130px] shrink-0 cursor-pointer overflow-hidden rounded-2xl"
          >
            <img
              src={story.bg}
              alt={story.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent px-2 pt-10 pb-2">
              <p className="text-center text-[11px] font-semibold text-white">
                {story.name}
              </p>
            </div>
            <img
              src={story.avatar}
              alt={story.name}
              className="absolute top-3 left-3 h-9 w-9 rounded-full border-2 border-[#377DFF] object-cover"
            />
          </div>
        ))}

        {/* See More */}
        <div className="flex shrink-0 items-center pl-1">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#377DFF] shadow-md"
          >
            <ChevronRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Stories;
