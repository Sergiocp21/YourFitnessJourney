import Hero from './Hero';
import FeatureSection from './FeatureSection';
import HowItWorks from './HowItWorks';
import CallToAction from './CallToAction';

const LandingPage = () => {
    return (
        <main className="bg-gradient-to-b from-red-800 via-gray-900 to-black min-h-screen w-full">
            <Hero />
            <FeatureSection />
            <HowItWorks />
            <CallToAction />
        </main>
    );
};

export default LandingPage;