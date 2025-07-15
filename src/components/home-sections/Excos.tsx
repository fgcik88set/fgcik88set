"use client";

import { motion } from "framer-motion";
import { BackgroundButton } from "../buttons/Buttons";
import ExcosHomepageSection from "../cards/Excos";
import { ExcosHomeSection } from "../constants/data";
import SectionHeaderText from "../typography/SectionHeaderText";
import MobileCarouselWrapper from "../mobile-carousel-wrapper";

export default function ExcosSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <section className="h-auto relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="hidden md:block absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="w-[95%] mx-auto py-8 lg:py-12">
        <div className="mb-6">
          <SectionHeaderText text="Meet Our Excos" />

          <p className="text-center italic max-w-3xl mx-auto">
            The strength of the FGC Ikot Ekpene Class of 1988 alumni group lies
            in the dedication of its leaders. Over the years, passionate
            individuals have stepped up to guide our community, ensuring that we
            remain connected, engaged, and committed to giving back.
          </p>
        </div>

        <motion.div
          className="mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="relative mb-8 flex items-center">
            <div className="h-px flex-grow bg-mainYellow"></div>
            <h2 className="font-chewy text-2xl md:text-3xl font-medium text-darkBlue">
              Our Current Executives
            </h2>
            <div className="h-px flex-grow bg-mainYellow"></div>
          </div>

          <motion.div variants={itemVariants}>
            <MobileCarouselWrapper>
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
            </MobileCarouselWrapper>
          </motion.div>

          <div className="mt-10 flex justify-center">
            <BackgroundButton
              text="View All Executives"
              link="/executives"
              btnWidth="w-fit"
            />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="relative mb-8 flex items-center">
            <div className="h-px flex-grow bg-mainYellow"></div>
            <p className="font-chewy text-2xl md:text-3xl font-medium text-darkBlue">
              Board of Trustees
            </p>
            <div className="h-px flex-grow bg-mainYellow"></div>
          </div>

          <motion.div variants={containerVariants}>
            <MobileCarouselWrapper>
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
            </MobileCarouselWrapper>
          </motion.div>

          <div className="mt-10 flex justify-center">
            <BackgroundButton
              text="View All BOT"
              link="/board-of-trustees"
              btnWidth="w-full lg:w-1/4"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
