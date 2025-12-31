import AboutHero from "../components/AboutHeroSection";
import MyPhilosophySection from "../components/AboutMyPhilosophy";
import WhatITeachSection from "../components/AboutWhatITeach";
import WhoIAmSection from "../components/AboutWhoIAm";
import AboutWellsageSection from "../components/AboutWellsage";
import AboutMyCallingSection from "../components/AboutMyCalling";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <WhoIAmSection />
      <MyPhilosophySection />
      <WhatITeachSection />
      <AboutWellsageSection />
      <AboutMyCallingSection />
      <Footer />
    </>
  );
};

export default AboutPage;
