import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import "./index.css";

const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />

        <div className="flex flex-grow overflow-y-auto p-12">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
