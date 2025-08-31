import CoreValues from "@/components/about/core-values";
import AboutHero from "@/components/about/hero";

import AboutMain from "@/components/about/main";
import MissionVision from "@/components/about/mission-vision";

import Timeline from "@/components/about/timeline";

export default function AboutUs() {
    return (
        <main>
            <AboutHero />
            <AboutMain />
            <MissionVision />
            <CoreValues />
            <Timeline />
            {/* <Leadership />   
            <Testimonials />
            <JoinCTA /> */}
        </main>
    )
}