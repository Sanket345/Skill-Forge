import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ConfirmationModal from "../components/common/ConfirmationModal";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { formatDate } from "../services/formatDate";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import { purchaseCourse } from "../services/operations/paymentAPI";
import { addToCart } from "../slices/cartSlice";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import { ACCOUNT_TYPE } from "../utils/constants";

function CourseDetails() {
  const { user, loading } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [isActive, setIsActive] = useState([]);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setResponse(res);
      } catch (error) {
        console.log("Could not fetch course details");
      }
    })();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(
      response?.data?.courseDetails?.ratingAndReviews || []
    );
    setAvgReviewCount(count);
  }, [response]);

  useEffect(() => {
    let lectures = 0;
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);

  const handleActive = (id) => {
    setIsActive(
      isActive.includes(id)
        ? isActive.filter((e) => e !== id)
        : [...isActive, id]
    );
  };

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!response.success) return <Error />;

  const {
    courseName,
    courseDescription,
    thumbnail,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.data.courseDetails;

  const isEnrolled = user && studentsEnrolled.includes(user?._id);

  const handleBuyCourse = async () => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to purchase this course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    if (isEnrolled) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const res = await purchaseCourse(courseId, token);
    if (res?.success) navigate("/dashboard/enrolled-courses");
  };

  const handleAddToCart = () => {
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      setConfirmationModal({
        text1: "Action not allowed",
        text2: "Instructors cannot purchase courses.",
        btn1Text: "OK",
        btn2Text: "Cancel",
        btn1Handler: () => setConfirmationModal(null),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add course to cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    dispatch(addToCart(response.data.courseDetails));
  };

  return (
    <>
      <div className="relative w-full bg-gradient-to-b from-richblack-900 to-richblack-800">
        <div className="mx-auto px-4 lg:w-[1260px]">
          <div className="grid min-h-[480px] py-10 xl:max-w-[810px]">
            <div className="block lg:hidden mb-6">
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="rounded-xl shadow-lg"
              />
            </div>

            <div className="flex flex-col gap-5 text-richblack-5">
              <h1 className="text-4xl font-bold leading-tight">{courseName}</h1>

              <p className="text-lg text-richblack-200 leading-relaxed">
                {courseDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-yellow-25">
                    {isNaN(avgReviewCount) ? 0 : avgReviewCount}
                  </span>
                  <RatingStars Review_Count={avgReviewCount} Star_Size={22} />
                  <span className="text-richblack-300">
                    ({ratingAndReviews.length} reviews)
                  </span>
                </div>

                <span className="text-richblack-300">
                  {studentsEnrolled.length} students enrolled
                </span>
              </div>

              <p className="text-richblack-300">
                Created by{" "}
                <span className="font-medium text-richblack-5">
                  {instructor.firstName} {instructor.lastName}
                </span>
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-richblack-300">
                <p className="flex items-center gap-2">
                  <BiInfoCircle />
                  Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt />
                  English
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute right-12 top-28">
            <CourseDetailsCard
              course={response.data.courseDetails}
              isEnrolled={isEnrolled}
              onBuy={handleBuyCourse}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mb-24 px-4 text-richblack-5 lg:w-[1260px]">
        <div className="xl:max-w-[810px]">
          <div className="my-10 rounded-xl border border-richblack-600 bg-richblack-800 p-8">
            <h2 className="text-3xl font-semibold mb-4">What you'll learn</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-1">Course Content</h2>
            <p className="mb-6 text-sm text-richblack-300">
              {courseContent.length} sections • {totalNoOfLectures} lectures •{" "}
              {response.data.totalDuration}
            </p>

            <div className="space-y-3">
              {courseContent.map((course, index) => (
                <CourseAccordionBar
                  key={index}
                  course={course}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CourseDetails;
