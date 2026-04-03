import { useNavigate } from "react-router-dom";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

function NotFoundView() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f5f7fb] to-[#e7edf8] px-4">
      <div className="text-center">
        {/* 404 Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="text-9xl font-bold text-[#377DFF] opacity-20">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle size={80} className="text-[#377DFF]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-2 text-4xl font-bold text-[#112032]">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mb-8 max-w-md text-lg text-[#4c5a71]">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#f0f3f8] px-6 py-3 font-medium text-[#377DFF] transition hover:bg-[#e7edf8]"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/feed")}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#377DFF] px-6 py-3 font-medium text-white transition hover:bg-[#2563eb]"
          >
            <Home size={18} />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundView;
