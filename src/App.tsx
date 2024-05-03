import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useContext } from "react";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import AdminRoute from "./routes/Admin.tsx";
import "./index.css";
import { AuthContext, AuthContextProps } from "./Auth/AuthContext.tsx";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Upload = lazy(() => import("./pages/Upload"));
const Register = lazy(() => import("./pages/Register"));
const Edit = lazy(() => import("./pages/Edit"));

function App() {
  const { loading } = useContext(AuthContext) as AuthContextProps;

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#ebece7]">
        <Suspense fallback={<Loader />}>
          <div
            className={`flex flex-col flex-grow overflow-auto py-8 mx-auto max-w-screen-lg w-full ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-75`}
          >
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />

              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="Register" element={<Register />} />

              <Route element={<AdminRoute />}>
                <Route path="/upload" element={<Upload />} />
                <Route path="/edit/:id" element={<Edit />} />
              </Route>
            </Routes>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
