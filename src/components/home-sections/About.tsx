import Image from "next/image";
import SectionHeaderText from "../typography/SectionHeaderText";
import about from "../../../public/images/abtus.webp";
import { BackgroundButton } from "../buttons/Buttons";

export default function AboutSection() {
    return (
        <section className="w-[95%] mx-auto h-auto pt-10 lg:pb-20 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="">
          <SectionHeaderText text="Class of &rsquo;88" />
          <p className="italics text-center lg:-mt-5">
            Celebrating the Legacy of FGC Ikot Ekpene - Class of &rsquo;88
          </p>
          <br />
          <br />
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            <div className="w-full lg:w-1/2">
              <Image
                src={about}
                alt="About us"
                width={0}
                height={0}
                layout="intrinsic"
                className="rounded-xl"
              />
            </div>
            <div className="w-full lg:w-[40%] mx-auto">
              <p className="text-base lg:text-lg mb-6">
                More than just an alumni group, we are a close-knit community
                bound by shared experiences, lifelong friendships, and a
                commitment to excellence...
              </p>

              <BackgroundButton
                text="Learn More"
                link="#"
                btnWidth="w-full lg:w-1/2"
              />
            </div>
          </div>
        </div>
      </section> 
    )
}