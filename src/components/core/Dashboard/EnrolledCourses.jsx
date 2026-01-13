import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEnrolledCourses = async () => {
    try {
      setLoading(true);
      const res = await getUserEnrolledCourses(token);

      setEnrolledCourses(res || []);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>

      {!loading && enrolledCourses.length === 0 ? (
        <div className="mt-10 flex h-[30vh] w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-richblack-600 bg-richblack-800">
          <p className="text-lg font-semibold text-richblack-50">
            No Enrolled Courses
          </p>
          <p className="text-sm text-richblack-300">
            You have not enrolled in any course yet.
          </p>
        </div>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Table Head */}
          <div className="flex rounded-t-lg bg-richblack-500">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/4 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {/* Table Rows */}
          {enrolledCourses.map((course, index) => (
            <div
              key={course._id}
              className={`flex items-center border border-richblack-700 ${
                index === enrolledCourses.length - 1
                  ? "rounded-b-lg"
                  : "rounded-none"
              }`}
            >
              {/* Course Info */}
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  if (!course.courseContent?.length) return;

                  navigate(
                    `/view-course/${course._id}/section/${course.courseContent[0]._id}/sub-section/${course.courseContent[0].subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course thumbnail"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription?.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="w-1/4 px-2 py-3">
                {course.totalDuration || "0m"}
              </div>

              {/* Progress */}
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
