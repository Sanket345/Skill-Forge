import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <footer className="bg-richblack-800">
      <div className="w-11/12 max-w-maxContent mx-auto py-14 text-richblack-400">
        <div className="flex flex-col lg:flex-row border-b border-richblack-700 pb-5 gap-8">
          <div className="lg:w-1/2 flex flex-wrap justify-between lg:border-r lg:border-richblack-700 lg:pr-5 gap-3">
            <div className="w-[48%] lg:w-[30%] flex flex-col gap-3 mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
              <div className="flex gap-3 text-lg">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Resources
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Support
              </h1>
              <Link
                to="/help-center"
                className="text-[14px] mt-2 inline-block hover:text-richblack-50 transition-all"
              >
                Help Center
              </Link>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7">
              <h1 className="text-richblack-50 font-semibold text-[16px]">
                Plans
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                Community
              </h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, i) => (
                  <Link
                    key={i}
                    to={ele.split(" ").join("-").toLowerCase()}
                    className="text-[14px] hover:text-richblack-50 transition-all"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-wrap justify-between lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => (
              <div key={i} className="w-[48%] lg:w-[30%] mb-7">
                <h1 className="text-richblack-50 font-semibold text-[16px]">
                  {ele.title}
                </h1>
                <div className="flex flex-col gap-2 mt-2">
                  {ele.links.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.link}
                      className="text-[14px] hover:text-richblack-50 transition-all"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-11/12 max-w-maxContent mx-auto py-6 text-richblack-400 text-sm">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="flex">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to={ele.split(" ").join("-").toLowerCase()}
                className={`px-3 ${
                  i !== BottomFooter.length - 1
                    ? "border-r border-richblack-700"
                    : ""
                } hover:text-richblack-50 transition-all`}
              >
                {ele}
              </Link>
            ))}
          </div>

          <div className="text-center">
            All rights reserved © 2026 SkillForge.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
