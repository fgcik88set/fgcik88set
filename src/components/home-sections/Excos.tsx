"use client";

import { motion } from "framer-motion";
import { BackgroundButton } from "../buttons/Buttons";
import ExcosHomepageSection from "../cards/Excos";
import { ExcosHomeSection } from "../constants/data";
import SectionHeaderText from "../typography/SectionHeaderText";

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
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />
      <div className="w-[95%] mx-auto py-8 lg:py-12">
        <div>
          <SectionHeaderText text="Meet Our Excos" />

          <p className="text-center italic max-w-3xl mx-auto">
            The strength of the FGC Ikot Ekpene Class of 1988 alumni group lies
            in the dedication of its leaders. Over the years, passionate
            individuals have stepped up to guide our community, ensuring that we
            remain connected, engaged, and committed to giving back.
          </p>
        </div>

        <motion.div
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="relative mb-8 flex items-center">
            <div className="h-px flex-grow bg-blue-200"></div>
            <h2 className="font-chewy text-3xl font-medium text-darkBlue mt-4">
              Our Current Executives
            </h2>
            <div className="h-px flex-grow bg-blue-200"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 "
            variants={containerVariants}
          >
            {ExcosHomeSection.map((executive) => (
              <motion.div key={executive.id} variants={itemVariants}>
                <ExcosHomepageSection
                  id={executive.id}
                  image={executive.image}
                  name={executive.name}
                  position={executive.position}
                  email={executive.email}
                  linkedIn={executive.linkedIn}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex justify-center">
            <BackgroundButton
              text="View All Executives"
              link="/executives"
              btnWidth="w-full lg:w-1/4"
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
            <div className="h-px flex-grow bg-amber-200"></div>
            <p className="font-chewy text-[2rem] font-medium text-darkBlue mt-4">
              Board of Trustees
            </p>
            <div className="h-px flex-grow bg-amber-200"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3 mb-6">
            {ExcosHomeSection.map((executive) => (
              <motion.div key={executive.id} variants={itemVariants}>
                <ExcosHomepageSection
                  id={executive.id}
                  image={executive.image}
                  name={executive.name}
                  position={executive.position}
                  email={executive.email}
                  linkedIn={executive.linkedIn}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <BackgroundButton
              text="View All BOT"
              link="/executives"
              btnWidth="w-full lg:w-1/4"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
