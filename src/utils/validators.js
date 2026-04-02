import { FILE_LIMITS } from "./constants";

export const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Please enter a valid email address.",
};

export const passwordRules = {
  required: "Password is required.",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters.",
  },
};

export const validateImageFile = (file) => {
  if (!file) return true;
  if (!FILE_LIMITS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG, PNG and WEBP images are supported.";
  }
  if (file.size > FILE_LIMITS.IMAGE_SIZE_BYTES) {
    return "Image size must be 5MB or less.";
  }
  return true;
};
