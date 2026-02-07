import HeroSection from "../components/HeroSection";
import IntroSection from "../components/IntroSection";
import MessageSection from "../components/MessageSection.tsx";
import FeaturedOffer from "../components/FeaturedOffer.tsx";
import MeetUju from "../components/MeetUju.tsx";
import TheLifeClass from "../components/TheLifeClass.jsx";
import WellsageSection from "../components/WellsageSection.tsx";
import PodcastsMediaSection from "../components/PodcastsMedia.tsx";
import MailingListSection from "../components/MailingList.tsx";
import Footer from "../components/Footer.tsx";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <TheLifeClass />
      <IntroSection />
      <MessageSection />
      <FeaturedOffer />
      <MeetUju />
      <WellsageSection />
      <PodcastsMediaSection />
      <MailingListSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
