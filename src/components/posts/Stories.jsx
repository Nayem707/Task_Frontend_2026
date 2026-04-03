import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const friendStories = [
  {
    id: 1,
    name: "Ryan Roslansky",
    avatar: "/images/people1.png",
    bg: "/images/photos5.png",
  },
  {
    id: 2,
    name: "Emma Watson",
    avatar: "/images/people2.png",
    bg: "/images/photos6.png",
  },
  {
    id: 3,
    name: "Chris Evans",
    avatar: "/images/people3.png",
    bg: "/images/photos7.png",
  },
  {
    id: 4,
    name: "Scarlett Johansson",
    avatar: "/images/img1.png",
    bg: "/images/photos8.png",
  },
  {
    id: 5,
    name: "Robert Downey Jr.",
    avatar: "/images/img2.png",
    bg: "/images/photos9.png",
  },
  {
    id: 6,
    name: "Natalie Portman",
    avatar: "/images/img3.png",
    bg: "/images/photos2.png",
  },
  {
    id: 7,
    name: "Tom Holland",
    avatar: "/images/img4.png",
    bg: "/images/photos7.png",
  },
  {
    id: 8,
    name: "Zendaya",
    avatar: "/images/img5.png",
    bg: "/images/photos8.png",
  },
  {
    id: 9,
    name: "Leonardo DiCaprio",
    avatar: "/images/img6.png",
    bg: "/images/photos9.png",
  },
];
const Stories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const containerRef = useRef(null);

  // Update visible count based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(2);
      else if (width < 768) setVisibleCount(3);
      else if (width < 1024) setVisibleCount(4);
      else setVisibleCount(5);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const totalStories = friendStories.length + 1; // +1 for "Your Story"
  const maxIndex = Math.max(0, totalStories - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Combine "Your Story" with friend stories
  const allStories = [
    {
      id: "your-story",
      name: "Your Story",
      avatar: "/images/profile.png",
      bg: null,
      isYourStory: true,
    },
    ...friendStories.map((story, idx) => ({
      ...story,
      id: idx,
      isYourStory: false,
    })),
  ];

  const visibleStories = allStories.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <section className="relative mb-4 rounded-xl bg-white px-2 py-3 shadow-sm sm:mb-6 sm:rounded-2xl sm:px-4 sm:py-4">
      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex gap-2 transition-transform duration-500 ease-out sm:gap-3"
          style={{
            transform: `translateX(-${currentIndex * (130 + 12)}px)`, // 130px width + 12px gap (gap-3 = 0.75rem = 12px)
          }}
        >
          {allStories.map((story) => (
            <div
              key={story.id}
              className="relative h-[160px] w-[110px] shrink-0 cursor-pointer overflow-hidden rounded-xl sm:h-[200px] sm:w-[130px]"
            >
              {story.isYourStory ? (
                // Your Story Card
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                  <img
                    src={story.avatar}
                    alt="Your Story"
                    className="absolute bottom-8 left-1/2 h-12 w-12 -translate-x-1/2 rounded-full border-2 border-white object-cover sm:bottom-10 sm:h-16 sm:w-16"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-1.5 pt-6 pb-1.5 sm:px-2 sm:pt-8 sm:pb-2">
                    <p className="text-center text-[10px] font-semibold text-white sm:text-xs">
                      {story.name}
                    </p>
                  </div>
                  <div className="absolute top-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-md sm:top-3 sm:h-8 sm:w-8">
                    <Plus
                      size={14}
                      className="text-white sm:size-4"
                      strokeWidth={3}
                    />
                  </div>
                </>
              ) : (
                // Friend Story Card
                <>
                  <img
                    src={story.bg}
                    alt={story.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1.5 pt-8 pb-1.5 sm:px-2 sm:pt-10 sm:pb-2">
                    <p className="text-center text-[10px] font-semibold text-white sm:text-xs">
                      {story.name}
                    </p>
                  </div>
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="absolute top-2 left-2 h-8 w-8 rounded-full border-2 border-blue-500 object-cover sm:top-3 sm:left-3 sm:h-10 sm:w-10"
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 flex h-8 w-8 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100"
            aria-label="Previous stories"
          >
            <ChevronLeft size={18} className="text-gray-700" />
          </button>
        )}
        {currentIndex < maxIndex && (
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 flex h-8 w-8 translate-x-3 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100"
            aria-label="Next stories"
          >
            <ChevronRight size={18} className="text-gray-700" />
          </button>
        )}
      </div>

      {/* Optional: Pagination Dots */}
      {maxIndex > 0 && (
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "w-4 bg-blue-600" : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Stories;
