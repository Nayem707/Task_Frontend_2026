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
} from "lucide-react";
import { createPost } from "../../features/posts/postsAPI";
import { validateImageFile } from "../../utils/validators";

function CreatePost() {
  const dispatch = useDispatch();
  const creating = useSelector((state) => state.posts.creating);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
      visibility: "PUBLIC",
    },
  });

  const onSubmit = async ({ content, visibility, image }) => {
    const selected = image?.[0];
    const valid = validateImageFile(selected);
    if (valid !== true) {
      toast.error(valid);
      return;
    }

    if (!content.trim() && !selected) {
      toast.error("Post content or image is required.");
      return;
    }

    try {
      await dispatch(
        createPost({ content: content.trim(), visibility, image: selected })
      ).unwrap();
      toast.success("Post created");
      reset({ content: "", visibility: "PUBLIC", image: undefined });
      setPreview("");
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || "Failed to create post";
      toast.error(message);
    }
  };

  const onImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview("");
      return;
    }
    setPreview(URL.createObjectURL(file));
  };

  const { ref: imageRegisterRef, ...imageFieldProps } = register("image", {
    onChange: onImageChange,
  });

  return (
    <section className="app-card mb-4 px-6 py-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Textarea row */}
        <div className="mb-4 flex items-start gap-3">
          <img
            src=" /images/profile.png"
            alt="Your avatar"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
          <div className="relative flex-1">
            <textarea
              rows={3}
              placeholder="Write something ..."
              className="w-full resize-none rounded-xl border border-[#e7edf8] bg-[#f5f7fb] px-4 py-3 pr-10 text-sm text-[#112032] outline-none placeholder:text-[#a0aab8] focus:border-[#377DFF] focus:ring-2 focus:ring-[#377DFF]/20"
              {...register("content", { maxLength: 1500 })}
            />
            <span className="pointer-events-none absolute top-3 right-3 text-[#888]">
              <Pencil size={17} className="text-[#888]" />
            </span>
          </div>
        </div>

        {/* Image preview */}
        {preview ? (
          <div className="mb-4 pl-14">
            <img
              src={preview}
              alt="Selected preview"
              className="max-h-60 rounded-xl object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        {errors.content ? (
          <p className="mb-2 pl-14 text-xs text-red-500">
            {errors.content.message}
          </p>
        ) : null}

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-[#edf1f7] pt-4">
          <div className="flex items-center gap-1">
            {/* Photo */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff]"
            >
              <Image size={17} className="text-[#666]" />
              Photo
            </button>
            {/* Video */}
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff]"
            >
              <Video size={17} className="text-[#666]" />
              Video
            </button>
            {/* Event */}
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff]"
            >
              <CalendarDays size={17} className="text-[#666]" />
              Event
            </button>
            {/* Article */}
            <button
              type="button"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#4c5a71] hover:bg-[#f3f7ff] sm:flex"
            >
              <FileText size={16} className="text-[#666]" />
              Article
            </button>
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            ref={(e) => {
              imageRegisterRef(e);
              fileInputRef.current = e;
            }}
            {...imageFieldProps}
          />

          {/* Hidden visibility */}
          <input type="hidden" value="PUBLIC" {...register("visibility")} />

          {/* Post button */}
          <button
            type="submit"
            disabled={creating}
            className="flex items-center gap-2 rounded-lg bg-[#377DFF] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2569e6] disabled:opacity-60"
          >
            <Send size={14} className="text-white" />
            {creating ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
