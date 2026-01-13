import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import CourseCard from "./CourseCard";

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          spaceBetween={30}
          // centeredSlides={true}
          slidesPerView={3} // Number of slides visible at once
          // spaceBetween={30}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
