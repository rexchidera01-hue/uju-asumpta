import CurriculumHero from "../components/CurriculumHeroSection";
import CurriculumOfLifeSection from "../components/CurriculumSection";
import CurriculumIncluded from "../components/CurriculumIncluded";
import CurriculumMatters from "../components/CurriculumWhyItMatters";
import StartJourneySection from "../components/StartJourneySection";
import Footer from "../components/Footer";

const CurriculumPage = () => {
  return (
    <>
      <CurriculumHero />
      <CurriculumOfLifeSection />
      <CurriculumIncluded />
      <CurriculumMatters />
      <StartJourneySection />
      <Footer />
    </>
  )
}

export default CurriculumPage