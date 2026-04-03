// Mock profile data
export const mockProfileData = {
  name: "Emily Johnson",
  coverPhoto:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
  profilePicture:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
  bio: "Digital creator & traveler 🌍 | Coffee enthusiast ☕ | Spreading positivity ✨",
  location: "San Francisco, California",
  workplace: "Creative Studio Inc.",
  education: "University of Arts, London",
  followers: 1245,
  following: 832,
  friends: 487,
  website: "emilyjohnson.art",
  mutualFriends: [
    {
      id: 1,
      name: "Jessica Lee",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      name: "Sophia Chen",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ],
  photos: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
  ],
};

export const mockPosts = [
  {
    id: 1,
    author: "Emily Johnson",
    avatar: mockProfileData.profilePicture,
    time: "2 hours ago",
    content:
      "Absolutely loved the sunset at the beach today! 🌅 Sometimes the simplest moments are the most magical. Hope everyone is having a wonderful week!",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    likes: 342,
    comments: 58,
  },
  {
    id: 2,
    author: "Emily Johnson",
    avatar: mockProfileData.profilePicture,
    time: "Yesterday",
    content:
      "Just finished a fantastic book on creative thinking. Highly recommend 'The Creative Act' by Rick Rubin. What's everyone reading lately? 📚",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop",
    likes: 189,
    comments: 32,
  },
];
