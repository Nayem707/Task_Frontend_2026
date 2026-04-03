function FriendsHeader({ friendsCount, requestsCount }) {
  return (
    <div className="mb-4 sm:mb-6">
      <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Friends</h1>
      <p className="text-xs text-gray-500 sm:text-sm">
        {friendsCount} friends · {requestsCount} pending requests
      </p>
    </div>
  );
}

export default FriendsHeader;
