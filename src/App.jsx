import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage"; // default import (no braces)
import CurriculumPage from "./pages/CurriculumPage"; // default import (no braces)
import SpeakingPage from "./pages/SpeakingPage";
import PodcastsMediaSection from "./pages/PodcastPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
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
