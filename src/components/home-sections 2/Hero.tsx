import Image from "next/image";
import { AnimatedTextHeader } from "../animated-text/Typed";
import { BackgroundButton } from "../buttons/Buttons";
import HeroImg from "../../../public/images/fgcikHero.webp";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] lg:h-screen">
      <div className="flex justify-between items-center w-[95%] gap-6 mx-auto h-full">
        <div className="w-full lg:w-[50%] flex flex-col">
          <div className="mb-4">
            <div className="">
              <h1 className="text-[2.5rem] text-nowrap md:text-[3.5rem] lg:text-6xl font-bold">
                Class of &rsquo;88 -{" "}
              </h1>
            </div>

            <AnimatedTextHeader
              messages={["Stronger Together", "Family Forever"]}
              color="#0c347d"
            />
          </div>

          <p className="mb-8 md:text-lg">
            A network of professionals, lifelong friends, and changemakers,
            united by shared memories and a commitment to excellence. We
            celebrate our journey, support one another, and give back to the
            next generation,because true bonds last a lifetime.
          </p>

          <BackgroundButton
            btnWidth="w-full lg:w-1/2"
            link="#"
            text="Explore"
          />
        </div>
        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-darkBlue/50 border-4 border-darkBlue/50">
          <Image src={HeroImg} alt="Hero Image" />
        </div>
      </div>
    </section>
  );
}
