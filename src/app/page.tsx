"use client";

import { motion } from "framer-motion";
import ARRIVALS from "@/components/ARRIVALS/ARRIVALS";
import Cards from "@/components/Cards/Cards";
// import CURATED from "@/components/CURATED/CURATED";
import LandingPage from "@/components/LandingPage/LandingPage";
import LEADING from "@/components/LEADING/LEADING";
import LeadingTwo from "@/components/Ledingtwo/LeadingTwo";
import SolveYourDesign from "@/components/SOLVEYOURDESIGN/SOLVEYOURDESIGN";
import TextPart from "@/components/TextPart/TextPart";
import FadeUpWrapper from "@/components/utils/FadeUpWrapper";
import Reels from "@/components/Reels/Reels";


const parentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <motion.div variants={parentVariants} initial="hidden" animate="show">
      <FadeUpWrapper>
        <LandingPage />
      </FadeUpWrapper>
      <FadeUpWrapper>
        <TextPart />
      </FadeUpWrapper>
      {/* <FadeUpWrapper>
        <CURATED />
      </FadeUpWrapper> */}
      <FadeUpWrapper>
        <Cards />
      </FadeUpWrapper>
      <FadeUpWrapper>
        <LEADING />
      </FadeUpWrapper>
      <FadeUpWrapper>
        <ARRIVALS />
      </FadeUpWrapper>
      {/* <FadeUpWrapper>
        <LeadingTwo />
      </FadeUpWrapper> */}
      {/* <FadeUpWrapper>
        <SolveYourDesign />
      </FadeUpWrapper> */}
      <FadeUpWrapper>
        <Reels />
      </FadeUpWrapper>
    </motion.div>
  );

}
