// ✅ Cookie utilities for token and user management

/**
 * Set a cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {object} options - Cookie options (expires, path, secure, sameSite)
 */
export const setCookie = (name, value, options = {}) => {
  const {
    expires = 7,
    path = "/",
    secure = true,
    sameSite = "Strict",
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (expires) {
    const date = new Date();
    date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += `; path=${path}`;
  if (secure) cookieString += "; secure";
  if (sameSite) cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
};

/**
 * Get a cookie value
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEQ)) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
};

/**
 * Delete a cookie
 * @param {string} name - Cookie name
 */
export const deleteCookie = (name) => {
  setCookie(name, "", { expires: -1 });
};

/**
 * Parse and get all cookies
 * @returns {object} - Object with all cookies
 */
export const getAllCookies = () => {
  const cookies = {};
  document.cookie.split(";").forEach((cookie) => {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name) cookies[name] = decodeURIComponent(value);
  });
  return cookies;
};
