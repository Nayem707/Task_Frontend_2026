function FriendsHeader({ friendsCount, requestsCount }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Friends</h1>
      <p className="text-sm text-gray-500">
        {friendsCount} friends · {requestsCount} pending requests
      </p>
    </div>
  );
}

export default FriendsHeader;
