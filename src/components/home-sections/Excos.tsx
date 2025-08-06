"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BackgroundButton } from "../buttons/Buttons";
import ExcosHomepageSection from "../cards/Excos";
import SectionHeaderText from "../typography/SectionHeaderText";
import MobileCarouselWrapper from "../mobile-carousel-wrapper";
import { getCurrentExecutives, getCurrentBOT } from "@/sanity/sanity-utils";
import { ExecutiveProps } from "../constants/executives-data";
import { TrusteeProps } from "../constants/trustees-data";

export default function ExcosSection() {
  const [currentExecutives, setCurrentExecutives] = useState<ExecutiveProps[]>([]);
  const [currentBOT, setCurrentBOT] = useState<TrusteeProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [executivesData, botData] = await Promise.all([
          getCurrentExecutives(),
          getCurrentBOT()
        ]);

        // Filter executives to show only President, Vice President, Secretary, and Financial Secretary
        const filteredExecutives = executivesData.filter((exec: ExecutiveProps) => 
          ['President', 'Vice President', 'Secretary', 'Financial Secretary'].includes(exec.position)
        ).sort((a: ExecutiveProps, b: ExecutiveProps) => {
          const order = ['President', 'Vice President', 'Secretary', 'Financial Secretary'];
          return order.indexOf(a.position) - order.indexOf(b.position);
        }).slice(0, 4); // Ensure only 4 cards

        // Filter BOT to show Chairman, Secretary, and 2 members
        const filteredBOT = botData.filter((bot: TrusteeProps) => 
          ['Chairman', 'Secretary', 'Member',"Member"].includes(bot.position)
        ).sort((a: TrusteeProps, b: TrusteeProps) => {
          const order = ['Chairman', 'Secretary', 'Member',"Member"];
          return order.indexOf(a.position) - order.indexOf(b.position);
        }).slice(0, 4); // Ensure only 4 cards 

        setCurrentExecutives(filteredExecutives);
        setCurrentBOT(filteredBOT);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <div className="relative mb-8">
            {/* <div className="h-px flex-grow bg-darkBlue"></div> */}
            <h2 className="text-center text-2xl md:text-3xl font-medium text-darkBlue">
              The Current Executives
            </h2>
            {/* <div className="h-px flex-grow bg-darkBlue"></div> */}
          </div>

          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <MobileCarouselWrapper>
                {currentExecutives.map((executive: ExecutiveProps) => (
                  <ExcosHomepageSection
                    key={executive.id}
                    id={Number(executive.id)}
                    image={executive.image || ""}
                    name={executive.name}
                    position={executive.position}
                    email={executive.email || ""}
                    linkedIn={executive.linkedIn || ""}
                  />
                ))}
              </MobileCarouselWrapper>
            )}
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
          <div className="relative mb-8">
            {/* <div className="h-px flex-grow bg-darkBlue"></div> */}
            <p className="text-center text-2xl md:text-3xl font-medium text-darkBlue">
              The Current Board of Trustees
            </p>
            {/* <div className="h-px flex-grow bg-darkBlue"></div> */}
          </div>

          <motion.div variants={containerVariants}>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <MobileCarouselWrapper>
                {currentBOT.map((bot: TrusteeProps) => (
                  <ExcosHomepageSection
                    key={bot.id}
                    id={Number(bot.id)}
                    image={bot.image || ""}
                    name={bot.name}
                    position={bot.position}
                    email={bot.email || ""}
                    linkedIn={bot.linkedIn || ""}
                  />
                ))}
              </MobileCarouselWrapper>
            )}
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
