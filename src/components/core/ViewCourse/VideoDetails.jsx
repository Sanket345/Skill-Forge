import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import "video-react/dist/video-react.css";
import { BigPlayButton, Player } from "video-react";

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const videoPlayerRef = useRef(null);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [currentLecture, setCurrentLecture] = useState(null);
  const [courseThumbnail, setCourseThumbnail] = useState("");
  const [hasVideoEnded, setHasVideoEnded] = useState(false);
  const [isMarkingComplete, setIsMarkingComplete] = useState(false);

  useEffect(
    () => {
      if (!courseSectionData.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }

      const currentSection = courseSectionData.find(
        (section) => section._id === sectionId
      );

      const lecture = currentSection?.subSection.find(
        (sub) => sub._id === subSectionId
      );
      setCurrentLecture(lecture);
      setCourseThumbnail(courseEntireData.thumbnail);
      setHasVideoEnded(false);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [courseSectionData, courseEntireData, location.pathname]
  );

  const isFirstLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const lectureIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (lecture) => lecture._id === subSectionId
    );

    return sectionIndex === 0 && lectureIndex === 0;
  };

  const isLastLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const lectureIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (lecture) => lecture._id === subSectionId
    );

    return (
      sectionIndex === courseSectionData.length - 1 &&
      lectureIndex === courseSectionData[sectionIndex].subSection.length - 1
    );
  };

  const goToNextLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const lectureIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (lecture) => lecture._id === subSectionId
    );

    const isLastLectureInSection =
      lectureIndex === courseSectionData[sectionIndex].subSection.length - 1;

    if (!isLastLectureInSection) {
      const nextLectureId =
        courseSectionData[sectionIndex].subSection[lectureIndex + 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextLectureId}`
      );
    } else {
      const nextSection = courseSectionData[sectionIndex + 1];
      navigate(
        `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`
      );
    }
  };

  const goToPreviousLecture = () => {
    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const lectureIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (lecture) => lecture._id === subSectionId
    );

    if (lectureIndex > 0) {
      const prevLectureId =
        courseSectionData[sectionIndex].subSection[lectureIndex - 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevLectureId}`
      );
    } else {
      const prevSection = courseSectionData[sectionIndex - 1];
      const lastLecture =
        prevSection.subSection[prevSection.subSection.length - 1];

      navigate(
        `/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastLecture._id}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setIsMarkingComplete(true);

    const response = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    );

    if (response) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setIsMarkingComplete(false);
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {!currentLecture ? (
        <img
          src={courseThumbnail}
          alt="Course Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={videoPlayerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setHasVideoEnded(true)}
          src={currentLecture.videoUrl}
        >
          <BigPlayButton position="center" />

          {hasVideoEnded && (
            <div className="absolute inset-0 z-[100] grid place-content-center bg-black/80">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={isMarkingComplete}
                  onclick={handleLectureCompletion}
                  text={isMarkingComplete ? "Loading..." : "Mark As Completed"}
                  customClasses="text-xl px-4 mx-auto"
                />
              )}

              <IconBtn
                onclick={() => {
                  videoPlayerRef.current?.seek(0);
                  setHasVideoEnded(false);
                }}
                text="Rewatch"
                customClasses="text-xl px-4 mx-auto mt-2"
              />

              <div className="mt-10 flex justify-center gap-4">
                {!isFirstLecture() && (
                  <button onClick={goToPreviousLecture} className="blackButton">
                    Prev
                  </button>
                )}
                {!isLastLecture() && (
                  <button onClick={goToNextLecture} className="blackButton">
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{currentLecture?.title}</h1>
      <p className="pb-6">{currentLecture?.description}</p>
    </div>
  );
};

export default VideoDetails;
