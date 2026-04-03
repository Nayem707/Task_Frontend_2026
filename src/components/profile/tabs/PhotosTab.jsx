export const PhotosTab = ({ photos = [] }) => {
  // Ensure photos is always an array
  const photosList = Array.isArray(photos) ? photos : [];

  if (photosList.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">No photos yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Photos</h3>
        <span className="cursor-pointer text-sm text-blue-600 hover:underline">
          See all photos
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {photosList.slice(0, 6).map((photo, idx) => (
          <img
            key={idx}
            src={photo}
            alt={`photo-${idx}`}
            className="h-28 w-full cursor-pointer rounded-lg object-cover transition hover:opacity-90"
          />
        ))}
      </div>
    </div>
  );
};
