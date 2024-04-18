import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

import "./index.css";

const Home = lazy(() => import("./components/Home"));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#ebece7]">
        <Suspense fallback={<Loader />}>
          <div className="flex-grow overflow-auto py-8 mx-auto max-w-screen-lg w-full">
            <Navbar />
            <Header />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
