import { BackgroundButton } from "../buttons/Buttons";
import MemoriesSection from "../memories/Memories";
import SectionHeaderText from "../typography/SectionHeaderText";

export default function MemoriesSectionDisplay() {
    return (
        <section className="w-[95%] mx-auto">
                <div className="py-8 lg:py-12">
                  <SectionHeaderText text="Reliving The Moments" />
                  <p className="text-center italic">
                    A collection of treasured memories that remind us of our shared
                    journey, friendships, and the legacy we continue to build.
                  </p>
        
                          <div className="mt-6">
          <MemoriesSection />
        </div>
        
                  <div className="flex justify-center">
                    <BackgroundButton
                      text="View More"
                      link="/executives"
                      btnWidth="w-full lg:w-1/4"
                    />
                  </div>
                </div>
              </section>
    )
}