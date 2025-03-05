import { AnimatedTextHeader } from "@/components/animated-text/Typed";
import { BackgroundButton } from "@/components/buttons/Buttons";
import about from "../../public/images/abtus.webp";
import Image from "next/image";
import { ExcosHomeSection, MemorabiliaData } from "@/components/constants/data";
import ExcosHomepageSection from "@/components/cards/Excos";
import MemorabiliaSection from "@/components/memorabilia/Memorabilia";

export default function Home() {
  return (
    <main className="">
      {/* Hero section */}
      <section className="relative w-full h-[90vh] lg:h-screen pt-[15vh]">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-b-[3rem]"
          style={{
            backgroundImage: "url('/images/fgcikHero.webp')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative z-10 w-[95%] mx-auto flex items-center h-screen text-white pb-10 lg:pb-0">
            <div className="w-full lg:w-[60%] text-white flex flex-col">
              <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-6">
                <div className="w-full lg:w-[70%]">
                  <h1 className="text-[2.5rem] text-nowrap md:text-[3.5rem] lg:text-5xl text-white font-bold">
                    Class of &rsquo;88 -{" "}
                  </h1>
                </div>

                <AnimatedTextHeader
                  messages={["Stronger Together", "Family Forever"]}
                  color="#f7e707"
                />
              </div>

              <p className="mb-8 text-base lg:text-xl">
                A network of professionals, lifelong friends, and changemakers,
                united by shared memories and a commitment to excellence. We
                celebrate our journey, support one another, and give back to the
                next generation,because true bonds last a lifetime.
              </p>

              <BackgroundButton
                btnWidth="w-full lg:w-1/3"
                link="#"
                text="Explore"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About US */}
      <section className="w-[95%] mx-auto h-auto">
        <div className="py-8 lg:py-12">
          <p className="font-chewy text-[3.5rem] lg:text-[4.5rem] text-center">
            Class of &rsquo;88
          </p>
          <p className="italics text-center lg:-mt-5">
            Celebrating the Legacy of FGC Ikot Ekpene - Class of &rsquo;88
          </p>
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
            <div className="w-full lg:w-1/2 mx-auto">
              <p className="text-base lg:text-lg mb-6">
                More than just an alumni group, we are a close-knit community
                bound by shared experiences, lifelong friendships, and a
                commitment to excellence...
              </p>


              <BackgroundButton text="Learn More" link="#" btnWidth="w-full lg:w-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Excos */}
      <section className="bg-offBlack h-auto">
        <div className="w-[95%] mx-auto py-8 lg:py-12">
          <p className="font-chewy text-[3.5rem] lg:text-[4.5rem] text-center">Meet Our Excos</p>

          <p className="text-center italic">
            The strength of the FGC Ikot Ekpene Class of 1988 alumni group lies
            in the dedication of its leaders. Over the years, passionate
            individuals have stepped up to guide our community, ensuring that we
            remain connected, engaged, and committed to giving back. This
            section highlights our current executives, who are driving our
            mission forward, our past executives, who have laid a strong
            foundation, and our esteemed Board of Trustees, who provide
            strategic oversight and uphold the legacy of our alumni network.
          </p>

          <div>
            <p className="font-chewy text-[2rem] font-medium text-mainYellow mt-4">
              Our Current Executives
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 mb-6">
              {ExcosHomeSection.map((executive) => (
                <ExcosHomepageSection
                  key={executive.id}
                  id={executive.id}
                  image={executive.image}
                  name={executive.name}
                  position={executive.position}
                  email={executive.email}
                  linkedIn={executive.linkedIn}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <BackgroundButton
                text="View All Executives"
                link="/executives"
                btnWidth="w-full lg:w-1/4"
              />
            </div>
          </div>
          <div>
            <p className="font-chewy text-[2rem] font-medium text-mainYellow mt-4">
              Board of Trustees
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 mb-6">
              {ExcosHomeSection.map((executive) => (
                <ExcosHomepageSection
                  key={executive.id}
                  id={executive.id}
                  image={executive.image}
                  name={executive.name}
                  position={executive.position}
                  email={executive.email}
                  linkedIn={executive.linkedIn}
                />
              ))}
            </div>

            <div className="flex justify-center">
              <BackgroundButton
                text="View All BOT"
                link="/executives"
                btnWidth="w-full lg:w-1/4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Memorabilia */}
      <section className="w-[95%] mx-auto">
        <div className="py-8 lg:py-12">
          <p className="font-chewy text-[3.5rem] lg:text-[4.5rem] text-center">
            Reliving The Moments
          </p>
          <p className="text-center italic">
            A collection of treasured memories that remind us of our shared
            journey, friendships, and the legacy we continue to build.
          </p>

          <div className="mt-6">
          <MemorabiliaSection items={MemorabiliaData}  />
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
    </main>
  );
}
