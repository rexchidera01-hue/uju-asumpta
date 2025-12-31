import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import CurriculumPage from "./pages/CurriculumPage";
import SpeakingPage from "./pages/SpeakingPage";
import PodcastsMediaSection from "./pages/PodcastPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

// Component that updates the document title based on current route
function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "Uju Asumpta"; // default/fallback title

    switch (path) {
      case "/":
        title = "Home | Uju Asumpta";
        break;
      case "/about":
        title = "About | Uju Asumpta";
        break;
      case "/curriculum":
        title = "Curriculum | Uju Asumpta";
        break;
      case "/podcast":
        title = "Podcasts & Media | Uju Asumpta";
        break;
      case "/speaking":
        title = "Speaking | Uju Asumpta";
        break;
      case "/contact":
        title = "Contact | Uju Asumpta";
        break;
      default:
        title = "Uju Asumpta";
    }

    document.title = title;
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <DynamicTitle /> {/* ← Only addition inside the tree */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/podcast" element={<PodcastsMediaSection />} />
        <Route path="/speaking" element={<SpeakingPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
