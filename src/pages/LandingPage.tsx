import HeroSection from "../components/HeroSection";
import IntroSection from "../components/IntroSection";
import MessageSection from "../components/MessageSection.tsx";
import FeaturedOffer from "../components/FeaturedOffer.tsx";
import MeetUju from "../components/MeetUju.tsx";
import WellsageSection from "../components/WellsageSection.tsx";
import PodcastsMediaSection from "../components/PodcastsMedia.tsx";
import MailingListSection from "../components/MailingList.tsx";
import Footer from "../components/Footer.tsx";
import NewForm from "../components/NewForm.tsx";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <NewForm />
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
