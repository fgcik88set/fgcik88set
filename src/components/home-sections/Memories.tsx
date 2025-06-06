import { BackgroundButton } from "../buttons/Buttons";
import { MemoriesData } from "../constants/data";
import MemoriesSection from "../memories/Memories";
import SectionHeaderText from "../typography/SectionHeaderText";

export default function MemoriesSectionDisplay() {
  return (
    <section className="w-[95%] mx-auto">
      <div className="pt-4 pb-8">
        <SectionHeaderText text="Reliving The Moments" />
        <p className="text-center italic max-w-3xl mx-auto">
          A collection of treasured memories that remind us of our shared
          journey, friendships, and the legacy we continue to build.
        </p>

        <div className="mt-6">
          <MemoriesSection items={MemoriesData} />
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
  );
}
