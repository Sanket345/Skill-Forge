import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "SkillForge delivers high-quality learning experiences designed to be accessible from anywhere. Learn at your own pace with content built to help you grow real, practical skills without barriers.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "SkillForge courses are structured around real-world industry requirements, ensuring you learn the exact skills companies expect, not outdated theory.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "We focus on hands-on learning through projects, examples, and guided practice so you don’t just watch—you build, experiment, and learn by doing.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Earn certificates that reflect your actual skills and completed projects, helping you showcase your learning progress with confidence.",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Instant feedback and auto-grading help you track your performance, understand mistakes quickly, and improve without waiting for manual reviews.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "SkillForge prepares you for real jobs by focusing on practical knowledge, problem-solving, and tools used in real development and tech roles.",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "lg:col-span-2 lg:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "lg:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
