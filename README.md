<div align="center">
  <img src="../cli/public/images/ss.png" alt="Social Media Platform Banner" width="100%" height="300" style="object-fit: cover; border-radius: 10px;" />
  
  # 🌟 Social Feed Platform
  
  **Modern React-based Social Media Application**
  
  [![React](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://reactjs.org/) [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-purple.svg)](https://redux-toolkit.js.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.2-38bdf8.svg)](https://tailwindcss.com/) [![Vite](https://img.shields.io/badge/Vite-8.0.1-646cff.svg)](https://vitejs.dev/) [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

### 🏗️ PROJECT OVERVIEW

This is a modern **Social Media Frontend Application** built with React that enables users to:

- **Authenticate** (login/register)
- **Create and share posts** with images
- **Interact with content** (like posts/comments)
- **Comment and reply** to posts
- **View activity feeds** with real-time interactions

---

### 🛠️ TECH STACK

#### **Core Technologies**

- **React 19.2.4** - UI framework with functional components & hooks
- **Redux Toolkit 2.11.2** - State management with RTK Query patterns
- **React Router DOM 6.30.1** - Client-side routing and navigation
- **Axios 1.14.0** - HTTP client with interceptors
- **Tailwind CSS 4.2.2** - Utility-first CSS framework

#### **Additional Libraries**

- **React Hook Form 7.72.0** - Form validation and management
- **React Hot Toast 2.6.0** - Toast notifications
- **Vite 8.0.1** - Build tool and development server
- **ESLint 9.39.4** - Code linting and quality

---

### 📁 PROJECT STRUCTURE

```
cli/
├── 📂 public/                    # Static assets
│   └── images/                   # Profile pictures, post images
│
├── 📂 src/
│   ├── 📄 App.jsx               # Main app component with routing
│   ├── 📄 main.jsx              # React app entry point
│   ├── 📄 index.css             # Global styles
│   │
│   ├── 📂 components/           # Reusable UI components
│   │   ├── common/              # Generic components
│   │   │   ├── Button.jsx       # Styled button component
│   │   │   ├── Input.jsx        # Form input component
│   │   │   ├── Modal.jsx        # Modal dialog component
│   │   │   ├── Skeleton.jsx     # Loading skeleton
│   │   │   └── Spinner.jsx      # Loading indicator
│   │   ├── layout/              # Layout components
│   │   │   ├── Footer.jsx       # App footer
│   │   │   ├── Navbar.jsx       # Navigation header
│   │   │   └── Sidebar.jsx      # Side navigation
│   │   ├── posts/               # Post-related components
│   │   │   ├── CreatePost.jsx   # Post creation form
│   │   │   ├── PostCard.jsx     # Individual post display
│   │   │   ├── PostList.jsx     # List of posts
│   │   │   └── index.js         # Component exports
│   │   ├── comments/            # Comment components
│   │   │   ├── Comment.jsx      # Single comment
│   │   │   ├── CommentList.jsx  # Comments container
│   │   │   └── Reply.jsx        # Comment reply
│   │   ├── likes/               # Like/reaction components
│   │   │   ├── LikeButton.jsx   # Like toggle button
│   │   │   └── LikesList.jsx    # Users who liked
│   │   └── ui/                  # UI-specific components
│   │
│   ├── 📂 pages/                # Application pages
│   │   ├── Feed.jsx             # Main feed page
│   │   ├── Login.jsx            # Login page
│   │   └── Register.jsx         # Registration page
│   │
│   ├── 📂 features/             # Redux slices by domain
│   │   ├── auth/                # Authentication feature
│   │   │   ├── authAPI.js       # Auth thunks & API calls
│   │   │   └── authSlice.js     # Auth state management
│   │   ├── posts/               # Posts feature
│   │   │   ├── postsAPI.js      # Post CRUD operations
│   │   │   └── postsSlice.js    # Posts state management
│   │   ├── comments/            # Comments feature
│   │   │   ├── commentsAPI.js   # Comment operations
│   │   │   └── commentsSlice.js # Comments state
│   │   └── likes/               # Likes feature
│   │       ├── likesAPI.js      # Like operations
│   │       └── likesSlice.js    # Likes state
│   │
│   ├── 📂 services/             # Service layer architecture
│   │   ├── apiExecutor.js       # Centralized error handling
│   │   ├── axiosInstance.js     # HTTP client configuration
│   │   ├── httpEndpoint.js      # API endpoint constants
│   │   └── httpMethods.js       # HTTP method wrappers
│   │
│   ├── 📂 routes/               # Route protection
│   │   ├── ProtectedRoute.jsx   # Auth-required routes
│   │   └── PublicOnlyRoute.jsx  # Guest-only routes
│   │
│   ├── 📂 hooks/                # Custom React hooks
│   │   ├── useAuth.js           # Auth state hook
│   │   └── usePosts.js          # Posts data hook
│   │
│   ├── 📂 store/                # Redux store configuration
│   │   └── store.js             # Root store setup
│   │
│   └── 📂 utils/                # Utility functions
│       ├── constants.js         # App-wide constants
│       ├── cookies.js           # Cookie management utils
│       ├── helpers.js           # General helper functions
│       └── validators.js        # Form validation rules
│
├── 📄 package.json              # Dependencies & scripts
├── 📄 vite.config.js           # Vite configuration
├── 📄 tailwind.config.js       # Tailwind CSS config
├── 📄 eslint.config.js         # ESLint rules
└── 📄 .env                     # Environment variables
```

---

### ⚙️ CORE FEATURES

#### 🔐 **Authentication System**

- **User Registration** with email/password
- **Secure Login** with JWT tokens
- **Cookie-based session management** (7-day expiry)
- **Auto-logout** on token expiration
- **Route protection** (public/private routes)
- **Auth state hydration** on app load

#### 📝 **Posts Management**

- **Create posts** with text content
- **Image upload** support (JPEG, PNG, WEBP)
- **Visibility settings** (public/private)
- **Delete posts** (owner only)
- **Optimistic updates** for better UX
- **Infinite scroll pagination** (10 posts per load)

#### 💬 **Comments System**

- **Add comments** to posts
- **Reply to comments** (nested structure)
- **Delete comments** (owner/admin)
- **Real-time comment counts**
- **Comment threading** support

#### ❤️ **Likes & Reactions**

- **Toggle likes** on posts and comments
- **Like counters** with real-time updates
- **Optimistic like updates** for instant feedback
- **View users** who liked content
- **Prevent double-clicking** issues

#### 🎨 **UI/UX Features**

- **Responsive design** (mobile-first)
- **Loading states** (skeletons, spinners)
- **Toast notifications** for user feedback
- **Modal dialogs** for interactions
- **Form validation** with error display
- **Tailwind CSS** utility classes

---

### 🔧 ARCHITECTURE PATTERNS

#### 🏗️ **Service Layer Architecture**

```javascript
// HTTP Methods Layer
httpMethods.js → GET, POST, PUT, PATCH, DELETE wrappers

// API Endpoints Layer
httpEndpoint.js → Centralized endpoint constants

// Error Handling Layer
apiExecutor.js → Centralized error handling for Redux thunks

// HTTP Client Layer
axiosInstance.js → Axios configuration with interceptors
```

#### 🗄️ **Redux State Management**

```javascript
store/
├── auth: { user, token, isAuthenticated, loading, error }
├── posts: { items[], nextCursor, hasMore, loading, creating, error }
├── comments: { commentsByPost{}, loading, error }
└── likes: { likesByEntity{}, loading, error }
```

#### 🛣️ **Routing Structure**

```javascript
Routes:
├── /login (PublicOnlyRoute)
├── /register (PublicOnlyRoute)
├── /feed (ProtectedRoute)
└── /* → redirect to /feed
```

---

### 🚀 APPLICATION WORKFLOW

#### **1. App Initialization**

```mermaid
graph TD
    A[App Starts] → B[Load Redux Store]
    B → C[Check Auth Cookie]
    C → D{Token Exists?}
    D →|Yes| E[Validate Token with API]
    D →|No| F[Redirect to Login]
    E → G{Valid Token?}
    G →|Yes| H[Load Feed Page]
    G →|No| I[Clear Cookie & Redirect to Login]
```

#### **2. User Authentication Flow**

```mermaid
graph TD
    A[User Visits App] → B{Authenticated?}
    B →|No| C[Show Login Page]
    C → D[User Submits Form]
    D → E[API Call to /auth/login]
    E → F{Login Success?}
    F →|Yes| G[Store Token in Cookie]
    G → H[Redirect to Feed]
    F →|No| I[Show Error Message]
```

#### **3. Post Creation Workflow**

```mermaid
graph TD
    A[User Creates Post] → B[Form Validation]
    B → C[Prepare FormData]
    C → D[API Call to /posts]
    D → E{Success?}
    E →|Yes| F[Add to Redux Store]
    F → G[Update UI Optimistically]
    E →|No| H[Show Error Toast]
```

#### **4. Like/Unlike Workflow**

```mermaid
graph TD
    A[User Clicks Like] → B[Optimistic Update UI]
    B → C[API Call to /likes/toggle]
    C → D{Success?}
    D →|Yes| E[Confirm State Change]
    D →|No| F[Revert UI Change]
    F → G[Show Error Message]
```

---

### 🔑 KEY IMPLEMENTATION DETAILS

#### **Cookie-Based Authentication**

```javascript
// Secure token storage with cookies
setCookie(TOKEN_KEY, token, {
  expires: 7, // 7 days
  secure: true, // HTTPS only
  sameSite: "Strict", // CSRF protection
});
```

#### **Optimistic Updates**

```javascript
// Immediate UI updates before API confirmation
const handleToggleLike = async () => {
  // 1. Update UI immediately
  dispatch(patchPostLikeOptimistic({ postId, liked: !post.likedByMe }));

  try {
    // 2. Confirm with API
    await dispatch(togglePostLike(postId)).unwrap();
  } catch {
    // 3. Revert on failure
    dispatch(patchPostLikeOptimistic({ postId, liked: post.likedByMe }));
  }
};
```

#### **Request Cancellation Support**

```javascript
// All API calls support cancellation via AbortController
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (cursor, { rejectWithValue, signal }) =>
    apiExecutor(
      async () => {
        const response = await GET(ENDPOINT.POSTS.LIST, params, signal);
        return response.data;
      },
      rejectWithValue,
      signal,
    ),
);
```

#### **Centralized Error Handling**

```javascript
// Single point of error management
export const apiExecutor = async (apiCall, rejectWithValue, signal) => {
  try {
    const response = await apiCall(signal);
    return response.data ?? response;
  } catch (error) {
    // Handle specific HTTP status codes
    if (response?.status === 401) {
      // Auto-logout on unauthorized
    }
    return rejectWithValue(response?.data || error.message);
  }
};
```

---

### 📦 BUILD & DEPLOYMENT

#### **Development Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint checks
```

#### **Environment Configuration**

```bash
# .env file structure
VITE_API_URL=http://localhost:5000/api
```

#### **Production Build**

- **Vite bundling** with tree-shaking
- **Tailwind CSS purging** for smaller bundle sizes
- **Asset optimization** and minification
- **Source maps** for debugging

---

### 🔒 SECURITY FEATURES

- ✅ **Secure cookie storage** (HttpOnly, Secure, SameSite)
- ✅ **JWT token validation** on each request
- ✅ **Request cancellation** to prevent race conditions
- ✅ **Form validation** to prevent malicious input
- ✅ **Protected routes** with authentication checks
- ✅ **Axios interceptors** for automatic token attachment
- ✅ **Auto-logout** on token expiration
- ✅ **File upload validation** (type, size limits)

---

### 📊 PERFORMANCE OPTIMIZATIONS

- ⚡ **React.memo** for component memoization
- ⚡ **Optimistic updates** for instant UI feedback
- ⚡ **Infinite scroll** instead of full pagination
- ⚡ **Redux state normalization** for efficient updates
- ⚡ **Lazy loading** of images and components
- ⚡ **Request debouncing** to prevent API spam
- ⚡ **Bundle splitting** with Vite
- ⚡ **Tailwind CSS purging** for smaller CSS bundles

---

### 🎯 FUTURE ENHANCEMENT OPPORTUNITIES

#### **Features to Add**

- 📸 **Image compression** before upload
- 🔔 **Real-time notifications** (WebSocket/SSE)
- 👥 **User profiles** and friend connections
- 🔍 **Search functionality** for posts/users
- 📱 **Progressive Web App** (PWA) features
- 🌙 **Dark mode** theme switching
- 🔄 **Data synchronization** with offline support
- 📈 **Analytics tracking** for user engagement

#### **Technical Improvements**

- 🧪 **Unit & integration tests** (Jest, React Testing Library)
- 📚 **Storybook** for component documentation
- 🔧 **Error boundaries** for graceful error handling
- 📱 **React Native** mobile app version
- ♿ **Accessibility improvements** (WCAG compliance)
- 🚀 **Performance monitoring** (Lighthouse, Web Vitals)

This project demonstrates modern React development practices with a scalable architecture suitable for production deployment.
