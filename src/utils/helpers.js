export const cn = (...classes) => classes.filter(Boolean).join(" ");

export const formatDateTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export const sortByNewest = (items = []) =>
  [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
