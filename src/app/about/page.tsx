import CoreValues from "@/components/about/core-values";
import AboutHero from "@/components/about/hero";
import JoinCTA from "@/components/about/join-cta";
import Leadership from "@/components/about/leadership";
import AboutMain from "@/components/about/main";
import MissionVision from "@/components/about/mission-vision";
import Testimonials from "@/components/about/testimonials";
import Timeline from "@/components/about/timeline";

export default function AboutUs() {
    return (
        <main>
            <AboutHero />
            <AboutMain />
            <MissionVision />
            <CoreValues />
            <Timeline />
            <Leadership />   
            <Testimonials />
            <JoinCTA />
        </main>
    )
}