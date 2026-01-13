import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import IconBtn from "../../common/IconBtn";

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [expandedSectionId, setExpandedSectionId] = useState("");
  const [activeLectureId, setActiveLectureId] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData = [],
    courseEntireData = {},
    totalNoOfLectures = 0,
    completedLectures = [],
  } = useSelector((state) => state.viewCourse || {});

  useEffect(
    () => {
      if (!courseSectionData.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (section) => section._id === sectionId
      );

      const currentLectureIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((lecture) => lecture._id === subSectionId);

      const currentLectureId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentLectureIndex
        ]?._id;

      setExpandedSectionId(courseSectionData?.[currentSectionIndex]?._id);
      setActiveLectureId(currentLectureId);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseSectionData, location.pathname]
  );

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] flex-col border-r border-richblack-700 bg-richblack-800">
      {/* Header */}
      <div className="mx-5 flex flex-col gap-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
        <div className="flex items-center justify-between">
          <div
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            title="Back"
          >
            <IoIosArrowBack size={30} />
          </div>

          <IconBtn
            text="Add Review"
            customClasses="ml-auto"
            onclick={() => setReviewModal(true)}
          />
        </div>

        <div>
          <p>{courseEntireData?.courseName}</p>
          <p className="text-sm font-semibold text-richblack-500">
            {completedLectures.length} / {totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData.map((section) => (
          <div
            key={section._id}
            className="mt-2 cursor-pointer text-sm text-richblack-5"
            onClick={() => setExpandedSectionId(section._id)}
          >
            {/* Section Header */}
            <div className="flex justify-between bg-richblack-600 px-5 py-4">
              <div className="w-[70%] font-semibold">{section.sectionName}</div>
              <span
                className={`${
                  expandedSectionId === section._id ? "rotate-0" : "rotate-180"
                } transition-all duration-500`}
              >
                <BsChevronDown />
              </span>
            </div>

            {/* Lectures */}
            {expandedSectionId === section._id && (
              <div>
                {section.subSection.map((lecture) => (
                  <div
                    key={lecture._id}
                    className={`flex gap-3 px-5 py-2 ${
                      activeLectureId === lecture._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                    }`}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${lecture._id}`
                      );
                      setActiveLectureId(lecture._id);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(lecture._id)}
                      readOnly
                    />
                    {lecture.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
