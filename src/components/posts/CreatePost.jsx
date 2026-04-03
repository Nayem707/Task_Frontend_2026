import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Image,
  Video,
  CalendarDays,
  FileText,
  Pencil,
  Send,
  X,
} from "lucide-react";
import { createPost } from "../../features/posts/postsAPI";

const MAX_IMAGES = 5;
const ACCEPTED = ["image/png", "image/jpeg", "image/webp"];

function CreatePost() {
  const dispatch = useDispatch();
  const creating = useSelector((state) => state.posts.creating);
  const authUser = useSelector((state) => state.auth.user);
  const avatarSrc = authUser?.avatarUrl || "/images/profile.png";

  const [selectedFiles, setSelectedFiles] = useState([]); // { file, preview }[]
  const fileInputRef = useRef(null);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { content: "", visibility: "PUBLIC" },
  });

  const addImages = (fileList) => {
    const incoming = Array.from(fileList).filter((f) =>
      ACCEPTED.includes(f.type)
    );
    if (!incoming.length) return;

    setSelectedFiles((prev) => {
      const combined = [...prev];
      for (const file of incoming) {
        if (combined.length >= MAX_IMAGES) break;
        combined.push({ file, preview: URL.createObjectURL(file) });
      }
      return combined;
    });
    // reset input so same file can be re-added after removal
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index) => {
    setSelectedFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit = async ({ content, visibility }) => {
    if (!content.trim() && selectedFiles.length === 0) {
      toast.error("Post content or at least one image is required.");
      return;
    }

    try {
      await dispatch(
        createPost({
          content: content.trim(),
          visibility,
          images: selectedFiles.map((f) => f.file),
        })
      ).unwrap();
      toast.success("Post created");
      reset({ content: "", visibility: "PUBLIC" });
      selectedFiles.forEach((f) => URL.revokeObjectURL(f.preview));
      setSelectedFiles([]);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to create post"
      );
    }
  };

  return (
    <section className="app-card mb-4 px-3 py-4 sm:px-6 sm:py-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Textarea row */}
        <div className="mb-4 flex items-start gap-2 sm:gap-3">
          <img
            src={avatarSrc}
            alt="Your avatar"
            className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
          />
          <div className="relative flex-1">
            <textarea
              rows={3}
              placeholder="Write something ..."
              className="w-full resize-none rounded-xl border border-[#e7edf8] bg-[#f5f7fb] px-3 py-2 pr-10 text-sm text-[#112032] outline-none placeholder:text-[#a0aab8] focus:border-[#377DFF] focus:ring-2 focus:ring-[#377DFF]/20 sm:px-4 sm:py-3"
              {...register("content", { maxLength: 1500 })}
            />
            <span className="pointer-events-none absolute top-3 right-3">
              <Pencil size={17} className="text-[#888]" />
            </span>
          </div>
        </div>

        {/* Image previews */}
        {selectedFiles.length > 0 && (
          <div
            className={`mb-4 grid gap-2 pl-0 sm:pl-14 ${
              selectedFiles.length === 1
                ? "grid-cols-1"
                : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {selectedFiles.map(({ preview, file }, index) => (
              <div
                key={preview}
                className="group relative overflow-hidden rounded-xl bg-[#e9edf5]"
              >
                <img
                  src={preview}
                  alt={file.name}
                  className="h-32 w-full object-cover sm:h-40"
                  loading="lazy"
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/80"
                >
                  <X size={12} />
                </button>
                {/* Order badge */}
                <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                  {index + 1}/{MAX_IMAGES}
                </span>
              </div>
            ))}

            {/* Add more slot */}
            {selectedFiles.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-32 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[#c6d4e8] text-sm text-[#7c8fa8] hover:bg-[#f5f7fb] sm:h-40"
              >
                <Image size={22} className="text-[#7c8fa8]" />
                <span className="text-xs">Add more</span>
                <span className="text-[10px] text-[#9aa5b8]">
                  {MAX_IMAGES - selectedFiles.length} left
                </span>
              </button>
            )}
          </div>
        )}

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-[#edf1f7] pt-3 sm:pt-4">
          <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={selectedFiles.length >= MAX_IMAGES}
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff] disabled:cursor-not-allowed disabled:opacity-50 sm:gap-1.5 sm:px-3 sm:py-2"
            >
              <Image size={16} className="text-[#666] sm:size-[17px]" />
              <span className="hidden sm:inline">Photo</span>
              {selectedFiles.length > 0 && (
                <span className="ml-0.5 rounded-full bg-[#377DFF] px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {selectedFiles.length}
                </span>
              )}
            </button>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff] sm:gap-1.5 sm:px-3 sm:py-2"
            >
              <Video size={16} className="text-[#666] sm:size-[17px]" />
              <span className="hidden sm:inline">Video</span>
            </button>
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff] md:flex"
            >
              <CalendarDays size={17} className="text-[#666]" />
              Event
            </button>
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff] sm:flex"
            >
              <FileText size={16} className="text-[#666]" />
              Article
            </button>
          </div>

          {/* Hidden file input — multiple */}
          <input
            type="file"
            accept={ACCEPTED.join(",")}
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => addImages(e.target.files)}
          />

          <input type="hidden" value="PUBLIC" {...register("visibility")} />

          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-1.5 rounded-lg bg-[#377DFF] px-3 py-2 text-sm font-semibold text-white hover:bg-[#2569e6] disabled:opacity-60 sm:gap-2 sm:px-5 sm:py-2.5"
          >
            <Send size={14} className="text-white" />
            <span className="hidden sm:inline">
              {creating ? "Posting..." : "Post"}
            </span>
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
