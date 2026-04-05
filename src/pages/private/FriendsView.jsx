import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FriendsHeader,
  FriendsTabs,
  FriendsSearchBar,
  FriendsList,
  FriendRequestsList,
  FollowingList,
  FollowersList,
} from "../../components/friends";
import {
  fetchFollowers,
  fetchFollowing,
  toggleFollow,
} from "../../features/users/usersAPI";

const FriendsView = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const followers = useSelector((state) => state.users.followers);
  const following = useSelector((state) => state.users.following);
  const followersLoading = useSelector((state) => state.users.followersLoading);
  const followingLoading = useSelector((state) => state.users.followingLoading);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Jessica Lee",
      username: "jessica.lee",
      avatar: "/images/card_ppl1.png",
      mutualFriends: 12,
      isFriend: true,
    },
    {
      id: 2,
      name: "David Kim",
      username: "david.kim",
      avatar: "/images/card_ppl2.png",
      mutualFriends: 8,
      isFriend: true,
    },
    {
      id: 3,
      name: "Sophia Chen",
      username: "sophia.chen",
      avatar: "/images/card_ppl3.png",
      mutualFriends: 5,
      isFriend: true,
    },
    {
      id: 4,
      name: "Michael Brown",
      username: "michael.b",
      avatar: "/images/card_ppl4.png",
      mutualFriends: 3,
      isFriend: true,
    },
    {
      id: 5,
      name: "Emma Wilson",
      username: "emma.w",
      avatar: "/images/card_ppl2.png",
      mutualFriends: 15,
      isFriend: true,
    },
    {
      id: 6,
      name: "James Taylor",
      username: "james.t",
      avatar: "/images/card_ppl1.png",
      mutualFriends: 2,
      isFriend: true,
    },
  ]);

  const [friendRequests, setFriendRequests] = useState([
    {
      id: 101,
      name: "Olivia Martinez",
      username: "olivia.m",
      avatar: "/images/card_ppl1.png",
      mutualFriends: 4,
    },
    {
      id: 102,
      name: "Ethan Johnson",
      username: "ethan.j",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      mutualFriends: 1,
    },
  ]);

  // Fetch following and followers on mount
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(fetchFollowing(currentUser.id));
      dispatch(fetchFollowers(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  const handleRemoveFriend = (id) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  const handleAcceptRequest = (id) => {
    const accepted = friendRequests.find((req) => req.id === id);
    if (accepted) {
      setFriends([...friends, { ...accepted, isFriend: true }]);
      setFriendRequests(friendRequests.filter((req) => req.id !== id));
    }
  };

  const handleDeclineRequest = (id) => {
    setFriendRequests(friendRequests.filter((req) => req.id !== id));
  };

  const handleToggleFollow = async (userId) => {
    await dispatch(toggleFollow(userId)).unwrap();
    // Refetch lists after toggle
    if (currentUser?.id) {
      dispatch(fetchFollowing(currentUser.id));
      dispatch(fetchFollowers(currentUser.id));
    }
  };

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequests = friendRequests.filter(
    (req) =>
      req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFollowing = following.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFollowers = followers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-3 sm:py-6">
      <div className="mx-auto max-w-7xl px-3 sm:px-0">
        <FriendsHeader
          friendsCount={friends.length}
          requestsCount={friendRequests.length}
        />

        <FriendsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          requestsCount={friendRequests.length}
          followingCount={following.length}
          followersCount={followers.length}
        />

        <FriendsSearchBar value={searchQuery} onChange={setSearchQuery} />

        {activeTab === "friends" && (
          <FriendsList
            friends={filteredFriends}
            onRemoveFriend={handleRemoveFriend}
          />
        )}

        {activeTab === "requests" && (
          <FriendRequestsList
            requests={filteredRequests}
            onAccept={handleAcceptRequest}
            onDecline={handleDeclineRequest}
          />
        )}

        {activeTab === "following" && (
          <FollowingList
            users={filteredFollowing}
            onUnfollow={handleToggleFollow}
            loading={followingLoading}
          />
        )}

        {activeTab === "followers" && (
          <FollowersList
            users={filteredFollowers}
            onFollow={handleToggleFollow}
            loading={followersLoading}
          />
        )}
      </div>
    </div>
  );
};

export default FriendsView;
