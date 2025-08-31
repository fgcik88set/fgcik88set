import { BackgroundButton } from "../buttons/Buttons";
import ExcosHomepageSection from "../cards/Excos";
import { ExcosHomeSection } from "../constants/data";
import SectionHeaderText from "../typography/SectionHeaderText";

export default function ExcosSection() {
    return (
        <section className="bg-offBlack h-auto">
                <div className="w-[95%] mx-auto py-8 lg:py-12">
                  <SectionHeaderText text="Meet Our Excos" />
        
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
    )
}