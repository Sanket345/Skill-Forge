import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../../services/formatDate";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <>
      <Table className="w-full overflow-hidden rounded-xl border border-richblack-800 bg-richblack-900">
        <Thead>
          <Tr className="flex gap-x-10 border-b border-richblack-700 bg-richblack-800 px-6 py-4">
            <Th className="flex-1 text-left text-xs font-semibold uppercase tracking-wide text-richblack-200">
              Courses
            </Th>
            <Th className="text-left text-xs font-semibold uppercase tracking-wide text-richblack-200">
              Duration
            </Th>
            <Th className="text-left text-xs font-semibold uppercase tracking-wide text-richblack-200">
              Price
            </Th>
            <Th className="text-left text-xs font-semibold uppercase tracking-wide text-richblack-200">
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-16 text-center text-xl font-medium text-richblack-300">
                No courses found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-6 transition-all duration-200 hover:bg-richblack-800/50"
              >
                {/* Course Info */}
                <Td className="flex flex-1 gap-x-5">
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[120px] w-[200px] rounded-lg object-cover"
                  />

                  <div className="flex flex-col justify-between gap-2">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>

                    <p className="text-sm leading-5 text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>

                    <p className="text-xs text-richblack-400">
                      Created: {formatDate(course.createdAt)}
                    </p>

                    {course.status === COURSE_STATUS.DRAFT ? (
                      <span className="w-fit rounded-full bg-pink-900/40 px-3 py-1 text-xs font-medium text-pink-200">
                        <HiClock className="mr-1 inline-block" size={12} />
                        Draft
                      </span>
                    ) : (
                      <span className="flex w-fit items-center gap-2 rounded-full bg-yellow-900/30 px-3 py-1 text-xs font-medium text-yellow-200">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-300 text-richblack-900">
                          <FaCheck size={10} />
                        </span>
                        Published
                      </span>
                    )}
                  </div>
                </Td>

                {/* Duration */}
                <Td className="flex items-center text-sm font-medium text-richblack-200">
                  2hr 30min
                </Td>

                {/* Price */}
                <Td className="flex items-center text-sm font-semibold text-richblack-100">
                  ₹{course.price}
                </Td>

                {/* Actions */}
                <Td className="flex items-center gap-4 text-richblack-200">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    title="Edit"
                    className="rounded-md p-2 transition hover:bg-richblack-700 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={18} />
                  </button>

                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }
                    title="Delete"
                    className="rounded-md p-2 transition hover:bg-red-900/40 hover:text-red-400"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
