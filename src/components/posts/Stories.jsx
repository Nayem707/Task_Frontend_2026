import React from 'react'
import { ChevronRight, Plus } from 'lucide-react'

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
          <div className="relative shrink-0 w-[130px] h-[190px] rounded-2xl overflow-hidden cursor-pointer bg-[#eef2f8]">
            <img
              src="/images/profile.png"
              alt="Your Story"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 pb-2 pt-8">
              <p className="text-[11px] font-semibold text-white text-center">
                Your Story
              </p>
            </div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-[#377DFF] flex items-center justify-center border-2 border-white shadow">
              <Plus size={16} className="text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Friend Stories */}
          {friendStories.map((story, i) => (
            <div
              key={i}
              className="relative shrink-0 w-[130px] h-[190px] rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={story.bg}
                alt={story.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 pb-2 pt-10">
                <p className="text-[11px] font-semibold text-white text-center">
                  {story.name}
                </p>
              </div>
              <img
                src={story.avatar}
                alt={story.name}
                className="absolute top-3 left-3 h-9 w-9 rounded-full object-cover border-2 border-[#377DFF]"
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
  )
}

export default Stories
