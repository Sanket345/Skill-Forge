import { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import SubSectionRow from "./SubSectionRow";

export default function CourseAccordionBar({ course, isActive, handleActive }) {
  const contentEl = useRef(null);
  const [active, setActive] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    setActive(isActive?.includes(course._id));
  }, [isActive, course._id]);

  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active]);

  return (
    <div className="overflow-hidden rounded-xl border border-richblack-600 bg-richblack-800">
      <button
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-richblack-700"
        onClick={() => handleActive(course._id)}
      >
        <div className="flex items-center gap-3">
          <span
            className={`transition-transform duration-300 ${
              active ? "rotate-180" : "rotate-0"
            }`}
          >
            <AiOutlineDown />
          </span>

          <p className="font-medium text-richblack-5">{course.sectionName}</p>
        </div>

        <span className="text-sm text-yellow-25">
          {course.subSection.length || 0} lectures
        </span>
      </button>

      <div
        ref={contentEl}
        className="overflow-hidden bg-richblack-900 transition-[height] duration-300 ease-in-out"
        style={{ height: sectionHeight }}
      >
        <div className="flex flex-col gap-3 px-6 py-5">
          {course.subSection.map((subSec, index) => (
            <SubSectionRow key={index} subSec={subSec} />
          ))}
        </div>
      </div>
    </div>
  );
}
