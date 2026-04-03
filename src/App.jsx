// import "./app.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
