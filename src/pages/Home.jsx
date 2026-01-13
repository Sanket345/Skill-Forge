import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <div>
      {/*SECTION 1*/}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="mt-8 flex gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock your <HighlightText text={"coding potential"} /> with our
              online courses.
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          }
          ctabtn1={{
            btnText: "Try it Yourself",
            link: "/signup",
            active: true,
          }}
          ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
          codeColor={"text-yellow-25"}
          codeblock={`<!DOCTYPE html>\n<html>\n<body>\n<h1>Hello World</h1>\n</body>\n</html>`}
          backgroundGradient={<div className="codeblock1 absolute"></div>}
        />

        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
              Start <HighlightText text={"coding in seconds"} />
            </div>
          }
          subheading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={{
            btnText: "Continue Lesson",
            link: "/signup",
            active: true,
          }}
          ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
          codeColor={"text-white"}
          codeblock={`import React from "react";\nconst App = () => <div>Hello</div>`}
          backgroundGradient={<div className="codeblock2 absolute"></div>}
        />

        <ExploreMore />
      </div>

      {/*  SECTION 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-8">
            <div className="lg:h-[150px]" />
            <div className="flex gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col gap-8">
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/*SECTION 3*/}
      <div className="relative mx-auto my-20 w-full bg-richblack-900 text-white">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-8">
          <InstructorSection />

          <h1 className="mt-8 text-center text-4xl font-semibold">
            Reviews from other learners
          </h1>

          {/* IMPORTANT FIX */}
          <div className="w-full">
            <ReviewSlider />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
