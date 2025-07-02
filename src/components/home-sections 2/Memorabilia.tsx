import MemorabiliaSection from "../memorabilia/Memorabilia";
import SectionHeaderText from "../typography/SectionHeaderText";

export default function MemorabiliaSectionDisplay() {
  return (
    <section className="bg-offBlack">
      <div className="w-[95%] mx-auto py-8 lg:py-12">
        <SectionHeaderText text="Own a Piece of the Story" />
        <p className="text-center italic">
          Where Stories Live Forever: Preserving History, One Keepsake at a Time
        </p>

        <div className="mt-6">
          <MemorabiliaSection />
        </div>
      </div>
    </section>
  );
}
