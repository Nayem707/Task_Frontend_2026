import { useNavigate } from "react-router-dom";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

function NotFoundView() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f5f7fb] to-[#e7edf8] px-3 sm:px-4">
      <div className="text-center">
        {/* 404 Icon */}
        <div className="mb-4 flex justify-center sm:mb-6">
          <div className="relative">
            <div className="text-6xl font-bold text-[#377DFF] opacity-20 sm:text-8xl md:text-9xl">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle
                size={50}
                className="text-[#377DFF] sm:size-[70px] md:size-20"
              />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-2xl font-bold text-[#112032] sm:text-3xl md:text-4xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mb-6 max-w-md px-4 text-sm text-[#4c5a71] sm:mb-8 sm:text-base md:text-lg">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 px-4 sm:flex-row sm:justify-center sm:gap-3">
          <button
            onClick={() => navigate(-1)}
            className="sm:py-3\ flex items-center justify-center gap-2 rounded-lg bg-[#f0f3f8] px-5 py-2.5 text-sm font-medium text-[#377DFF] transition hover:bg-[#e7edf8] sm:px-6"
          >
            <ArrowLeft size={16} className="sm:size-[18px]" />
            Go Back
          </button>
          <button
            onClick={() => navigate("/feed")}
            className="sm:py-3\ flex items-center justify-center gap-2 rounded-lg bg-[#377DFF] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2563eb] sm:px-6"
          >
            <Home size={16} className="sm:size-[18px]" />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundView;
