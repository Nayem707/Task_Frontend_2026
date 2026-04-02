import React from "react";

const RightSidebar = () => {
  return (
    <div className="hidden lg:block space-y-4">
      {/* You Might Like */}
      <section className="app-card px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[#112032]">
            You Might Like
          </h4>
          <a href="#" className="text-xs font-medium text-[#377DFF]">
            See All
          </a>
        </div>
        <hr className="mb-5 border-[#edf1f7]" />
        <div className="mb-4 flex items-center gap-3">
          <img
            src="/images/Avatar.png"
            alt="Radovan SkillArena"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <h4 className="text-sm font-semibold text-[#112032]">
              Radovan SkillArena
            </h4>
            <p className="text-xs text-[#738098]">
              Founder &amp; CEO at Trophy
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-lg border border-[#e7edf8] py-2 text-xs font-medium text-[#738098] hover:bg-[#f5f7fb]"
          >
            Ignore
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-[#377DFF] py-2 text-xs font-medium text-white hover:bg-[#2569e6]"
          >
            Follow
          </button>
        </div>
      </section>

      {/* Your Friends */}
      <section className="app-card px-6 py-6">
        <div className="mb-5 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[#112032]">Your Friends</h4>
          <a href="#" className="text-xs font-medium text-[#377DFF]">
            See All
          </a>
        </div>
        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 17 17"
          >
            <circle cx="7" cy="7" r="6" stroke="#666" />
            <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
          </svg>
          <input
            type="search"
            placeholder="input search text"
            className="w-full rounded-lg border border-[#e7edf8] bg-[#f5f7fb] py-2 pl-9 pr-3 text-xs text-[#112032] outline-none placeholder:text-[#a0aab8] focus:border-[#377DFF]"
          />
        </div>
        {/* Friends list */}
        <ul className="space-y-3">
          {[
            {
              img: "people1.png",
              name: "Steve Jobs",
              title: "CEO of Apple",
              online: false,
            },
            {
              img: "people2.png",
              name: "Ryan Roslansky",
              title: "CEO of Linkedin",
              online: true,
            },
            {
              img: "people3.png",
              name: "Dylan Field",
              title: "CEO of Figma",
              online: true,
            },
            {
              img: "people1.png",
              name: "Steve Jobs",
              title: "CEO of Apple",
              online: false,
            },
            {
              img: "people2.png",
              name: "Ryan Roslansky",
              title: "CEO of Linkedin",
              online: true,
            },
            {
              img: "people3.png",
              name: "Dylan Field",
              title: "CEO of Figma",
              online: true,
            },
            {
              img: "people3.png",
              name: "Dylan Field",
              title: "CEO of Figma",
              online: true,
            },
            {
              img: "people1.png",
              name: "Steve Jobs",
              title: "CEO of Apple",
              online: false,
            },
          ].map((friend, i) => (
            <li key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={`/images/${friend.img}`}
                  alt={friend.name}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-[#112032]">
                    {friend.name}
                  </p>
                  <p className="text-xs text-[#738098]">{friend.title}</p>
                </div>
              </div>
              <div className="shrink-0">
                {friend.online ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <rect
                      width="12"
                      height="12"
                      x="1"
                      y="1"
                      fill="#0ACF83"
                      stroke="#fff"
                      strokeWidth="2"
                      rx="6"
                    />
                  </svg>
                ) : (
                  <span className="text-xs text-[#738098]">5 minute ago</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default RightSidebar;
